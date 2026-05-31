'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ExternalLink, Box, Terminal, Cpu } from 'lucide-react';
import { type SkillCategory } from '@/lib/github-readme';
import { ScrollReveal } from '@/components/ScrollReveal';

const Skills = () => {
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/skills')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        setSkillCategories(Array.isArray(data) ? data : []);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch skills:', error);
        setFetchError(error instanceof Error ? error.message : 'Failed to fetch skills');
        setSkillCategories([]);
        setIsLoading(false);
      });
  }, []);

  return (
    <section id="skills" className="bg-background py-24 px-6 md:px-12 relative overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute top-[20%] right-0 w-[40%] h-[40%] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-montserrat font-bold uppercase tracking-widest">
                <Terminal className="w-4 h-4" />
                Stack
              </div>
              <h2 className="text-4xl md:text-6xl font-montserrat font-extrabold tracking-tighter text-foreground">
                Technical Arsenal
              </h2>
            </div>
            <div className="flex flex-col gap-4">
               <p className="text-muted-foreground font-light text-lg max-w-md leading-relaxed">
                Continuously evolving and mastering a diverse set of technologies to build efficient, scalable solutions.
              </p>
              <a
                href="https://github.com/xosnos/xosnos/blob/main/README.md"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-montserrat font-bold uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors group"
              >
                Fetched from GitHub README
                <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* Skills Content */}
        {isLoading ? (
          <div className="text-center py-20 bg-card rounded-3xl border border-border shadow-sm">
             <div className="animate-pulse flex flex-col items-center gap-4">
                <Cpu className="w-12 h-12 text-muted-foreground opacity-30" />
                <p className="text-muted-foreground italic">Establishing secure connection to GitHub...</p>
             </div>
          </div>
        ) : fetchError ? (
          <div className="text-center py-20 bg-card rounded-3xl border border-border shadow-sm">
             <div className="flex flex-col items-center gap-4">
                <Cpu className="w-12 h-12 text-muted-foreground opacity-30" />
                <p className="text-muted-foreground italic">{fetchError}</p>
             </div>
          </div>
        ) : skillCategories.length === 0 ? (
          <div className="text-center py-20 bg-card rounded-3xl border border-border shadow-sm">
             <div className="flex flex-col items-center gap-4">
                <Cpu className="w-12 h-12 text-muted-foreground opacity-30" />
                <p className="text-muted-foreground italic">No skills found.</p>
             </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => (
              <ScrollReveal key={index} variant="scaleIn">
              <div 
                className="group p-8 rounded-3xl bg-card border border-border shadow-sm hover:shadow-2xl hover:border-accent/20 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                     <div className="p-2 rounded-xl bg-accent/10 border border-accent/20">
                        <Box className="w-5 h-5 text-accent" />
                     </div>
                     <h3 className="text-xl font-montserrat font-bold text-foreground">
                        {category.title}
                     </h3>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 pt-2">
                    {category.badges.map((badge, badgeIndex) => (
                      <div 
                        key={badgeIndex}
                        className="relative group/badge transition-all duration-300 hover:scale-105"
                      >
                         <div className="absolute inset-0 bg-accent/20 blur-md opacity-0 group-hover/badge:opacity-100 transition-opacity rounded-full" />
                         <Image
                          src={badge.src}
                          alt={badge.alt}
                          width={140}
                          height={30}
                          className="h-8 w-auto relative z-10 rounded shadow-sm opacity-80 group-hover/badge:opacity-100 transition-all duration-300"
                          unoptimized
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              </ScrollReveal>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default Skills;
