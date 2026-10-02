import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Lock, CheckCircle2, ChevronDown, UserCheck, AlertTriangle } from 'lucide-react';

const SECURITY_ITEMS = [
  {
    title: 'Human-in-the-Loop Approval Gates',
    detail: 'High-risk actions (refunds above threshold, contract signings, external wire instructions) trigger an instant WhatsApp / Slack approval notification to designated managers before executing.',
    status: 'Enforced',
    triggerCount: '14 today',
  },
  {
    title: 'Role-Based Agent Scopes (RBAC)',
    detail: 'Every agent runs with strictly partitioned OAuth scopes and database permissions. A sales telecalling agent cannot read employee payroll records or modify financial ledgers.',
    status: 'Verified',
    triggerCount: '8 Agents Bound',
  },
  {
    title: 'Real-Time Escalation Rules',
    detail: 'When sentiment analysis detects customer distress, repeated objections, or unhandled intent, SAV immediately bridges the live phone call or chat thread to a human specialist.',
    status: 'Active',
    triggerCount: '0.4% Escalation Rate',
  },
  {
    title: 'Immutable Activity Audit Trail',
    detail: 'Every prompt ingestion, tool invocation, token count, API response, and human intervention is cryptographically hashed and logged for regulatory audit compliance.',
    status: 'Logged',
    triggerCount: '100% Traceable',
  },
];

export default function SecurityGovernance() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section id="security" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative rounded-2xl border border-[#214365] bg-[#071727] p-8 sm:p-12 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#49E3FF]">
              <Lock className="w-3.5 h-3.5" />
              <span>Governance Built Into Every Action</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white leading-tight">
              Move faster without giving up control.
            </h2>
            <p className="text-sm text-[#8AA7C0] leading-relaxed">
              Control what every agent can access, automate low-risk tasks autonomously, mandate human approval where it matters, and maintain a complete audit history.
            </p>

            <div className="p-4 rounded-xl border border-[#1b3a58] bg-[#0c2035] space-y-2 mt-4 text-xs font-mono">
              <div className="flex items-center justify-between text-[#49E3FF]">
                <span>GOVERNANCE HEALTH</span>
                <span>100% OPERATIONAL</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[#10273f] overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#49E3FF] to-[#98E2A5] rounded-full w-full" />
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Accordion List */}
          <div className="lg:col-span-7 space-y-3">
            {SECURITY_ITEMS.map((item, idx) => {
              const isExpanded = expandedIndex === idx;
              return (
                <motion.div
                  key={item.title}
                  className="rounded-xl border border-[#1b3a58] bg-[#091a2b]/90 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                    className="w-full p-4 flex items-center justify-between gap-4 text-left hover:bg-[#0d2238] transition-colors focus:outline-none"
                  >
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="w-4 h-4 text-[#49E3FF] shrink-0" />
                      <span className="text-xs sm:text-sm font-bold text-white">
                        {item.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="px-2 py-0.5 rounded bg-[#102a42] border border-[#204a70] text-[10px] font-mono text-[#98E2A5]">
                        {item.status}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#6E8FA9] transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="px-4 pb-4 pt-1 text-xs text-[#8AA7C0] border-t border-[#132c44] bg-[#061421] space-y-2"
                      >
                        <p className="leading-relaxed">{item.detail}</p>
                        <div className="text-[10px] font-mono text-[#49E3FF] flex items-center gap-2">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Telemetry metric: {item.triggerCount}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
