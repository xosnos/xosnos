'use client';

import { ChevronRight, Code, ExternalLink, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import Image from 'next/image';
import { useCallback, useId, useRef, useState } from 'react';
import BrandIcon from '@/components/BrandIcon';
import { brandIcons } from '@/components/brandIcons';
import {
  listOverviewTags,
  listPublishedProjects,
  type ProjectItem,
} from '@/data/projects';
import { useDialog } from '@/hooks/useDialog';
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/animations';

const projectItems = listPublishedProjects();

const Projects = () => {
  const [selectedItem, setSelectedItem] = useState<ProjectItem | null>(null);
  const reduceMotion = useReducedMotion();
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);

  const closeModal = useCallback(() => setSelectedItem(null), []);
  useDialog(selectedItem !== null, closeModal, dialogRef);
  const overviewTags = selectedItem ? listOverviewTags(selectedItem) : [];

  return (
    <section
      id="projects"
      className="bg-background py-14 px-4 md:py-24 md:px-12 relative overflow-hidden"
    >
      <div className="absolute top-[20%] right-0 w-[40%] h-[40%] bg-accent/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 md:mb-16 md:gap-6"
        >
          <div className="space-y-3 md:space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-montserrat font-bold uppercase tracking-widest">
              <Code className="w-4 h-4" aria-hidden="true" />
              Portfolio
            </div>
            <h2 className="text-4xl md:text-6xl font-montserrat font-extrabold tracking-tighter text-foreground text-balance">
              Selected Projects
            </h2>
          </div>
          <p className="text-muted-foreground text-lg max-w-md leading-relaxed text-pretty">
            A showcase of applications, tools, and experiments I&apos;ve built to solve
            problems and explore new technologies.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 lg:gap-12"
        >
          {projectItems.map((item) => (
            <motion.div key={item.id} variants={fadeInUp}>
              <button
                type="button"
                className="group relative cursor-pointer space-y-3 overflow-hidden rounded-2xl border border-border bg-card p-1 shadow-sm transition-all duration-300 hover:shadow-2xl hover:border-accent/30 hover:-translate-y-1 w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background md:space-y-4 md:rounded-3xl"
                onClick={() => setSelectedItem(item)}
              >
                <div className="relative overflow-hidden rounded-2xl">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={600}
                    height={400}
                    className="w-full h-[220px] sm:h-[280px] md:h-[340px] object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="eager"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent" />
                  <div className="absolute top-6 right-6 z-10 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/90 px-3 py-1.5 text-xs font-montserrat font-bold uppercase tracking-widest text-foreground shadow-sm backdrop-blur-md opacity-100 md:opacity-0 md:transition-opacity md:duration-300 md:group-hover:opacity-100">
                    View Details
                    <ChevronRight className="w-4 h-4 text-accent" aria-hidden="true" />
                  </div>
                  <div className="absolute bottom-5 left-4 right-4 z-10 space-y-2 sm:left-8 sm:right-8">
                    {item.coverTags.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {item.coverTags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex rounded-full border border-border/60 bg-background/90 px-3 py-1 text-xs font-montserrat font-bold uppercase tracking-widest text-foreground shadow-sm backdrop-blur-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}
                    <h3 className="text-2xl md:text-3xl font-montserrat font-extrabold text-foreground text-balance group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>
                <p className="px-2 pb-2 text-muted-foreground line-clamp-2 leading-relaxed">
                  {item.subtitle}
                </p>
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            role="presentation"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            className="safe-area-overlay modal-overlay fixed inset-0 z-[60] flex items-center justify-center"
            onClick={closeModal}
          >
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              tabIndex={-1}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, scale: 0.95, y: 20 }}
              transition={{
                duration: reduceMotion ? 0 : 0.25,
                ease: 'easeOut',
              }}
              className="relative max-h-full w-full max-w-5xl overflow-y-auto overscroll-contain rounded-3xl border border-border bg-background shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 z-20 flex justify-end bg-background/80 p-3 backdrop-blur-md md:p-6">
                <button
                  type="button"
                  onClick={closeModal}
                  aria-label="Close project details"
                  className="p-3 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <X className="w-6 h-6" aria-hidden="true" />
                </button>
              </div>

              <div className="px-5 pb-10 md:px-16 md:pb-20">
                <div className="flex flex-col gap-8 md:flex-row md:gap-12">
                  <div className="md:w-3/5 space-y-8 min-w-0">
                    <div className="space-y-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-montserrat font-bold uppercase tracking-widest">
                        Project Overview
                      </div>
                      <h2
                        id={titleId}
                        className="text-3xl font-montserrat font-extrabold tracking-tighter text-balance text-foreground md:text-5xl"
                      >
                        {selectedItem.title}
                      </h2>
                    </div>

                    <p className="text-lg leading-relaxed text-pretty text-muted-foreground md:text-xl">
                      {selectedItem.description}
                    </p>

                    {overviewTags.length > 0 ? (
                      <div className="flex flex-wrap gap-3">
                        {overviewTags.map((tag) => (
                          <span
                            key={tag}
                            className="px-4 py-2 rounded-xl bg-muted text-foreground text-sm font-medium border border-border"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      {selectedItem.demoUrl && (
                        <a
                          href={selectedItem.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-8 py-4 rounded-full font-montserrat font-bold uppercase text-sm tracking-widest bg-accent text-accent-foreground hover:brightness-110 shadow-lg shadow-accent/20 transition-all duration-300 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                          Launch App
                          <ExternalLink className="w-4 h-4" aria-hidden="true" />
                        </a>
                      )}
                      {selectedItem.repoUrl && (
                        <a
                          href={selectedItem.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-8 py-4 rounded-full font-montserrat font-bold uppercase text-sm tracking-widest bg-muted text-foreground hover:bg-border transition-all duration-300 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                          Source Code
                          <BrandIcon
                            icon={brandIcons.github}
                            title=""
                            className="w-4 h-4"
                          />
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
