import { Send, Mail, ArrowRight } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { contactContent } from '@/data/contact';

const Contact = () => {
  return (
    <section id="contact" className="bg-background py-24 px-6 md:px-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-accent/10 rounded-full blur-[160px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-12">

          <ScrollReveal>
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-montserrat font-bold uppercase tracking-widest">
                <Send className="w-4 h-4" />
                {contactContent.sectionLabel}
              </div>
              <h2 className="text-5xl md:text-7xl font-montserrat font-extrabold tracking-tighter text-foreground">
                {contactContent.sectionTitle} <span className="text-accent">{contactContent.sectionTitleAccent}</span>
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
                {contactContent.subtitle}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="scaleIn">
            <div className="flex flex-col items-center gap-8">
              <a
                href={`mailto:${contactContent.email}`}
                className="group relative inline-flex items-center gap-4 px-10 py-6 rounded-full bg-accent text-accent-foreground font-montserrat font-extrabold text-lg uppercase tracking-widest shadow-2xl shadow-accent/40 hover:scale-105 hover:brightness-110 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <Mail className="w-6 h-6" />
                <span>{contactContent.ctaLabel}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <p className="text-sm font-montserrat font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
                Response time: <span className="text-foreground">{contactContent.responseTime}</span>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
