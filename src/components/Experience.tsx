import { CalendarRange, MapPin, Building2, ChevronRight } from 'lucide-react';
import { listPublishedExperiences } from '@/data/experience';
import { ScrollReveal, ScrollRevealItem } from '@/components/ScrollReveal';

const Experience = async () => {
  const items = listPublishedExperiences();

  const formatMonthYear = (dateStr?: string) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      : '';

  return (
    <section id="experience" className="bg-card py-24 px-6 md:px-12 relative overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute bottom-[10%] left-0 w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-montserrat font-bold uppercase tracking-widest">
              <Building2 className="w-4 h-4" />
              Career
            </div>
            <h2 className="text-4xl md:text-6xl font-montserrat font-extrabold tracking-tighter text-foreground">
              Professional Experience
            </h2>
            <div className="w-12 h-1 bg-accent mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        {items.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center bg-background rounded-3xl border border-border p-12 shadow-sm">
            <p className="text-muted-foreground text-lg italic">The journey is just beginning.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {items.map((item) => (
              <ScrollRevealItem key={item.id}>
              <div
                className="group bg-background rounded-3xl border border-border/50 p-8 md:p-10 shadow-sm transition-all duration-300 hover:shadow-2xl hover:border-accent/20 hover:-translate-y-1"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-accent font-montserrat font-bold uppercase text-xs tracking-widest">
                      <span className="px-2 py-0.5 rounded bg-accent/10 border border-accent/20">
                        {item.organization}
                      </span>
                      <ChevronRight className="w-3 h-3 text-muted-foreground" />
                      <span className="text-muted-foreground">{item.type}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-montserrat font-extrabold text-foreground group-hover:text-accent transition-colors">
                      {item.role}
                    </h3>
                  </div>
                  
                  <div className="flex flex-col md:items-end gap-2 text-sm font-medium text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <CalendarRange className="w-4 h-4" />
                      <span>
                        {formatMonthYear(item.startDate)} — {item.endDate ? formatMonthYear(item.endDate) : 'Present'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{item.location || 'Remote / Hybrid'}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 max-w-4xl">
                  {item.description && (
                    <p className="text-muted-foreground text-lg leading-relaxed font-light">
                      {item.description}
                    </p>
                  )}

                  {item.highlights && item.highlights.length > 0 && (
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {item.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex gap-3 text-foreground/80 text-sm leading-relaxed group-hover:text-foreground transition-colors">
                          <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  )}

                  {item.link && (
                    <div className="pt-4 border-t border-border/50">
                      <a
                        href={item.link}
                        className="inline-flex items-center gap-2 text-xs font-montserrat font-bold uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Company Website
                        <ChevronRight className="w-3 h-3" />
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
