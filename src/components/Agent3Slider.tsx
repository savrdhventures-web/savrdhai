import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  PhoneCall,
  Headphones,
  BrainCircuit,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Zap,
  Play,
  Pause,
  Layers,
  Activity,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

interface AgentSlideData {
  id: string;
  number: string;
  name: string;
  role: string;
  category: string;
  icon: React.ElementType;
  tagline: string;
  description: string;
  stat: string;
  statDetail: string;
  channels: string[];
  capabilities: string[];
  liveTask: string;
  confidence: string;
  color: string;
  borderColor: string;
}

const THREE_AGENTS: AgentSlideData[] = [
  {
    id: 'sav-sales',
    number: '01',
    name: 'SAV-Sales',
    role: 'Autonomous Sales & Telecalling Executive',
    category: 'Revenue & Growth',
    icon: PhoneCall,
    tagline: 'Never let a high-intent lead grow cold.',
    description:
      'Qualifies inbound inquiries within 45 seconds, conducts dynamic multi-turn discovery across WhatsApp and voice calls, resolves pricing objections, and books confirmed slots directly into account executives’ calendars.',
    stat: '42 leads',
    statDetail: 'Queued for autonomous contact today',
    channels: ['WhatsApp Business', 'Voice Telephony AI', 'SMS', 'Email'],
    capabilities: [
      'Autonomous lead qualification',
      'Dynamic intent scoring',
      'Objection handling engine',
      'Direct calendar booking',
      'Akbs & Savrdh CRM sync',
    ],
    liveTask: 'Engaging 14 WhatsApp prospects from inbound enterprise trial signup',
    confidence: '99.4%',
    color: 'from-[#49E3FF]/20 to-[#5B8CFF]/10',
    borderColor: 'border-[#49E3FF]',
  },
  {
    id: 'sav-support',
    number: '02',
    name: 'SAV-Support',
    role: '24×7 Customer Support Executive',
    category: 'Customer Experience',
    icon: Headphones,
    tagline: 'Sub-second resolutions grounded in truth.',
    description:
      'Instantly resolves routine customer inquiries, preserves multi-channel conversation context, grounds every response in live enterprise documentation, and escalates to human specialists with synthesized dossiers only when necessary.',
    stat: '24×7 live',
    statDetail: 'Zero ticket backlog · 128 resolved today',
    channels: ['WhatsApp', 'Voice AI', 'Web Chat', 'Zendesk'],
    capabilities: [
      'Zero-latency first response',
      'Context preservation graph',
      'Knowledge base vector lookup',
      'Automated ticket tagging',
      'Smart human escalation bridge',
    ],
    liveTask: 'Auto-resolving API integration inquiry with code snippet recommendations',
    confidence: '99.1%',
    color: 'from-[#5B8CFF]/20 to-[#7A5CFF]/10',
    borderColor: 'border-[#5B8CFF]',
  },
  {
    id: 'sav-operations',
    number: '03',
    name: 'SAV-Operations',
    role: 'Workflow Execution & Governance Orchestrator',
    category: 'Enterprise Automation',
    icon: BrainCircuit,
    tagline: 'End-to-end execution without manual follow-up.',
    description:
      'Converts repetitive cross-system work into self-healing automations. Reconciles vendor invoices, triggers financial risk checks, logs compliant audit trails, and updates downstream databases with cryptographic verification.',
    stat: '86 actions',
    statDetail: 'Ready for autonomous dispatch · $420K processed',
    channels: ['Savrdh CRM', 'Supabase Postgres', 'Webhooks', 'REST API'],
    capabilities: [
      'Event-driven orchestrations',
      'Human-in-the-loop gates',
      'Automated invoice reconciliation',
      'Cryptographic audit logging',
      'Real-time SLA monitoring',
    ],
    liveTask: 'Executing automated end-of-day CRM reconciliation and ledger verification',
    confidence: '99.7%',
    color: 'from-[#7A5CFF]/20 to-[#49E3FF]/10',
    borderColor: 'border-[#7A5CFF]',
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 340 : -340,
    opacity: 0,
    scale: 0.94,
    filter: 'blur(4px)',
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      x: { type: 'spring' as const, stiffness: 320, damping: 30 },
      opacity: { duration: 0.28 },
      scale: { type: 'spring' as const, stiffness: 320, damping: 30 },
      filter: { duration: 0.2 },
    },
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 340 : -340,
    opacity: 0,
    scale: 0.94,
    filter: 'blur(4px)',
    transition: {
      x: { type: 'spring' as const, stiffness: 320, damping: 30 },
      opacity: { duration: 0.2 },
      scale: { type: 'spring' as const, stiffness: 320, damping: 30 },
    },
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function Agent3Slider() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSimulatingAction, setIsSimulatingAction] = useState(false);
  const [simulatedLog, setSimulatedLog] = useState<string | null>(null);

  // Wrap index to 0, 1, 2
  const activeIndex = ((page % 3) + 3) % 3;
  const currentAgent = THREE_AGENTS[activeIndex];
  const Icon = currentAgent.icon;

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
    setIsSimulatingAction(false);
    setSimulatedLog(null);
  };

  const jumpToSlide = (targetIndex: number) => {
    const diff = targetIndex - activeIndex;
    if (diff !== 0) {
      setPage([page + diff, diff]);
      setIsSimulatingAction(false);
      setSimulatedLog(null);
    }
  };

  // Autoplay functionality
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, page]);

  const handleSimulateAction = () => {
    setIsSimulatingAction(true);
    setSimulatedLog(`Triggering ${currentAgent.name} execution pipeline...`);
    setTimeout(() => {
      setSimulatedLog(`[PASS] Intent verified. Contacting queue via ${currentAgent.channels[0]}.`);
      setTimeout(() => {
        setIsSimulatingAction(false);
        setSimulatedLog(`[COMPLETED] 14 actions executed with 0 human bottlenecks.`);
      }, 1200);
    }, 800);
  };

  return (
    <div className="w-full relative">
      {/* 3-Slide Top Control Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#1b3a58]">
        {/* Number Selector Pills [01] [02] [03] */}
        <div className="flex items-center gap-2 p-1 rounded-xl bg-[#071727] border border-[#183a5c]">
          {THREE_AGENTS.map((agent, idx) => {
            const isSelected = activeIndex === idx;
            return (
              <button
                key={agent.id}
                onClick={() => jumpToSlide(idx)}
                className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all focus:outline-none ${
                  isSelected ? 'text-[#050C15] font-bold' : 'text-[#8AA7C0] hover:text-white'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeSlidePill"
                    className="absolute inset-0 bg-gradient-to-r from-[#49E3FF] to-[#5B8CFF] rounded-lg shadow-[0_0_15px_rgba(73,227,255,0.4)]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 font-bold">{agent.number}</span>
                <span className="relative z-10 hidden md:inline truncate">{agent.name}</span>
              </button>
            );
          })}
        </div>

        {/* Slide Counter, Autoplay Toggle & Arrow Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-colors focus:outline-none ${
              isPlaying
                ? 'border-[#49E3FF] bg-[#49E3FF]/15 text-[#49E3FF]'
                : 'border-[#1b3a58] bg-[#091a2b] text-[#8AA7C0] hover:text-white'
            }`}
            title={isPlaying ? 'Pause auto-sliding' : 'Start auto-sliding'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isPlaying ? 'Autoplay On' : 'Autoplay'}</span>
          </button>

          <span className="text-xs font-mono text-[#6E8FA9] tabular-nums">
            <b className="text-[#49E3FF]">0{activeIndex + 1}</b> / 03
          </span>

          <div className="flex items-center gap-1">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => paginate(-1)}
              className="p-2 rounded-lg border border-[#1b3a58] bg-[#091a2b] text-[#8AA7C0] hover:text-white hover:border-[#32618c] transition-colors focus:outline-none"
              aria-label="Previous Slide"
            >
              <ArrowLeft className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => paginate(1)}
              className="p-2 rounded-lg border border-[#1b3a58] bg-[#091a2b] text-[#8AA7C0] hover:text-white hover:border-[#32618c] transition-colors focus:outline-none"
              aria-label="Next Slide"
            >
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Main Slide Card Container with Drag Gestures and AnimatePresence */}
      <div className="relative min-h-[440px] sm:min-h-[400px] overflow-hidden rounded-2xl border border-[#214365] bg-[#071627] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="w-full p-6 sm:p-8 cursor-grab active:cursor-grabbing select-none"
          >
            {/* Background dynamic ambient tint */}
            <div
              className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-br ${currentAgent.color} rounded-full blur-3xl pointer-events-none`}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
              {/* Left Column: Agent Dossier & Editorial */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="p-3 rounded-xl border border-[#2a5580] bg-[#0e2740] text-[#49E3FF] shadow-[0_0_20px_rgba(73,227,255,0.25)]">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-[#49E3FF] tracking-wider uppercase font-semibold">
                        AGENT {currentAgent.number} · {currentAgent.category}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#49E3FF] animate-pulse" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {currentAgent.name}
                    </h3>
                  </div>
                </div>

                <div className="text-sm font-semibold text-[#49E3FF] italic">
                  "{currentAgent.tagline}"
                </div>

                <p className="text-xs sm:text-sm text-[#95B3CF] leading-relaxed">
                  {currentAgent.description}
                </p>

                {/* Capabilities Badges */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#6E8FA9]">
                    SPECIALIZED SKILL ARCHITECTURE:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {currentAgent.capabilities.map((cap) => (
                      <span
                        key={cap}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0a1e32] border border-[#1b3d60] text-[11px] font-mono text-[#D8E6F5]"
                      >
                        <CheckCircle2 className="w-3 h-3 text-[#49E3FF] shrink-0" />
                        <span>{cap}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Interactive Action Simulator Button */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleSimulateAction}
                    disabled={isSimulatingAction}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#49E3FF] to-[#5B8CFF] text-[#050C15] font-mono text-xs font-bold shadow-[0_0_15px_rgba(73,227,255,0.3)] transition-all focus:outline-none"
                  >
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    <span>{isSimulatingAction ? 'EXECUTING PIPELINE...' : `Simulate ${currentAgent.name} Execution`}</span>
                  </motion.button>

                  <span className="text-[11px] font-mono text-[#6E8FA9]">
                    Swipe or drag card horizontally to slide
                  </span>
                </div>

                {/* Live simulation feedback banner */}
                {simulatedLog && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-lg border border-[#24527d] bg-[#0b2239] text-xs font-mono text-[#49E3FF] flex items-center gap-2"
                  >
                    <Activity className="w-4 h-4 animate-spin" />
                    <span>{simulatedLog}</span>
                  </motion.div>
                )}
              </div>

              {/* Right Column: Live Telemetry & Channel Cockpit */}
              <div className="lg:col-span-5 space-y-4">
                {/* Stat Cockpit Box */}
                <div className="p-4 rounded-xl border border-[#1f4266] bg-[#091b2e] space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#6E8FA9]">TELEMETRY PERFORMANCE</span>
                    <span className="text-[#98E2A5] font-semibold">{currentAgent.confidence} Confidence</span>
                  </div>

                  <div className="text-3xl font-extrabold text-white font-mono tabular-nums tracking-tight">
                    {currentAgent.stat}
                  </div>
                  <div className="text-xs text-[#8AA7C0]">{currentAgent.statDetail}</div>
                </div>

                {/* Connected Channels List */}
                <div className="p-4 rounded-xl border border-[#1b3a58] bg-[#061422] space-y-2.5">
                  <div className="text-[10px] font-mono text-[#6E8FA9] uppercase tracking-wider">
                    SYNCHRONIZED BUSINESS CHANNELS
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {currentAgent.channels.map((ch) => (
                      <div
                        key={ch}
                        className="flex items-center gap-2 p-2 rounded-lg bg-[#0a1e32] border border-[#183652] text-xs font-mono text-[#D8E6F5]"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#49E3FF]" />
                        <span className="truncate">{ch}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Current Active Workflow Banner */}
                <div className="p-3 rounded-lg border border-[#16334f] bg-[#071524] text-xs font-mono text-[#8AA7C0] flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#49E3FF] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-bold block">Current Task Stream:</span>
                    <span>{currentAgent.liveTask}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 3 Pagination Dots underneath */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {[0, 1, 2].map((idx) => {
          const isSelected = activeIndex === idx;
          return (
            <button
              key={idx}
              onClick={() => jumpToSlide(idx)}
              className={`h-2 rounded-full transition-all focus:outline-none ${
                isSelected ? 'w-8 bg-[#49E3FF] shadow-[0_0_10px_rgba(73,227,255,0.6)]' : 'w-2 bg-[#1b3a58] hover:bg-[#32618c]'
              }`}
              aria-label={`Jump to slide ${idx + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
}
