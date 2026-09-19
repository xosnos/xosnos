import { Cpu } from 'lucide-react';
import { domainKnowledge, listFeaturedSkills, listSkillCategories } from '@/data/skills';

const featuredSkills = listFeaturedSkills();
const skillCategories = listSkillCategories();

function SkillBadge({ src, alt }: { src: string; alt: string }) {
  // Shield badges are variable-width remote SVGs. next/image sets both
  // attributes, then CSS height alone trips its aspect-ratio warning.
  return (
    // biome-ignore lint/performance/noImgElement: variable-width remote SVGs
    <img
      src={src}
      alt={alt}
      height={32}
      loading="lazy"
      decoding="async"
      className="h-8 w-auto relative z-10 rounded shadow-sm opacity-80 group-hover/badge:opacity-100 transition-all duration-300"
    />
  );
}

const Skills = () => {
  return (
    <section
      id="skills"
      className="bg-background py-24 px-6 md:px-12 relative overflow-hidden border-y border-border/50"
    >
      <div className="absolute top-[20%] right-0 w-[40%] h-[40%] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        <div className="space-y-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-montserrat font-bold uppercase tracking-widest">
              <Cpu className="w-4 h-4" aria-hidden="true" />
              Stack
            </div>
            <h2 className="text-4xl md:text-6xl font-montserrat font-extrabold tracking-tighter text-foreground text-balance">
              Tools I ship with
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed text-pretty">
              Primary languages, frameworks, and platforms then my full stack.
            </p>
          </div>

          <ul className="flex flex-wrap gap-2">
            {featuredSkills.map((skill) => (
              <li
                key={skill}
                className="px-3 py-1.5 rounded-full bg-card border border-border text-sm font-montserrat font-semibold text-foreground hover:scale-105 hover:border-accent/30 transition-all duration-300 cursor-default"
              >
                {skill}
              </li>
            ))}
          </ul>
          <ul className="flex flex-wrap gap-2">
            {domainKnowledge.map((domain) => (
              <li
                key={domain}
                className="px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-xs font-montserrat font-bold uppercase tracking-widest text-accent hover:scale-105 hover:bg-accent/20 transition-all duration-300 cursor-default"
              >
                {domain}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="group p-8 rounded-3xl bg-card border border-border shadow-sm hover:shadow-2xl hover:border-accent/20 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="space-y-6">
                <h3 className="text-xl font-montserrat font-bold text-foreground">
                  {category.title}
                </h3>

                <ul className="flex flex-wrap gap-2 pt-2">
                  {category.badges.map((badge) => (
                    <li
                      key={badge.alt}
                      className="relative group/badge transition-all duration-300 hover:scale-105"
                    >
                      <div className="absolute inset-0 bg-accent/20 blur-md opacity-0 group-hover/badge:opacity-100 transition-opacity rounded-full" />
                      <SkillBadge src={badge.src} alt={badge.alt} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
