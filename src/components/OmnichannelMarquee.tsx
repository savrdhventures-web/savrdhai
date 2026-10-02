import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CHANNELS_LIST } from '../data/workforceData';
import { Radio } from 'lucide-react';

export default function OmnichannelMarquee() {
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Triple items for seamless loop
  const duplicatedChannels = [...CHANNELS_LIST, ...CHANNELS_LIST, ...CHANNELS_LIST];

  return (
    <section className="relative py-10 border-y border-[#142d45] bg-[#071320]/70 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#6E8FA9]">
          <Radio className="w-3.5 h-3.5 text-[#49E3FF] animate-pulse" />
          <span>One Workforce. Every Business Channel.</span>
        </div>
        <span className="text-[11px] font-mono text-[#49E3FF]/70 hidden sm:inline">
          Autonomous Omnichannel Routing Engine
        </span>
      </div>

      {/* Infinite Motion Track */}
      <div
        className="relative flex overflow-x-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          animate={{
            x: isPaused ? undefined : ['0%', '-50%'],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 28,
              ease: 'linear',
            },
          }}
          className="flex gap-4 shrink-0 pr-4"
        >
          {duplicatedChannels.map((channel, idx) => {
            const isSelected = selectedChannel === channel;
            return (
              <motion.button
                key={`${channel}-${idx}`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedChannel(channel)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-xs font-mono whitespace-nowrap transition-all focus:outline-none ${
                  isSelected
                    ? 'border-[#49E3FF] bg-[#49E3FF]/20 text-white shadow-[0_0_15px_rgba(73,227,255,0.4)]'
                    : 'border-[#1b3957] bg-[#091b2c]/80 text-[#95B3CF] hover:border-[#3d6e99] hover:text-white'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#49E3FF]" />
                <span className="font-medium">{channel}</span>
                <span className="text-[10px] text-[#4f789d] font-mono">Sync</span>
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      {selectedChannel && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto mt-4 text-center px-4 py-2 rounded-lg bg-[#0e253c]/90 border border-[#234e75] text-xs font-mono text-[#D8E6F5]"
        >
          <span className="text-[#49E3FF] font-semibold">{selectedChannel}</span> stream is active.
          SAV multi-agent memory context maintains thread continuity across all interactions.
        </motion.div>
      )}
    </section>
  );
}
