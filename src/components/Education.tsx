'use client';

import { useState } from 'react';
import Image from 'next/image';
import { GraduationCap, X, ChevronRight, Award, BookOpen, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/animations';
import { listEducationItems, type EducationItem } from '@/data/education';

const items = listEducationItems();

const Education = () => {
  const [selectedItem, setSelectedItem] = useState<EducationItem | null>(null);

  return (
    <section id="education" className="bg-background py-24 px-6 md:px-12 relative overflow-hidden">
      <div className="absolute top-[20%] right-0 w-[40%] h-[40%] bg-accent/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={viewportOnce} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-montserrat font-bold uppercase tracking-widest">
              <GraduationCap className="w-4 h-4" />
              Education
            </div>
            <h2 className="text-4xl md:text-6xl font-montserrat font-extrabold tracking-tighter text-foreground">
              Academic Journey
            </h2>
          </div>
          <p className="text-muted-foreground font-light text-lg max-w-md leading-relaxed">
            A background rooted in computer science and engineering, with a focus on human-centered design and software quality.
          </p>
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((item) => (
            <motion.div
              key={item.id}
              variants={fadeInUp}
              className="group relative cursor-pointer space-y-4 overflow-hidden rounded-3xl border border-border bg-card p-1 shadow-sm transition-all duration-300 hover:shadow-2xl hover:border-accent/30 hover:-translate-y-1"
              onClick={() => setSelectedItem(item)}
            >
              <div className="relative h-[300px] overflow-hidden rounded-2xl">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-8 left-8 right-8 space-y-2">
                  <h3 className="text-2xl md:text-3xl font-montserrat font-extrabold text-foreground">
                    {item.shortName}
                  </h3>
                  <div className="flex items-center gap-2 text-accent text-xs font-montserrat font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0 translate-x-[-10px]">
                    View Details <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
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
              <div className="flex flex-col md:flex-row gap-12 items-start">
                <div className="md:w-3/5 space-y-12">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-montserrat font-bold uppercase tracking-widest">
                      Academic Details
                    </div>
                    <h2 className="text-4xl md:text-5xl font-montserrat font-extrabold tracking-tighter text-foreground">
                      {selectedItem.name}
                    </h2>
                  </div>

                  <div className="space-y-10">
                    {selectedItem.courses && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-montserrat font-bold text-foreground flex items-center gap-2">
                          <BookOpen className="w-5 h-5 text-accent" />
                          Relevant Courses
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-muted-foreground">
                          {selectedItem.courses.map((course, index) => (
                            <div key={index} className="flex gap-2 text-sm">
                              <span className="text-accent">&#8226;</span>
                              {course}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedItem.activities && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-montserrat font-bold text-foreground flex items-center gap-2">
                          <Users className="w-5 h-5 text-accent" />
                          Activities
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-muted-foreground">
                          {selectedItem.activities.map((activity, index) => (
                            <div key={index} className="flex gap-2 text-sm">
                              <span className="text-accent">&#8226;</span>
                              {activity}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedItem.awards && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-montserrat font-bold text-foreground flex items-center gap-2">
                          <Award className="w-5 h-5 text-accent" />
                          Awards
                        </h3>
                        <div className="grid grid-cols-1 gap-3 text-muted-foreground">
                          {selectedItem.awards.map((award, index) => (
                            <div key={index} className="flex gap-2 text-sm leading-relaxed">
                              <span className="text-accent">&#8226;</span>
                              {award}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="md:w-2/5 w-full">
                  <div className="rounded-2xl overflow-hidden border border-border shadow-2xl p-8 bg-card flex justify-center sticky top-24">
                    <Image
                      src={selectedItem.image}
                      alt={selectedItem.name}
                      width={300}
                      height={300}
                      className="w-full h-auto object-contain max-w-[240px]"
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

export default Education;
