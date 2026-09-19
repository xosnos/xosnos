import { Building2, CalendarRange, ChevronRight, MapPin } from 'lucide-react';
import { ScrollReveal, ScrollRevealItem } from '@/components/ScrollReveal';
import { experienceContent, listPublishedExperiences } from '@/data/experience';
import { formatMonthYear } from '@/lib/dates';

const Experience = () => {
  const items = listPublishedExperiences();

  return (
    <section
      id="experience"
      className="bg-card py-24 px-6 md:px-12 relative overflow-hidden"
    >
      <div className="absolute bottom-[10%] left-0 w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-montserrat font-bold uppercase tracking-widest">
                <Building2 className="w-4 h-4" aria-hidden="true" />
                {experienceContent.sectionLabel}
              </div>
              <h2 className="text-4xl md:text-6xl font-montserrat font-extrabold tracking-tighter text-foreground text-balance">
                {experienceContent.sectionTitle}
              </h2>
            </div>
            <p className="text-muted-foreground text-lg max-w-md leading-relaxed text-pretty">
              {experienceContent.sectionDescription}
            </p>
          </div>
        </ScrollReveal>

        {items.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center bg-background rounded-3xl border border-border p-12 shadow-sm">
            <p className="text-muted-foreground text-lg italic">
              The journey is just beginning.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {items.map((item) => (
              <ScrollRevealItem key={item.id}>
                <div className="group bg-background rounded-3xl border border-border/50 p-8 md:p-10 shadow-sm transition-all duration-300 hover:shadow-2xl hover:border-accent/20 hover:-translate-y-1">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                    <div className="space-y-2 min-w-0">
                      <div className="flex items-center gap-2 text-accent font-montserrat font-bold uppercase text-xs tracking-widest">
                        <span className="px-2 py-0.5 rounded bg-accent/10 border border-accent/20">
                          {item.organization}
                        </span>
                        <ChevronRight
                          className="w-3 h-3 text-muted-foreground"
                          aria-hidden="true"
                        />
                        <span className="text-muted-foreground">{item.type}</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-montserrat font-extrabold text-foreground group-hover:text-accent transition-colors text-balance">
                        {item.role}
                      </h3>
                    </div>

                    <div className="flex flex-col md:items-end gap-2 text-sm font-medium text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <CalendarRange className="w-4 h-4" aria-hidden="true" />
                        <span>
                          {formatMonthYear(item.startDate)} —{' '}
                          {item.endDate ? formatMonthYear(item.endDate) : 'Present'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" aria-hidden="true" />
                        <span>{item.location || 'Remote / Hybrid'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {item.description && (
                      <p className="text-muted-foreground text-lg leading-relaxed text-pretty">
                        {item.description}
                      </p>
                    )}

                    {item.highlights && item.highlights.length > 0 && (
                      <ul className="flex flex-col gap-3">
                        {item.highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="flex gap-3 text-foreground text-base leading-relaxed"
                          >
                            <span
                              className="shrink-0 w-1.5 h-1.5 rounded-full bg-accent mt-2"
                              aria-hidden="true"
                            />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    )}

                    {item.link && (
                      <div className="pt-4 border-t border-border/50">
                        <a
                          href={item.link}
                          className="group/link inline-flex items-center gap-2 text-xs font-montserrat font-bold uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.organization === 'Terraces'
                            ? 'Product site'
                            : item.type === 'volunteer'
                              ? 'Organization Website'
                              : 'Company Website'}
                          <ChevronRight
                            className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform duration-300"
                            aria-hidden="true"
                          />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </ScrollRevealItem>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;
