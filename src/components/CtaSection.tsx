import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Send } from 'lucide-react';

export default function CtaSection() {
  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative rounded-3xl border border-[#214365] bg-gradient-to-b from-[#091e33] to-[#06121f] p-10 sm:p-16 text-center overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
        {/* Glow ambient orb */}
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[550px] h-[350px] bg-[#49E3FF]/20 rounded-full blur-[100px] pointer-events-none"
        />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#49E3FF]/30 bg-[#49E3FF]/10 text-xs font-mono text-[#49E3FF]">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>SAVRDH INTELLIGENCE WORKFORCE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Put intelligent execution to work across your entire business.
          </h2>

          <p className="text-base text-[#95B3CF] max-w-2xl mx-auto leading-relaxed">
            AI agents that communicate, coordinate, and execute across sales, support, and operations — while your human leadership stays firmly in control.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <motion.a
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              href="mailto:info@savrdhtechnology.com"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#49E3FF] to-[#5B8CFF] text-[#050C15] font-bold text-sm shadow-[0_0_30px_rgba(73,227,255,0.4)] hover:shadow-[0_0_40px_rgba(73,227,255,0.6)] transition-all focus:outline-none"
            >
              <span>Request a Live Demo</span>
              <ArrowRight className="w-4 h-4" />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              href="https://www.savrdhtechnology.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl border border-[#23486c] bg-[#0c2035]/80 hover:bg-[#122b46] text-white font-medium text-sm transition-all focus:outline-none"
            >
              <span>Visit Savrdh Technology</span>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
