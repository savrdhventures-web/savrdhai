import React from 'react';
import { motion } from 'motion/react';
import { FEATURES_DATA } from '../data/workforceData';
import { ArrowUpRight, Cpu } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export default function PlatformFeatures() {
  return (
    <section id="platform" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#49E3FF]">
            <Cpu className="w-3.5 h-3.5" />
            <span>One Intelligent Workforce</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Turn repetitive business operations into intelligent execution.
          </h2>
        </div>
        <p className="text-sm text-[#8AA7C0] max-w-md leading-relaxed">
          Bring AI agents, workflows, communication, approvals, and analytics into one unified command center — designed to advance work forward without constant manual chasing.
        </p>
      </div>

      {/* Feature Grid with Staggered Entrance */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {FEATURES_DATA.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              whileHover={{
                y: -6,
                transition: { type: 'spring', stiffness: 350, damping: 22 },
              }}
              className="group relative rounded-xl border border-[#1b3a58] bg-[#081829]/70 hover:bg-[#0c223a] p-6 transition-colors shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_40px_rgba(73,227,255,0.08)] flex flex-col justify-between"
            >
              {/* Subtle top indicator bar */}
              <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-[#49E3FF]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-lg border border-[#234b73] bg-[#102b46] text-[#49E3FF] group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(73,227,255,0.3)] transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-[#6E8FA9] group-hover:text-[#49E3FF] transition-colors tabular-nums">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-[#49E3FF] transition-colors">
                  {feature.title}
                </h3>

                <p className="text-xs text-[#8AA7C0] leading-relaxed">
                  {feature.description}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-[#15324e] flex items-center justify-between text-xs font-mono">
                <span className="text-[#49E3FF] font-medium">{feature.metrics}</span>
                <span className="flex items-center gap-1 text-[#6E8FA9] group-hover:text-white transition-colors">
                  Explore
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
