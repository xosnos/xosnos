import { Cpu, ExternalLink } from 'lucide-react';
import { domainKnowledge, listFeaturedSkills } from '@/data/skills';

const Skills = () => {
  const featuredSkills = listFeaturedSkills();

  return (
    <section
      id="skills"
      className="bg-background py-16 px-6 md:px-12 relative overflow-hidden border-y border-border/50"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-md">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-montserrat font-bold uppercase tracking-widest">
              <Cpu className="w-4 h-4" aria-hidden="true" />
              Stack
            </div>
            <h2 className="text-3xl md:text-4xl font-montserrat font-extrabold tracking-tighter text-foreground text-balance">
              Tools I ship with
            </h2>
            <p className="text-muted-foreground font-light leading-relaxed text-pretty">
              Primary languages, frameworks, and platforms. The long list lives on GitHub.
            </p>
            <a
              href="https://github.com/xosnos/xosnos/blob/main/README.md#-domain-knowledge"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-montserrat font-bold uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
            >
              Full list on GitHub
              <ExternalLink
                className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                aria-hidden="true"
              />
            </a>
          </div>

          <div className="flex-1 space-y-6">
            <ul className="flex flex-wrap gap-2">
              {featuredSkills.map((skill) => (
                <li
                  key={skill}
                  className="px-3 py-1.5 rounded-full bg-card border border-border text-sm font-montserrat font-semibold text-foreground"
                >
                  {skill}
                </li>
              ))}
            </ul>
            <ul className="flex flex-wrap gap-2">
              {domainKnowledge.map((domain) => (
                <li
                  key={domain}
                  className="px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-xs font-montserrat font-bold uppercase tracking-widest text-accent"
                >
                  {domain}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
