import Image from 'next/image';
import { User, MapPin, Coffee, Code2 } from 'lucide-react';
import { aboutContent } from '@/data/about';
import { ScrollReveal } from '@/components/ScrollReveal';

const About = () => {
  return (
    <section id="about" className="bg-background py-24 px-6 md:px-12 relative overflow-hidden">
      <div className="absolute top-[30%] left-0 w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          <ScrollReveal variant="slideInLeft">
            <div className="space-y-10">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-montserrat font-bold uppercase tracking-widest">
                  <User className="w-4 h-4" />
                  {aboutContent.sectionLabel}
                </div>
                <h2 className="text-4xl md:text-6xl font-montserrat font-extrabold tracking-tighter text-foreground">
                  {aboutContent.sectionTitle}
                </h2>
                <div className="w-12 h-1 bg-accent rounded-full" />
              </div>

              <div className="space-y-6 text-lg text-muted-foreground font-light leading-relaxed">
                {aboutContent.bio.map((paragraph, index) => (
                  <p key={index}>
                    {paragraph.text.split(/(\*\*[^*]+\*\*)/).map((part, i) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return (
                          <span key={i} className="text-foreground font-semibold">
                            {part.slice(2, -2)}
                          </span>
                        );
                      }
                      return part;
                    })}
                  </p>
                ))}
                <p className="pt-4 flex items-center gap-3">
                  <Code2 className="w-6 h-6 text-accent" />
                  <span className="text-foreground font-montserrat font-bold uppercase tracking-widest text-sm italic">
                    {aboutContent.topLanguages}
                  </span>
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="slideInRight">
            <div className="space-y-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-accent to-blue-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
                <div className="relative rounded-3xl overflow-hidden border border-border/50 shadow-2xl">
                  <Image
                    src={aboutContent.image}
                    alt="Steven Nguyen"
                    width={600}
                    height={600}
                    className="w-full h-auto object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-card border border-border shadow-sm flex flex-col gap-2 items-center text-center">
                  <MapPin className="w-5 h-5 text-accent" />
                  <span className="text-xs font-montserrat font-bold uppercase tracking-widest text-foreground">{aboutContent.location}</span>
                </div>
                <div className="p-6 rounded-2xl bg-card border border-border shadow-sm flex flex-col gap-2 items-center text-center">
                  <Coffee className="w-5 h-5 text-accent" />
                  <span className="text-xs font-montserrat font-bold uppercase tracking-widest text-foreground">{aboutContent.funFact}</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default About;
