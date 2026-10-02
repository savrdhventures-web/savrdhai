import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  AGENTS_DATA,
  Agent,
} from '../data/workforceData';
import Agent3Slider from './Agent3Slider';
import {
  Bot,
  PhoneCall,
  Headphones,
  BrainCircuit,
  DollarSign,
  FileCheck,
  ShieldCheck,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  LockKeyhole,
  Activity,
  Layers,
  SlidersHorizontal,
  Grid3X3,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  'sav-sales': PhoneCall,
  'sav-bde': ArrowRight,
  'sav-sales-manager': BrainCircuit,
  'sav-support': Headphones,
  'sav-followup': Clock,
  'sav-finance': DollarSign,
  'sav-credit': ShieldCheck,
  'sav-document': FileCheck,
};

export default function AgentsShowcase() {
  const [viewMode, setViewMode] = useState<'slider' | 'grid'>('slider');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'sales' | 'operations' | 'support'>('all');
  const [activeAgentModal, setActiveAgentModal] = useState<Agent | null>(null);

  const filteredAgents = AGENTS_DATA.filter((agent) => {
    if (selectedCategory === 'all') return true;
    return agent.category === selectedCategory;
  });

  return (
    <section id="agents" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#49E3FF]">
            <Bot className="w-3.5 h-3.5" />
            <span>Specialized AI Workforce</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Specialized AI agents. One coordinated team.
          </h2>
          <p className="text-sm text-[#8AA7C0] leading-relaxed">
            Give each agent a defined role, approved knowledge, and action boundaries. SAV coordinates execution across the team and surfaces only the moments that need human judgment.
          </p>
        </div>

        {/* View Mode Toggle (3-Agent Slider vs Full Grid) */}
        <div className="flex items-center p-1 rounded-xl bg-[#091a2b] border border-[#1b3a58] self-start md:self-auto">
          <button
            onClick={() => setViewMode('slider')}
            className={`relative flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono rounded-lg transition-colors focus:outline-none ${
              viewMode === 'slider' ? 'text-[#050C15] font-bold' : 'text-[#8AA7C0] hover:text-white'
            }`}
          >
            {viewMode === 'slider' && (
              <motion.div
                layoutId="viewModePill"
                className="absolute inset-0 bg-[#49E3FF] rounded-lg shadow-[0_0_12px_rgba(73,227,255,0.4)]"
                transition={{ type: 'spring', stiffness: 450, damping: 30 }}
              />
            )}
            <SlidersHorizontal className="w-3.5 h-3.5 relative z-10" />
            <span className="relative z-10">3-Agent Slider</span>
          </button>

          <button
            onClick={() => setViewMode('grid')}
            className={`relative flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono rounded-lg transition-colors focus:outline-none ${
              viewMode === 'grid' ? 'text-[#050C15] font-bold' : 'text-[#8AA7C0] hover:text-white'
            }`}
          >
            {viewMode === 'grid' && (
              <motion.div
                layoutId="viewModePill"
                className="absolute inset-0 bg-[#49E3FF] rounded-lg shadow-[0_0_12px_rgba(73,227,255,0.4)]"
                transition={{ type: 'spring', stiffness: 450, damping: 30 }}
              />
            )}
            <Grid3X3 className="w-3.5 h-3.5 relative z-10" />
            <span className="relative z-10">All Agents Grid</span>
          </button>
        </div>
      </div>

      {/* Render 3-Slide Carousel or Grid based on viewMode */}
      {viewMode === 'slider' ? (
        <Agent3Slider />
      ) : (
        <div className="space-y-8">
          {/* Category Filter for Grid */}
          <div className="flex flex-wrap items-center gap-2 pb-2">
            {[
              { id: 'all', label: 'All Agents (8)' },
              { id: 'sales', label: 'Sales & Growth' },
              { id: 'operations', label: 'Operations & Risk' },
              { id: 'support', label: 'Support & Care' },
            ].map((tab) => {
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-all focus:outline-none ${
                    isActive
                      ? 'border-[#49E3FF] bg-[#49E3FF]/15 text-[#49E3FF] shadow-[0_0_12px_rgba(73,227,255,0.25)]'
                      : 'border-[#1b3a58] bg-[#091a2b] text-[#8AA7C0] hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Agents Grid with Layout Animation */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredAgents.map((agent) => {
                const AgentIcon = iconMap[agent.id] || Bot;
                return (
                  <motion.div
                    layout
                    key={agent.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{
                      y: -6,
                      transition: { type: 'spring', stiffness: 350, damping: 20 },
                    }}
                    className="group relative rounded-xl border border-[#1b3a58] bg-[#091a2b]/80 hover:bg-[#0e273f] p-5 flex flex-col justify-between transition-colors shadow-[0_10px_25px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_35px_rgba(73,227,255,0.08)] cursor-pointer"
                    onClick={() => setActiveAgentModal(agent)}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2 rounded-lg border border-[#234b73] bg-[#102b46] text-[#49E3FF] group-hover:scale-105 group-hover:shadow-[0_0_12px_rgba(73,227,255,0.3)] transition-all">
                          <AgentIcon className="w-5 h-5" />
                        </div>

                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#112940] border border-[#1b4369] text-[10px] font-mono text-[#49E3FF]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#49E3FF] animate-pulse" />
                          <span>ACTIVE</span>
                        </div>
                      </div>

                      <h3 className="text-base font-bold text-white group-hover:text-[#49E3FF] transition-colors">
                        {agent.name}
                      </h3>
                      <div className="text-[11px] font-mono text-[#6E8FA9] mb-3">
                        {agent.role}
                      </div>

                      <p className="text-xs text-[#8AA7C0] leading-relaxed line-clamp-3 mb-4">
                        {agent.description}
                      </p>
                    </div>

                    <div>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {agent.channels.map((ch) => (
                          <span
                            key={ch}
                            className="px-2 py-0.5 rounded bg-[#071421] border border-[#173654] text-[10px] font-mono text-[#95B3CF]"
                          >
                            {ch}
                          </span>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-[#15324e] flex items-center justify-between text-xs font-mono">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-[#6E8FA9]">{agent.statLabel}</span>
                          <span className="text-white font-semibold tabular-nums">{agent.stat}</span>
                        </div>

                        <span className="text-[#49E3FF] text-[11px] font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Inspect <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      )}

      {/* Trust & Boundary Indicators */}
      <div className="flex flex-wrap items-center gap-6 mt-12 text-xs font-mono text-[#8AA7C0]">
        <div className="flex items-center gap-2">
          <LockKeyhole className="w-4 h-4 text-[#49E3FF]" />
          <span>Role-based execution boundaries</span>
        </div>
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#49E3FF]" />
          <span>Real-time action audit trail</span>
        </div>
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#49E3FF]" />
          <span>Shared conversational memory</span>
        </div>
      </div>

      {/* Agent Detail Modal */}
      <AnimatePresence>
        {activeAgentModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="relative w-full max-w-xl rounded-2xl border border-[#234b73] bg-[#081829] p-6 shadow-2xl space-y-5"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-[#102b46] border border-[#234b73] text-[#49E3FF]">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      {activeAgentModal.name}
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#49E3FF]/15 border border-[#49E3FF]/30 text-[#49E3FF]">
                        AI Agent
                      </span>
                    </h3>
                    <p className="text-xs font-mono text-[#8AA7C0]">{activeAgentModal.role}</p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveAgentModal(null)}
                  className="p-1.5 rounded-lg border border-[#1b3a58] text-[#8AA7C0] hover:text-white hover:bg-[#122842] transition-colors focus:outline-none"
                >
                  ✕
                </button>
              </div>

              <p className="text-sm text-[#95B3CF] leading-relaxed">
                {activeAgentModal.description}
              </p>

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#6E8FA9]">
                  Verified Agent Capabilities:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {activeAgentModal.capabilities.map((cap) => (
                    <div
                      key={cap}
                      className="flex items-center gap-2 p-2 rounded-lg bg-[#0c2035] border border-[#1b3d60] text-xs text-[#D8E6F5]"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#49E3FF] shrink-0" />
                      <span className="truncate">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-[#061422] border border-[#15324e] text-xs font-mono">
                <div>
                  <span className="text-[#6E8FA9] block text-[10px]">CURRENT LIVE WORKFLOW:</span>
                  <span className="text-white font-medium">{activeAgentModal.activeWorkflow}</span>
                </div>
                <div>
                  <span className="text-[#6E8FA9] block text-[10px]">EXECUTION CONFIDENCE:</span>
                  <span className="text-[#49E3FF] font-semibold tabular-nums">
                    {activeAgentModal.confidence}% Verified
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setActiveAgentModal(null)}
                  className="px-4 py-2 rounded-lg border border-[#1b3a58] text-xs font-mono text-[#8AA7C0] hover:text-white transition-colors focus:outline-none"
                >
                  Close Dossier
                </button>
                <a
                  href="#workflow"
                  onClick={() => setActiveAgentModal(null)}
                  className="px-4 py-2 rounded-lg bg-[#49E3FF] hover:bg-[#68e9ff] text-[#050C15] font-semibold text-xs font-mono transition-colors focus:outline-none"
                >
                  Test in Workflow Simulator →
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
