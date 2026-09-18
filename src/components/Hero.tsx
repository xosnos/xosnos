import { MapPin, Rocket } from "lucide-react";
import Image from "next/image";
import HeroActions from "@/components/HeroActions";
import { HeroGreeting } from "@/components/HeroGreeting";
import { RichText } from "@/components/RichText";
import { RotatingRoleTitle } from "@/components/RotatingRoleTitle";
import { aboutContent } from "@/data/about";
import { heroContent } from "@/data/hero";

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
              <Rocket className="w-5 h-5 text-accent" aria-hidden="true" />
            </div>
          </div>

          <div className="mb-8 flex w-full flex-col items-center gap-4 pb-2 md:pb-3">
            <div className="flex w-fit max-w-full flex-col items-start gap-3 text-left">
              <div className="flex flex-col items-start gap-0.5">
                <HeroGreeting />
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-montserrat font-extrabold tracking-tighter leading-[1.15] title-banner-effect">
                  <span translate="no">{heroContent.name}</span>
                </h1>
              </div>
              <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <div className="min-w-0">
                  <RotatingRoleTitle />
                </div>
                <p className="flex shrink-0 items-center gap-1.5 text-sm md:text-base font-montserrat font-medium tracking-wide text-muted-foreground">
                  <MapPin
                    className="h-4 w-4 shrink-0 text-accent"
                    aria-hidden="true"
                  />
                  {aboutContent.location}
                </p>
              </div>
            </div>
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
