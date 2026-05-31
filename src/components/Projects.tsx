'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Code, X, ExternalLink, Github, Monitor } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/animations';
import { listPublishedProjects, type ProjectItem } from '@/data/projects';

const projectItems = listPublishedProjects();

const Projects = () => {
  const [selectedItem, setSelectedItem] = useState<ProjectItem | null>(null);

  return (
    <section id="projects" className="bg-background py-24 px-6 md:px-12 relative overflow-hidden">
      <div className="absolute top-[20%] right-0 w-[40%] h-[40%] bg-accent/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={viewportOnce} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-montserrat font-bold uppercase tracking-widest">
              <Code className="w-4 h-4" />
              Portfolio
            </div>
            <h2 className="text-4xl md:text-6xl font-montserrat font-extrabold tracking-tighter text-foreground">
              Selected Projects
            </h2>
          </div>
          <p className="text-muted-foreground font-light text-lg max-w-md leading-relaxed">
            A showcase of applications, tools, and experiments I&apos;ve built to solve problems and explore new technologies.
          </p>
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projectItems.map((item) => (
            <motion.div
              key={item.id}
              variants={fadeInUp}
              className="group cursor-pointer space-y-4"
              onClick={() => setSelectedItem(item)}
            >
              <div className="relative overflow-hidden rounded-2xl border border-border/50 shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:border-accent/30 group-hover:-translate-y-2">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={600}
                  height={400}
                  className="w-full h-[280px] md:h-[340px] object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <div className="flex items-center gap-3 text-foreground font-montserrat font-bold uppercase text-xs tracking-widest">
                    <span>View Details</span>
                    <Monitor className="w-4 h-4 text-accent" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {item.tags?.map((tag) => (
                    <span key={tag} className="text-[10px] font-montserrat font-bold uppercase tracking-widest text-muted-foreground border border-border px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-montserrat font-bold text-foreground group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground font-light line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8 modal-overlay"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="bg-background rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-border relative"
              onClick={(e) => e.stopPropagation()}
            >
            <div className="sticky top-0 z-20 flex justify-end p-6 bg-background/80 backdrop-blur-md">
              <button
                onClick={() => setSelectedItem(null)}
                className="p-3 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="px-8 pb-12 md:px-16 md:pb-20">
              <div className="flex flex-col md:flex-row gap-12">
                <div className="md:w-3/5 space-y-8">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-montserrat font-bold uppercase tracking-widest">
                      Project Overview
                    </div>
                    <h2 className="text-4xl md:text-5xl font-montserrat font-extrabold tracking-tighter text-foreground">
                      {selectedItem.title}
                    </h2>
                  </div>

                  <p className="text-xl text-muted-foreground font-light leading-relaxed">
                    {selectedItem.description}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {selectedItem.tags?.map((tag) => (
                      <span key={tag} className="px-4 py-2 rounded-xl bg-muted text-foreground text-sm font-medium border border-border">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    {selectedItem.demoUrl && (
                      <a
                        href={selectedItem.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-4 rounded-full font-montserrat font-bold uppercase text-sm tracking-widest bg-accent text-accent-foreground hover:brightness-110 shadow-lg shadow-accent/20 transition-all flex items-center justify-center gap-2"
                      >
                        Launch App
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {selectedItem.repoUrl && (
                      <a
                        href={selectedItem.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-4 rounded-full font-montserrat font-bold uppercase text-sm tracking-widest bg-muted text-foreground hover:bg-border transition-all flex items-center justify-center gap-2"
                      >
                        Source Code
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="md:w-2/5">
                  <div className="rounded-2xl overflow-hidden border border-border shadow-2xl sticky top-24">
                    <Image
                      src={selectedItem.image}
                      alt={selectedItem.title}
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
