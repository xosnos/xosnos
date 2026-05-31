'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ExternalLink, Music, Pause, Play, Volume2 } from 'lucide-react';
import Image from 'next/image';

type Provider = 'apple' | 'spotify';

interface NowPlayingTrack {
  id: string;
  name: string;
  artist: string;
  album?: string;
  artworkUrl?: string | null;
  url?: string | null;
  previewUrl?: string | null;
  duration?: number | null;
  provider: Provider;
}

async function loadNowPlaying(): Promise<NowPlayingTrack> {
  const response = await fetch('/api/music/now-playing');

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body?.error || 'Failed to fetch now playing');
  }

  return response.json();
}

export default function SpotifyPlayer() {
  const [track, setTrack] = useState<NowPlayingTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const fetchNowPlaying = useCallback(() => {
    setLoading(true);
    setError(null);

    loadNowPlaying()
      .then((data) => setTrack(data))
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Failed to load track');
        setTrack(null);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let cancelled = false;

    loadNowPlaying()
      .then((data) => {
        if (!cancelled) {
          setTrack(data);
          setError(null);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load track');
          setTrack(null);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [track]);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio || !track?.previewUrl) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch (err) {
      console.error('Playback error:', err);
    }
  };

  const providerLabel =
    track?.provider === 'apple'
      ? 'Apple Music'
      : track?.provider === 'spotify'
        ? 'Spotify'
        : 'Now Playing';

  if (loading) {
    return (
      <div className="bg-card/50 backdrop-blur-md rounded-3xl p-6 max-w-md mx-auto border border-border/50 animate-pulse">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-muted rounded-full animate-spin border-t-2 border-accent"></div>
          <div className="space-y-2 flex-1">
             <div className="h-3 bg-muted rounded w-1/3"></div>
             <div className="h-4 bg-muted rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !track) {
    return (
      <div className="bg-card/50 backdrop-blur-md rounded-3xl p-6 max-w-md mx-auto border border-border/50">
        <div className="flex items-center justify-between text-muted-foreground">
          <div className="flex items-center space-x-3">
             <Music className="h-5 w-5 text-accent" />
             <span className="text-sm font-medium">Offline</span>
          </div>
          <button
            onClick={fetchNowPlaying}
            className="text-xs font-montserrat font-bold uppercase tracking-widest hover:text-accent transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-card/40 backdrop-blur-xl rounded-3xl p-6 max-w-md mx-auto border border-border/50 shadow-2xl transition-all duration-500 hover:border-accent/30 hover:bg-card/60">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Volume2 className="h-4 w-4 text-accent animate-pulse" />
          <span className="text-[10px] font-montserrat font-extrabold text-muted-foreground uppercase tracking-[0.2em]">
            Listening on <span className="text-accent">{providerLabel}</span>
          </span>
        </div>
        {track.url && (
          <a
            href={track.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-accent transition-colors"
            aria-label="Open in music app"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>

      <div className="flex items-center space-x-5">
        {track.artworkUrl && (
          <div className="relative w-20 h-20 shrink-0 overflow-hidden rounded-2xl bg-muted shadow-xl group-hover:scale-105 transition-transform duration-500">
            <Image
              src={track.artworkUrl}
              alt={`${track.album || track.name} cover`}
              fill
              sizes="80px"
              className="object-cover"
              priority={false}
            />
            {isPlaying && (
               <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
                  <div className="flex gap-1 items-end h-6">
                     <div className="w-1 bg-white animate-bounce" style={{ animationDuration: '0.6s' }} />
                     <div className="w-1 bg-white animate-bounce" style={{ animationDuration: '0.8s' }} />
                     <div className="w-1 bg-white animate-bounce" style={{ animationDuration: '0.7s' }} />
                  </div>
               </div>
            )}
          </div>
        )}

        <div className="flex-1 min-w-0 text-left">
          <h3 className="font-montserrat font-bold text-foreground text-lg truncate group-hover:text-accent transition-colors leading-tight">
            {track.name}
          </h3>
          <p className="text-sm text-muted-foreground truncate font-medium">{track.artist}</p>
          {track.album && (
            <p className="text-[10px] font-montserrat font-bold uppercase tracking-widest text-muted-foreground/50 truncate mt-1">
              {track.album}
            </p>
          )}
        </div>

        {track.previewUrl && (
          <button
            onClick={togglePlayback}
            className="shrink-0 bg-accent hover:scale-110 active:scale-95 text-accent-foreground rounded-full p-4 transition-all shadow-lg shadow-accent/20"
            aria-label={isPlaying ? 'Pause' : 'Play preview'}
          >
            {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 ml-0.5 fill-current" />}
          </button>
        )}
      </div>

      {track.previewUrl && (
        <div className="mt-6 relative">
          <div className="bg-muted rounded-full h-1 overflow-hidden">
            <div
              className="bg-accent h-1 rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(56,189,248,0.5)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <audio ref={audioRef} src={track.previewUrl} preload="metadata" />
        </div>
      )}
    </div>
  );
}
