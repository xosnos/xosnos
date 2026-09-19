import { MapPin, Rocket } from 'lucide-react';
import Image from 'next/image';
import HeroActions from '@/components/HeroActions';
import { HeroGreeting } from '@/components/HeroGreeting';
import { RichText } from '@/components/RichText';
import { RotatingRoleTitle } from '@/components/RotatingRoleTitle';
import { aboutContent } from '@/data/about';
import { heroContent } from '@/data/hero';

const Hero = () => {
  return (
    <header
      id="page-top"
      className="relative flex min-h-[calc(100dvh-var(--nav-height))] items-center justify-center overflow-hidden bg-background pb-[var(--fab-offset)] [@media(max-height:600px)]:items-start lg:min-h-dvh lg:pb-0"
    >
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[80px] md:blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[80px] md:blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6 py-6 md:py-20">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <div className="group relative mb-4 md:mb-10">
            <div className="absolute inset-0 bg-gradient-to-tr from-accent to-blue-600 rounded-full blur-md opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
            <div className="relative p-1 bg-gradient-to-tr from-accent to-blue-600 rounded-full">
              <Image
                src={heroContent.profileImage}
                alt={heroContent.name}
                width={180}
                height={180}
                className="relative z-10 h-28 w-28 rounded-full border-4 border-background bg-background shadow-2xl sm:h-32 sm:w-32 md:h-[180px] md:w-[180px]"
                sizes="(max-width: 640px) 112px, (max-width: 768px) 128px, 180px"
                priority
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-background border border-border p-2 rounded-xl shadow-lg">
              <Rocket className="w-5 h-5 text-accent" aria-hidden="true" />
            </div>
          </div>

          <div className="mb-4 flex w-full flex-col items-center gap-2 pb-1 md:mb-8 md:gap-4 md:pb-3">
            <div className="flex w-full max-w-full flex-col items-center gap-2 text-center md:w-fit md:items-start md:gap-3 md:text-left">
              <div className="flex flex-col items-center gap-0.5 md:items-start">
                <HeroGreeting />
                <h1 className="text-center text-4xl font-montserrat font-extrabold tracking-tighter leading-[1.15] title-banner-effect sm:text-5xl md:text-left md:text-7xl lg:text-8xl">
                  <span translate="no">{heroContent.name}</span>
                </h1>
              </div>
              <div className="flex w-full flex-col items-center gap-2 md:flex-row md:items-center md:justify-between md:gap-4">
                <div className="min-w-0">
                  <RotatingRoleTitle />
                </div>
                <p className="flex shrink-0 items-center justify-center gap-1.5 text-sm font-montserrat font-medium tracking-wide text-muted-foreground md:justify-start md:text-base">
                  <MapPin className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  {aboutContent.location}
                </p>
              </div>
            </div>
          </div>

          <RichText
            as="p"
            text={heroContent.tagline}
            className="mb-5 max-w-2xl text-base leading-relaxed text-pretty text-muted-foreground md:mb-12 md:text-2xl"
          />

          <HeroActions />
        </div>
      </div>
    </header>
  );
};

export default Hero;
