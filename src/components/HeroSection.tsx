import React, { useState, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  AnimatePresence,
} from 'motion/react';
import {
  ArrowRight,
  ArrowLeft,
  Play,
  Pause,
  Sparkles,
  Zap,
  CheckCircle2,
  ChevronRight,
  RefreshCw,
  Activity,
  Bot,
  Terminal,
  Layers,
  PhoneCall,
  Headphones,
  BrainCircuit,
  SlidersHorizontal,
} from 'lucide-react';
import { BrandMark } from './Navigation';

interface ConsoleSlide {
  id: string;
  number: string;
  name: string;
  role: string;
  icon: React.ElementType;
  prompt: string;
  badgeTop: string;
  badgeBottom: string;
  responseTitle: string;
  responseDesc: string;
  actions: string;
  approval: string;
  channel: string;
  statLabel: string;
  latency: string;
  color: string;
}

const CONSOLE_SLIDES: ConsoleSlide[] = [
  {
    id: 'sav-sales',
    number: '01',
    name: 'SAV-Sales',
    role: 'Autonomous Sales & Telecalling',
    icon: PhoneCall,
    prompt: "Start following up with today's 42 pending leads on WhatsApp",
    badgeTop: '42 leads queued',
    badgeBottom: 'Agent executing: SAV-Sales',
    responseTitle: 'SAV-Sales contacting target queue via WhatsApp & Voice.',
    responseDesc: 'Direct multi-touch outreach with dynamic intent scoring, calendar slot reservation, and real-time CRM synchronization.',
    actions: '86 estimated actions',
    approval: 'Autonomous (Approved Policy)',
    channel: 'WhatsApp & Voice',
    statLabel: 'QUEUED LEADS',
    latency: '24ms',
    color: '#49E3FF',
  },
  {
    id: 'sav-support',
    number: '02',
    name: 'SAV-Support',
    role: '24×7 Omnichannel Care Executive',
    icon: Headphones,
    prompt: 'Auto-resolve routine billing queries & search enterprise vector docs',
    badgeTop: '24×7 live · 0 backlog',
    badgeBottom: 'Agent executing: SAV-Support',
    responseTitle: 'SAV-Support triaging 18 active WhatsApp tickets with vector search.',
    responseDesc: 'Instant context recovery across past interactions, verified answers grounded in live docs, human escalation bridge ready.',
    actions: '24 tickets resolved',
    approval: 'Autonomous (<$500 gate)',
    channel: 'WhatsApp & Email',
    statLabel: 'LIVE TICKETS',
    latency: '14ms',
    color: '#5B8CFF',
  },
  {
    id: 'sav-operations',
    number: '03',
    name: 'SAV-Operations',
    role: 'Workflow Execution & Governance',
    icon: BrainCircuit,
    prompt: 'Reconcile vendor invoices & trigger approval gate for >$10K',
    badgeTop: '86 actions ready',
    badgeBottom: 'Agent executing: SAV-Operations',
    responseTitle: 'SAV-Operations running automated ledger check across CRM & Supabase.',
    responseDesc: 'Invoice OCR matching against purchase orders, cryptographic audit logging, and automated escalation to CFO for authorization.',
    actions: '14 invoices reconciled',
    approval: 'Human Gate for >$10K',
    channel: 'Savrdh CRM & Supabase',
    statLabel: 'DISPATCH READY',
    latency: '18ms',
    color: '#7A5CFF',
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 320 : -320,
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
    x: direction < 0 ? 320 : -320,
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

export default function HeroSection() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [customInput, setCustomInput] = useState(CONSOLE_SLIDES[0].prompt);

  // Wrap page to 0, 1, 2
  const activeIndex = ((page % 3) + 3) % 3;
  const currentSlide = CONSOLE_SLIDES[activeIndex];
  const Icon = currentSlide.icon;

  // Mouse tilt tracking with Motion Values and Springs
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-6, 6]);
  const glowX = useTransform(smoothMouseX, [-0.5, 0.5], ['20%', '80%']);
  const glowY = useTransform(smoothMouseY, [-0.5, 0.5], ['20%', '80%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
    const nextIdx = (((page + newDirection) % 3) + 3) % 3;
    setCustomInput(CONSOLE_SLIDES[nextIdx].prompt);
  };

  const jumpToSlide = (targetIndex: number) => {
    const diff = targetIndex - activeIndex;
    if (diff !== 0) {
      setPage([page + diff, diff]);
      setCustomInput(CONSOLE_SLIDES[targetIndex].prompt);
    }
  };

  // Autoplay functionality
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      paginate(1);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPlaying, page]);

  const triggerExecution = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
    }, 1400);
  };

  return (
    <section
      id="top"
      className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden py-16 px-4 sm:px-6 lg:px-8"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Fluid Ambient Background Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <motion.div
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -30, 20, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 -left-20 w-[450px] h-[450px] rounded-full bg-[#5B8CFF]/15 blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -50, 30, 0],
            y: [0, 40, -20, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 -right-24 w-[500px] h-[500px] rounded-full bg-[#49E3FF]/12 blur-[130px]"
        />
        <motion.div
          animate={{
            x: [0, 30, -40, 0],
            y: [0, -20, 30, 0],
            scale: [0.95, 1.1, 1, 0.95],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-20 left-1/3 w-[400px] h-[400px] rounded-full bg-[#7A5CFF]/12 blur-[120px]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#13283f12_1px,transparent_1px),linear-gradient(to_bottom,#13283f12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Hero Editorial Copy */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 flex flex-col space-y-6 text-left"
        >
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#49E3FF] px-3 py-1.5 rounded-full border border-[#49E3FF]/25 bg-[#49E3FF]/5 w-fit backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#49E3FF] animate-pulse" />
            <span>SAVRDH TECHNOLOGY CLOUD</span>
            <span className="text-[#3b6082]">·</span>
            <span className="text-[#8AA7C0]">Autonomous AI Agents</span>
          </div>

          {/* Hero Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] text-balance">
            AI That Works Like a Team.{' '}
            <span className="bg-gradient-to-r from-[#49E3FF] via-[#5B8CFF] to-[#A08CFF] bg-clip-text text-transparent animate-shimmer">
              Always On. Always Coordinated.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#95B3CF] leading-relaxed max-w-xl">
            Deploy intelligent AI agents that follow up, communicate, coordinate, and execute work across your business — 24×7, across every channel, with human control where it matters.
          </p>

          {/* Synchronized 3-Slide Selector Chips */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-[#6E8FA9]">
              <span>Slide through 3 agent execution consoles:</span>
              <span className="text-[#49E3FF] font-semibold tabular-nums">0{activeIndex + 1} / 03</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {CONSOLE_SLIDES.map((slide, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <motion.button
                    key={slide.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => jumpToSlide(idx)}
                    className={`relative flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg border transition-all focus:outline-none ${
                      isActive
                        ? 'border-[#49E3FF] bg-[#49E3FF]/15 text-[#49E3FF] shadow-[0_0_15px_rgba(73,227,255,0.25)]'
                        : 'border-[#1b3652] bg-[#0c1c2e]/60 text-[#8AA7C0] hover:border-[#335d84] hover:text-white'
                    }`}
                  >
                    <span className="font-mono text-[10px] font-bold">{slide.number}</span>
                    <span>{slide.name}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#49E3FF] animate-pulse" />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Primary CTA Row */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <motion.a
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              href="#contact"
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#49E3FF] to-[#5B8CFF] text-[#050C15] font-semibold text-sm shadow-[0_0_25px_rgba(73,227,255,0.35)] hover:shadow-[0_0_35px_rgba(73,227,255,0.55)] transition-all focus:outline-none"
            >
              <span>See SAV in Action</span>
              <ArrowRight className="w-4 h-4" />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              href="#workflow"
              className="flex items-center gap-2 px-5 py-3 rounded-lg border border-[#23486b] bg-[#0c1c2e]/80 hover:bg-[#122842] text-[#D8E6F5] font-medium text-sm transition-all focus:outline-none"
            >
              <Play className="w-3.5 h-3.5 text-[#49E3FF] fill-[#49E3FF]" />
              <span>Explore Platform</span>
            </motion.a>
          </div>

          {/* Trust points */}
          <div className="flex flex-wrap items-center gap-6 pt-3 text-xs font-mono text-[#8AA7C0]">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#49E3FF]" />
              <span>Human-in-the-loop</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#49E3FF]" />
              <span>Live execution</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#49E3FF]" />
              <span>Omnichannel fabric</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: 3-Slide Interactive Hero Carousel Console */}
        <motion.div
          initial={{ opacity: 0, x: 30, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 relative perspective-[1200px]"
        >
          {/* Slider Header Bar Controls on top of Console */}
          <div className="flex items-center justify-between gap-2 mb-3 px-1 text-xs font-mono">
            {/* 3 Slide Tabs with Layout Indicator */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-[#071727] border border-[#1b3a58]">
              {CONSOLE_SLIDES.map((slide, idx) => {
                const isSelected = activeIndex === idx;
                return (
                  <button
                    key={slide.id}
                    onClick={() => jumpToSlide(idx)}
                    className={`relative flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-mono transition-all focus:outline-none ${
                      isSelected ? 'text-[#050C15] font-bold' : 'text-[#8AA7C0] hover:text-white'
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="heroSlidePill"
                        className="absolute inset-0 bg-gradient-to-r from-[#49E3FF] to-[#5B8CFF] rounded-lg shadow-[0_0_12px_rgba(73,227,255,0.4)]"
                        transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{slide.number}</span>
                    <span className="relative z-10 hidden sm:inline">{slide.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Slider Navigation Arrows & Autoplay */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`p-1.5 rounded-lg border text-xs font-mono transition-colors focus:outline-none ${
                  isPlaying
                    ? 'border-[#49E3FF] bg-[#49E3FF]/15 text-[#49E3FF]'
                    : 'border-[#1b3a58] bg-[#091a2b] text-[#8AA7C0] hover:text-white'
                }`}
                title={isPlaying ? 'Pause slider' : 'Autoplay slider'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>

              <div className="flex items-center gap-1">
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => paginate(-1)}
                  className="p-1.5 rounded-lg border border-[#1b3a58] bg-[#091a2b] text-[#8AA7C0] hover:text-white hover:border-[#32618c] transition-colors focus:outline-none"
                  aria-label="Previous Slide"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => paginate(1)}
                  className="p-1.5 rounded-lg border border-[#1b3a58] bg-[#091a2b] text-[#8AA7C0] hover:text-white hover:border-[#32618c] transition-colors focus:outline-none"
                  aria-label="Next Slide"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Floating Badges with Dynamic Content */}
          <motion.div
            key={currentSlide.badgeTop}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -top-3 -left-3 sm:-left-5 z-20 flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#49E3FF]/30 bg-[#081827]/90 backdrop-blur-md text-xs font-mono text-[#D8E6F5] shadow-[0_8px_20px_rgba(0,0,0,0.5)]"
          >
            <span className="w-2 h-2 rounded-full bg-[#49E3FF] animate-ping" />
            <span className="font-semibold text-[#49E3FF]">{currentSlide.badgeTop}</span>
          </motion.div>

          <motion.div
            key={currentSlide.badgeBottom}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -bottom-3 -right-3 sm:-right-5 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-[#5B8CFF]/30 bg-[#081827]/90 backdrop-blur-md text-xs font-mono text-[#D8E6F5] shadow-[0_8px_20px_rgba(0,0,0,0.5)]"
          >
            <Zap className="w-3.5 h-3.5 text-[#5B8CFF] fill-[#5B8CFF]" />
            <span className="font-semibold text-white">{currentSlide.badgeBottom}</span>
          </motion.div>

          {/* 3D Tilt Card Shell */}
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
            }}
            className="relative rounded-2xl border border-[#214365] bg-[#081728]/95 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_40px_rgba(73,227,255,0.08)] backdrop-blur-xl overflow-hidden"
          >
            {/* Dynamic mouse follower light sheen inside card */}
            <motion.div
              style={{
                left: glowX,
                top: glowY,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-radial from-[#49E3FF]/15 to-transparent rounded-full pointer-events-none blur-2xl"
            />

            {/* Top Bar of Console */}
            <div className="relative border-b border-[#1A3854] px-4 py-3 flex items-center justify-between bg-[#0a1b2d]">
              <div className="flex items-center gap-2.5">
                <BrandMark />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white tracking-wide flex items-center gap-1.5">
                    SAV AI WORKFORCE
                    <span className="px-1.5 py-0.2 text-[9px] font-mono bg-[#49E3FF]/15 text-[#49E3FF] rounded border border-[#49E3FF]/30">
                      v2.4
                    </span>
                  </span>
                  <span className="text-[10px] font-mono text-[#6E8FA9]">Autonomous Command Center</span>
                </div>
              </div>

              {/* Status indicator */}
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#112940] border border-[#204a70] text-[11px] font-mono text-[#49E3FF]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#49E3FF] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#49E3FF]" />
                </span>
                <span>All Systems Ready</span>
              </div>
            </div>

            {/* Animated Slider Canvas */}
            <div className="overflow-hidden min-h-[380px]">
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
                    if (offset.x < -50 || velocity.x < -300) {
                      paginate(1);
                    } else if (offset.x > 50 || velocity.x > 300) {
                      paginate(-1);
                    }
                  }}
                  className="grid grid-cols-12 cursor-grab active:cursor-grabbing select-none"
                >
                  {/* Left Mini Nav inside Slide */}
                  <div className="col-span-3 border-r border-[#17324c] bg-[#061422]/60 p-3 space-y-1 hidden sm:block">
                    <div className="text-[9px] font-mono text-[#49E3FF] px-2 py-1 font-semibold uppercase tracking-wider">
                      AGENT PROFILE
                    </div>
                    <div className="p-2 rounded-lg bg-[#0e243a] border border-[#1b3d60] space-y-1 mb-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                        <Icon className="w-3.5 h-3.5 text-[#49E3FF]" />
                        <span>{currentSlide.name}</span>
                      </div>
                      <div className="text-[10px] text-[#6E8FA9]">{currentSlide.role}</div>
                    </div>

                    {[
                      'Intent Parser',
                      'Multi-Channel',
                      'Memory Graph',
                      'Security Gate',
                      'Audit Log',
                    ].map((item, idx) => (
                      <div
                        key={item}
                        className={`w-full text-left flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-mono ${
                          idx === 0 ? 'text-[#49E3FF] bg-[#112d47]' : 'text-[#6E8FA9]'
                        }`}
                      >
                        <span className={`w-1 h-1 rounded-full ${idx === 0 ? 'bg-[#49E3FF]' : 'bg-[#254564]'}`} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Main Interactive Slide Body */}
                  <div className="col-span-12 sm:col-span-9 p-4 sm:p-5 flex flex-col justify-between space-y-4">
                    {/* Command Input Box */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-mono text-[#8AA7C0]">
                        <div className="flex items-center gap-1.5">
                          <Terminal className="w-3.5 h-3.5 text-[#49E3FF]" />
                          <span>NATURAL LANGUAGE INTENT INGESTION</span>
                        </div>
                        <span className="text-[#49E3FF]">Slide {currentSlide.number} / 03</span>
                      </div>

                      <div className="relative rounded-xl border border-[#23486c] bg-[#0a1d30] p-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-inner">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <ChevronRight className="w-4 h-4 text-[#49E3FF] shrink-0 animate-pulse" />
                          <input
                            type="text"
                            value={customInput}
                            onChange={(e) => setCustomInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && triggerExecution()}
                            className="w-full bg-transparent text-xs text-white font-mono placeholder-[#5b7c9a] focus:outline-none"
                            placeholder="Tell SAV AI what to execute..."
                          />
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={triggerExecution}
                          disabled={isExecuting}
                          className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-[#49E3FF] to-[#5B8CFF] text-[#050C15] font-mono text-xs font-bold shadow-[0_0_15px_rgba(73,227,255,0.3)] transition-all shrink-0 focus:outline-none"
                        >
                          {isExecuting ? (
                            <>
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                              <span>ROUTING...</span>
                            </>
                          ) : (
                            <>
                              <span>EXECUTE</span>
                              <Zap className="w-3.5 h-3.5 fill-current" />
                            </>
                          )}
                        </motion.button>
                      </div>
                    </div>

                    {/* AI Cognition Response Card */}
                    <div className="relative rounded-xl border border-[#1b3a58] bg-[#0c2238]/80 p-3.5 space-y-3">
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <div className="flex items-center gap-1.5 text-[#49E3FF]">
                          <Bot className="w-4 h-4" />
                          <span>SAV ORCHESTRATOR COGNITION</span>
                        </div>
                        <span className="text-[#6E8FA9] tabular-nums">LATENCY: {currentSlide.latency}</span>
                      </div>

                      <div className="space-y-2.5">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-[#143555] border border-[#285782] text-[#49E3FF] shrink-0 mt-0.5">
                            <Sparkles className="w-4 h-4" />
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs font-semibold text-white leading-relaxed">
                              {currentSlide.responseTitle}
                            </p>
                            <p className="text-[11px] text-[#8AA7C0] leading-relaxed">
                              {currentSlide.responseDesc}
                            </p>
                          </div>
                        </div>

                        {/* Metric Row */}
                        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1a3854] text-[11px] font-mono">
                          <div className="flex items-center justify-between p-2 rounded bg-[#091929] border border-[#183652]">
                            <span className="text-[#6E8FA9]">Action volume:</span>
                            <span className="text-[#49E3FF] font-semibold">{currentSlide.actions}</span>
                          </div>
                          <div className="flex items-center justify-between p-2 rounded bg-[#091929] border border-[#183652]">
                            <span className="text-[#6E8FA9]">Approval gate:</span>
                            <span className="text-[#98E2A5] font-semibold">{currentSlide.approval}</span>
                          </div>
                        </div>
                      </div>

                      {/* Equalizer Visualizer */}
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#6E8FA9]">
                          <Activity className="w-3.5 h-3.5 text-[#49E3FF]" />
                          <span>NEURAL ACTIVITY STREAM</span>
                        </div>

                        <div className="flex items-center gap-1 h-4">
                          {[35, 70, 50, 95, 60, 85, 45, 90, 65, 55, 80, 40].map((h, i) => (
                            <motion.span
                              key={i}
                              animate={{
                                height: isExecuting
                                  ? [`${h * 0.3}%`, `${h}%`, `${h * 0.4}%`]
                                  : [`${h * 0.4}%`, `${h * 0.7}%`, `${h * 0.4}%`],
                              }}
                              transition={{
                                duration: isExecuting ? 0.6 : 1.6,
                                repeat: Infinity,
                                delay: i * 0.06,
                                ease: 'easeInOut',
                              }}
                              className="w-1 bg-[#49E3FF] rounded-full opacity-80"
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Live Activity Strip */}
                    <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#071523] border border-[#15324e] text-[11px] font-mono">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#49E3FF] animate-pulse" />
                        <span className="text-white font-semibold">{currentSlide.name}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#8AA7C0]">
                        <RefreshCw className="w-3 h-3 text-[#49E3FF] animate-spin" />
                        <span>State: Autonomous</span>
                      </div>
                      <div className="text-[#49E3FF] hidden sm:block">Channel: {currentSlide.channel}</div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* 3 Slider Pagination Dots beneath Console */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {[0, 1, 2].map((idx) => {
              const isSelected = activeIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => jumpToSlide(idx)}
                  className={`h-2 rounded-full transition-all focus:outline-none ${
                    isSelected
                      ? 'w-7 bg-[#49E3FF] shadow-[0_0_10px_rgba(73,227,255,0.7)]'
                      : 'w-2 bg-[#1b3a58] hover:bg-[#32618c]'
                  }`}
                  aria-label={`Jump to console slide ${idx + 1}`}
                />
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
