import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Sliders, ArrowRight } from 'lucide-react';

interface NavigationProps {
  onOpenInspector: () => void;
}

export function BrandMark() {
  return (
    <div className="relative flex items-center gap-1" aria-hidden="true">
      <motion.span
        animate={{ scaleY: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        className="w-1 h-3.5 bg-[#49E3FF] rounded-full shadow-[0_0_8px_rgba(73,227,255,0.8)]"
      />
      <motion.span
        animate={{ scaleY: [1, 1.8, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 1.8, delay: 0.2, repeat: Infinity, ease: 'easeInOut' }}
        className="w-1 h-5 bg-[#5B8CFF] rounded-full shadow-[0_0_10px_rgba(91,140,255,0.8)]"
      />
      <motion.span
        animate={{ scaleY: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.8, delay: 0.4, repeat: Infinity, ease: 'easeInOut' }}
        className="w-1 h-3 bg-[#7A5CFF] rounded-full shadow-[0_0_8px_rgba(122,92,255,0.8)]"
      />
    </div>
  );
}

export default function Navigation({ onOpenInspector }: NavigationProps) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50 w-full border-b border-[#1b3450]/60 bg-[#050C15]/80 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark with BrandMark */}
        <a href="#top" className="flex items-center gap-3 group focus:outline-none">
          <BrandMark />
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-white group-hover:text-[#49E3FF] transition-colors">
              SAVRDH
            </span>
            <span className="text-[9px] font-mono tracking-widest text-[#6E8FA9] uppercase">
              Intelligence Workforce
            </span>
          </div>
        </a>

        {/* Zone 2: 4 clean navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-wider font-mono text-[#8AA7C0]">
          <a
            href="#platform"
            className="hover:text-[#49E3FF] transition-colors relative py-1 focus:outline-none"
          >
            Platform
          </a>
          <a
            href="#agents"
            className="hover:text-[#49E3FF] transition-colors relative py-1 focus:outline-none"
          >
            AI Agents
          </a>
          <a
            href="#workflow"
            className="hover:text-[#49E3FF] transition-colors relative py-1 focus:outline-none"
          >
            Workflows
          </a>
          <a
            href="#integrations"
            className="hover:text-[#49E3FF] transition-colors relative py-1 focus:outline-none"
          >
            Integrations
          </a>
        </nav>

        {/* Zone 3: Primary action + Motion Inspector trigger */}
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenInspector}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#49E3FF]/30 bg-[#49E3FF]/10 hover:bg-[#49E3FF]/20 text-[#49E3FF] text-xs font-mono transition-all shadow-[0_0_12px_rgba(73,227,255,0.15)] focus:outline-none"
            title="Inspect Framer Motion code & tweak spring parameters"
          >
            <Sliders className="w-3.5 h-3.5 animate-pulse" />
            <span className="hidden sm:inline">Motion Guide & Inspector</span>
            <span className="sm:hidden">Motion</span>
          </motion.button>

          <motion.a
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.98 }}
            href="#contact"
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-[#49E3FF] to-[#5B8CFF] text-[#050C15] font-semibold text-xs tracking-wide shadow-[0_0_20px_rgba(73,227,255,0.3)] hover:shadow-[0_0_25px_rgba(73,227,255,0.5)] transition-all whitespace-nowrap focus:outline-none"
          >
            <span>Request Demo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.a>
        </div>
      </div>
    </motion.header>
  );
}
