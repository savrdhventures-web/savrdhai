import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrandMark } from './Navigation';
import { Network, CheckCircle2, Zap, ArrowRight, ShieldCheck } from 'lucide-react';

const INTEGRATIONS = [
  { name: 'WhatsApp Business', latency: '18ms', type: 'Messaging Gateway', status: 'Online' },
  { name: 'Voice Telephony AI', latency: '32ms', type: 'SIP WebRTC Trunk', status: 'Online' },
  { name: 'Savrdh CRM', latency: '12ms', type: 'Native Core CRM', status: 'Online' },
  { name: 'Transactional Email', latency: '45ms', type: 'SMTP / Resend', status: 'Online' },
  { name: 'SMS Bulk Gateway', latency: '28ms', type: 'Twilio / Telnyx', status: 'Online' },
  { name: 'Supabase Postgres', latency: '14ms', type: 'Vector & Relational', status: 'Online' },
  { name: 'Custom Webhooks', latency: '22ms', type: 'Real-time Ingestion', status: 'Online' },
  { name: 'REST API & GraphQL', latency: '16ms', type: 'Developer API', status: 'Online' },
];

export default function OmnichannelEcosystem() {
  const [selectedIntegration, setSelectedIntegration] = useState(INTEGRATIONS[0]);

  return (
    <section id="integrations" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#49E3FF]">
            <Network className="w-3.5 h-3.5" />
            <span>Built To Work With Your Stack</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Connect the systems your team depends on every day.
          </h2>
          <p className="text-sm text-[#8AA7C0] leading-relaxed">
            Bring communication, CRM, enterprise databases, and business workflows into one unified execution environment so every agent works from the same trusted context.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono text-[#8AA7C0]">
          <span className="w-2 h-2 rounded-full bg-[#49E3FF] animate-ping" />
          <span>Active Ingestion Mesh: 8 Protocol Adapters</span>
        </div>
      </div>

      {/* Interactive Ecosystem Canvas */}
      <div className="relative rounded-2xl border border-[#214365] bg-[#071626] p-8 sm:p-12 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        {/* Radial Waves from Center */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.8, 1], opacity: [0.35, 0, 0.35] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-72 h-72 rounded-full border border-[#49E3FF]/30"
          />
          <motion.div
            animate={{ scale: [1, 2.2, 1], opacity: [0.25, 0, 0.25] }}
            transition={{ duration: 7, delay: 1, repeat: Infinity, ease: 'easeInOut' }}
            className="w-96 h-96 rounded-full border border-[#5B8CFF]/20"
          />
          <div className="w-[540px] h-[540px] rounded-full border border-[#1b3a58]/40" />
        </div>

        <div className="relative z-10 flex flex-col items-center">
          {/* Central SAV Core Node */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative flex flex-col items-center justify-center w-36 h-36 rounded-full bg-[#0d2842] border-2 border-[#49E3FF] shadow-[0_0_50px_rgba(73,227,255,0.35)] z-20 cursor-pointer"
          >
            <BrandMark />
            <span className="text-sm font-extrabold text-white mt-1">SAV</span>
            <span className="text-[9px] font-mono tracking-widest text-[#49E3FF]">AI CORE</span>
          </motion.div>

          {/* Surrounding Node Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full mt-12">
            {INTEGRATIONS.map((item) => {
              const isSelected = selectedIntegration.name === item.name;
              return (
                <motion.button
                  key={item.name}
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedIntegration(item)}
                  className={`p-4 rounded-xl border text-left transition-all focus:outline-none ${
                    isSelected
                      ? 'border-[#49E3FF] bg-[#112d47] shadow-[0_0_20px_rgba(73,227,255,0.25)]'
                      : 'border-[#1b3a58] bg-[#091a2b]/80 hover:border-[#30608c] hover:bg-[#0c2238]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-2 h-2 rounded-full bg-[#49E3FF]" />
                    <span className="text-[10px] font-mono text-[#49E3FF] tabular-nums">
                      {item.latency}
                    </span>
                  </div>

                  <div className="text-xs font-bold text-white mb-1">{item.name}</div>
                  <div className="text-[10px] font-mono text-[#6E8FA9]">{item.type}</div>
                </motion.button>
              );
            })}
          </div>

          {/* Selected Node Status Footer */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedIntegration.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl border border-[#234b73] bg-[#0b2136] w-full max-w-2xl text-xs font-mono"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#49E3FF]" />
                <div>
                  <span className="text-white font-bold">{selectedIntegration.name} Adapter</span>
                  <span className="text-[#8AA7C0] block text-[11px]">
                    Continuous bi-directional telemetry synchronizer
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-[10px] text-[#6E8FA9] block">LATENCY</span>
                  <span className="text-[#49E3FF] font-bold tabular-nums">
                    {selectedIntegration.latency}
                  </span>
                </div>
                <div className="px-2.5 py-1 rounded bg-[#102d4a] border border-[#204a70] text-[#98E2A5] text-[10px]">
                  {selectedIntegration.status}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
