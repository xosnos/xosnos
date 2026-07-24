import { Box, Cpu, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ScrollReveal';
import { listSkillCategories } from '@/data/skills';

const Skills = () => {
  const skillCategories = listSkillCategories();

  return (
    <section
      id="skills"
      className="bg-background py-24 px-6 md:px-12 relative overflow-hidden"
    >
      {/* Background Subtle Gradient */}
      <div className="absolute top-[20%] right-0 w-[40%] h-[40%] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-montserrat font-bold uppercase tracking-widest">
                <Cpu className="w-4 h-4" />
                Stack
              </div>
              <h2 className="text-4xl md:text-6xl font-montserrat font-extrabold tracking-tighter text-foreground">
                Technical Arsenal
              </h2>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-muted-foreground font-light text-lg max-w-md leading-relaxed">
                Continuously evolving and mastering a diverse set of technologies to build
                efficient, scalable solutions.
              </p>
              <a
                href="https://github.com/xosnos/xosnos/blob/main/README.md#-domain-knowledge"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-montserrat font-bold uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors group"
              >
                Also on GitHub profile
                <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category) => (
            <ScrollReveal key={category.title} variant="scaleIn">
              <div className="group p-8 rounded-3xl bg-card border border-border shadow-sm hover:shadow-2xl hover:border-accent/20 hover:-translate-y-1 transition-all duration-300">
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
                    {category.badges.map((badge) => (
                      <div
                        key={`${category.title}-${badge.alt}`}
                        className="relative group/badge transition-all duration-300 hover:scale-105"
                      >
                        <div className="absolute inset-0 bg-accent/20 blur-md opacity-0 group-hover/badge:opacity-100 transition-opacity rounded-full" />
                        <Image
                          src={badge.src}
                          alt={badge.alt}
                          width={200}
                          height={28}
                          style={{ height: '2rem', width: 'auto' }}
                          className="relative z-10 rounded shadow-sm opacity-80 group-hover/badge:opacity-100 transition-all duration-300"
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
      </div>
    </section>
  );
};

export default Skills;
