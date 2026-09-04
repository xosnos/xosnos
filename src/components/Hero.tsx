import { Rocket, Sparkles } from 'lucide-react';
import Image from 'next/image';
import HeroActions from '@/components/HeroActions';
import { RichText } from '@/components/RichText';
import { heroContent } from '@/data/hero';

const Hero = () => {
  return (
    <header
      id="page-top"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[80px] md:blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[80px] md:blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          <div className="mb-10 relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-accent to-blue-600 rounded-full blur-md opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
            <div className="relative p-1 bg-gradient-to-tr from-accent to-blue-600 rounded-full">
              <Image
                src={heroContent.profileImage}
                alt={heroContent.name}
                width={180}
                height={180}
                className="rounded-full border-4 border-background bg-background shadow-2xl relative z-10"
                priority
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-background border border-border p-2 rounded-xl shadow-lg">
              <Sparkles className="w-5 h-5 text-accent" aria-hidden="true" />
            </div>
          </div>

          <div className="space-y-4 mb-8 pb-2 md:pb-3">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-montserrat font-extrabold tracking-tighter leading-[1.15] title-banner-effect text-balance">
              <span translate="no">{heroContent.name}</span>
            </h1>
            <div className="flex items-center justify-center gap-3 text-muted-foreground font-montserrat font-semibold tracking-[0.2em] uppercase text-sm md:text-base pt-0.5">
              <span className="h-px w-8 bg-border" />
              <span className="flex items-center gap-2">
                {heroContent.role}{' '}
                <Rocket className="w-4 h-4 text-accent" aria-hidden="true" />
              </span>
              <span className="h-px w-8 bg-border" />
            </div>
            <p className="text-sm md:text-base font-montserrat font-semibold tracking-wide text-foreground/80">
              {heroContent.focusLine}
            </p>
          </div>

          <RichText
            as="p"
            text={heroContent.tagline}
            className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mb-12 leading-relaxed text-pretty"
          />

          <HeroActions />
        </div>
      </div>
    </header>
  );
};

export default Hero;
