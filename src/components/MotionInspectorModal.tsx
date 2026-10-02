import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'motion/react';
import {
  X,
  Sparkles,
  Sliders,
  Copy,
  Check,
  Code2,
  Zap,
  Activity,
  Compass,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface MotionInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MotionInspectorModal({ isOpen, onClose }: MotionInspectorModalProps) {
  const [activeTab, setActiveTab] = useState<'playground' | 'recipes' | 'analysis'>('playground');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Interactive Spring Playground Controls
  const [stiffness, setStiffness] = useState(300);
  const [damping, setDamping] = useState(20);
  const [mass, setMass] = useState(0.5);
  const [triggerPulse, setTriggerPulse] = useState(0);

  // Test motion values for interactive card
  const testBoxX = useMotionValue(0);
  const smoothTestX = useSpring(testBoxX, { stiffness, damping, mass });

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="relative w-full max-w-5xl max-h-[90vh] rounded-2xl border border-[#234b73] bg-[#071626] shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Modal Header */}
        <div className="border-b border-[#173552] p-5 flex items-center justify-between bg-[#0a1f33]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#102b46] border border-[#234b73] text-[#49E3FF]">
              <Sliders className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Framer Motion Architecture & Inspector
                <span className="px-2 py-0.5 text-[10px] font-mono bg-[#49E3FF]/15 text-[#49E3FF] rounded border border-[#49E3FF]/30">
                  Motion v12 / React 19
                </span>
              </h2>
              <p className="text-xs font-mono text-[#8AA7C0]">
                Fluid physics analysis & implementation patterns for SAVRDH Intelligence Workforce
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg border border-[#1b3a58] text-[#8AA7C0] hover:text-white hover:bg-[#122842] transition-colors focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-[#142d45] bg-[#081829] text-xs font-mono">
          {[
            { id: 'playground', label: '1. Live Spring Physics Lab' },
            { id: 'analysis', label: '2. Original vs Framer Motion Analysis' },
            { id: 'recipes', label: '3. Production Code Recipes' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 px-3 transition-colors border-b-2 font-medium focus:outline-none ${
                activeTab === tab.id
                  ? 'border-[#49E3FF] text-[#49E3FF]'
                  : 'border-transparent text-[#6E8FA9] hover:text-[#95B3CF]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: LIVE SPRING PHYSICS PLAYGROUND */}
          {activeTab === 'playground' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-[#0b2136] border border-[#1d4266] text-xs text-[#95B3CF] leading-relaxed">
                <span className="text-[#49E3FF] font-semibold">Kyun Spring Physics? </span>
                CSS keyframes aur standard `ease-in-out` transitions rigid hote hain kyunki unme physical momentum ya velocity nahi hoti. Framer Motion real physics math (`stiffness`, `damping`, `mass`) use karta hai, jisse UI natural, fluid aur snappy lagta hai. Niche sliders ko change karke interactive element test karein!
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Sliders Controller */}
                <div className="md:col-span-6 space-y-4 p-5 rounded-xl border border-[#1b3a58] bg-[#061422]">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-white font-bold">Stiffness (K):</span>
                    <span className="text-[#49E3FF] tabular-nums font-semibold">{stiffness}</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="600"
                    step="10"
                    value={stiffness}
                    onChange={(e) => setStiffness(Number(e.target.value))}
                    className="w-full accent-[#49E3FF] cursor-pointer"
                  />
                  <p className="text-[11px] text-[#6E8FA9]">
                    Higher stiffness = Snappier, faster return to target.
                  </p>

                  <div className="flex items-center justify-between text-xs font-mono pt-2">
                    <span className="text-white font-bold">Damping (C):</span>
                    <span className="text-[#49E3FF] tabular-nums font-semibold">{damping}</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="60"
                    step="1"
                    value={damping}
                    onChange={(e) => setDamping(Number(e.target.value))}
                    className="w-full accent-[#49E3FF] cursor-pointer"
                  />
                  <p className="text-[11px] text-[#6E8FA9]">
                    Lower damping = More spring oscillations / bounciness.
                  </p>

                  <div className="flex items-center justify-between text-xs font-mono pt-2">
                    <span className="text-white font-bold">Mass (M):</span>
                    <span className="text-[#49E3FF] tabular-nums font-semibold">{mass}</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="2.5"
                    step="0.1"
                    value={mass}
                    onChange={(e) => setMass(Number(e.target.value))}
                    className="w-full accent-[#49E3FF] cursor-pointer"
                  />
                  <p className="text-[11px] text-[#6E8FA9]">
                    Higher mass = More inertia / heavier feel.
                  </p>

                  <button
                    onClick={() => setTriggerPulse((p) => p + 1)}
                    className="w-full mt-4 py-2 rounded-lg bg-[#49E3FF] hover:bg-[#68e9ff] text-[#050C15] font-bold text-xs font-mono transition-colors shadow-[0_0_15px_rgba(73,227,255,0.3)] focus:outline-none"
                  >
                    Trigger Spring Impact Test
                  </button>
                </div>

                {/* Interactive Spring Canvas Preview */}
                <div className="md:col-span-6 flex flex-col items-center justify-center p-8 rounded-xl border border-[#1b3a58] bg-[#061422] min-h-[300px] relative overflow-hidden">
                  <div className="text-[11px] font-mono text-[#6E8FA9] mb-6">
                    Click, drag, or trigger the card to feel current physics:
                  </div>

                  <motion.div
                    key={triggerPulse}
                    drag
                    dragConstraints={{ left: -100, right: 100, top: -60, bottom: 60 }}
                    dragElastic={0.2}
                    initial={{ scale: 0.8, y: -20 }}
                    animate={{ scale: 1, y: 0 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                      type: 'spring',
                      stiffness,
                      damping,
                      mass,
                    }}
                    className="p-6 rounded-2xl border-2 border-[#49E3FF] bg-[#0f2d4a] text-center shadow-[0_0_35px_rgba(73,227,255,0.3)] cursor-grab active:cursor-grabbing select-none"
                  >
                    <Sparkles className="w-6 h-6 text-[#49E3FF] mx-auto mb-2 animate-pulse" />
                    <div className="text-sm font-bold text-white">SAV Spring Object</div>
                    <div className="text-[11px] font-mono text-[#8AA7C0] mt-1">
                      stiffness: {stiffness} | damping: {damping}
                    </div>
                  </motion.div>

                  <div className="mt-8 text-[11px] font-mono text-[#49E3FF] bg-[#0c2238] px-3 py-1.5 rounded-lg border border-[#1d456b]">
                    Generated transition: &#123; type: "spring", stiffness: {stiffness}, damping: {damping}, mass: {mass} &#125;
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ORIGINAL VS FRAMER MOTION ANALYSIS */}
          {activeTab === 'analysis' && (
            <div className="space-y-6 text-xs text-[#95B3CF]">
              <div className="p-4 rounded-xl bg-[#091e32] border border-[#1a3d60] space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#49E3FF]" />
                  SAVRDH_Intelligence_Workforce Original Animation Audit
                </h3>
                <p className="leading-relaxed">
                  Repository analyze karne par yeh pata chalta hai ki website me animations standard CSS keyframes aur ek simple Intersection Observer (`reveal-controller.tsx`) ke through implement ki gayi theen. Iske main limitations aur Framer Motion solution yeh hain:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Original CSS column */}
                <div className="p-4 rounded-xl border border-red-500/20 bg-red-950/10 space-y-3">
                  <div className="font-bold text-red-400 font-mono flex items-center gap-1.5">
                    <span>❌ Original Architecture (CSS Keyframes)</span>
                  </div>
                  <ul className="space-y-2 text-[#95A5B5] list-disc list-inside">
                    <li>
                      <strong className="text-white">Rigid Timers:</strong> `@keyframes agentBreathe 6s infinite` continuous loop CPU cycle leta hai aur interaction pe respond nahi karta.
                    </li>
                    <li>
                      <strong className="text-white">Hardcoded Delays:</strong> `items.forEach((item, index) =&gt; item.style.setProperty('--reveal-delay', ...))` crude CSS variable delays use karta hai.
                    </li>
                    <li>
                      <strong className="text-white">No Gesture Physics:</strong> Mouse hover pe static `translateY(-7px)` hota hai, jo abrupt lagta hai aur velocity preserve nahi karta.
                    </li>
                    <li>
                      <strong className="text-white">Static Console & Flow:</strong> Command preview aur workflow nodes static the; koi real dynamic state transition ya typing feedback nahi tha.
                    </li>
                  </ul>
                </div>

                {/* Framer Motion column */}
                <div className="p-4 rounded-xl border border-[#49E3FF]/30 bg-[#49E3FF]/5 space-y-3">
                  <div className="font-bold text-[#49E3FF] font-mono flex items-center gap-1.5">
                    <span>✅ Upgraded Framer Motion Architecture</span>
                  </div>
                  <ul className="space-y-2 text-[#95B3CF] list-disc list-inside">
                    <li>
                      <strong className="text-white">Physics-Based Springs:</strong> Transitions `type: "spring"` use karti hain with natural momentum and deceleration.
                    </li>
                    <li>
                      <strong className="text-white">3D Mouse Perspective:</strong> `useMotionValue` aur `useTransform` se console user ke cursor ke angle ke mutabiq tilt hota hai.
                    </li>
                    <li>
                      <strong className="text-white">Shared Layout Animation (`layoutId`):</strong> Tabs aur filters ke darmiyan indicator smoothly slide karta hai without DOM jumps.
                    </li>
                    <li>
                      <strong className="text-white">Interactive Flow Simulation:</strong> Workflow nodes live execute hote hain aur animated SVG paths ke sath real data streams dikhate hain.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Implementation Roadmap in Next.js */}
              <div className="p-4 rounded-xl border border-[#1b3a58] bg-[#061422] space-y-3">
                <h4 className="text-sm font-bold text-white">
                  Step-by-Step: Is code ko original Next.js repo me kaise integrate karein
                </h4>
                <ol className="space-y-2 list-decimal list-inside text-[#8AA7C0]">
                  <li>
                    <code className="text-[#49E3FF] bg-[#0c2238] px-2 py-0.5 rounded">npm install motion</code> (Framer Motion v12 package).
                  </li>
                  <li>
                    Next.js App Router me page ya component ke top par <code className="text-[#49E3FF] bg-[#0c2238] px-2 py-0.5 rounded">"use client";</code> ensure karein.
                  </li>
                  <li>
                    <code className="text-[#49E3FF] bg-[#0c2238] px-2 py-0.5 rounded">import &#123; motion, AnimatePresence, useScroll &#125; from "motion/react";</code> import karein.
                  </li>
                  <li>
                    Purane <code className="text-red-400">reveal-controller.tsx</code> ko replace karke declarative <code className="text-[#49E3FF]">whileInView=&#123;&#123; opacity: 1, y: 0 &#125;&#125;</code> aur <code className="text-[#49E3FF]">viewport=&#123;&#123; once: true &#125;&#125;</code> use karein.
                  </li>
                </ol>
              </div>
            </div>
          )}

          {/* TAB 3: PRODUCTION CODE RECIPES */}
          {activeTab === 'recipes' && (
            <div className="space-y-6">
              {[
                {
                  id: 'tilt-recipe',
                  title: '1. 3D Card Tilt with useMotionValue & useTransform',
                  description: 'Cursor position track karke card ko silky 3D perspective me tilt karta hai.',
                  code: `import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';

export function TiltCard() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs prevent jitter
  const springX = useSpring(mouseX, { damping: 25, stiffness: 200 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 200 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="perspective-[1000px]" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="rounded-2xl border border-cyan-500/30 bg-[#081829] p-6 shadow-2xl"
      >
        <h3>SAV 3D Command Console</h3>
      </motion.div>
    </div>
  );
}`,
                },
                {
                  id: 'layout-id-recipe',
                  title: '2. Shared Layout Magic with layoutId (Sliding Pill)',
                  description: 'Jab user kisi tab ya filter pe click karta hai, active pill automatically smooth slide hoti hai.',
                  code: `import { useState } from 'react';
import { motion } from 'motion/react';

export function SegmentedFilter() {
  const [activeTab, setActiveTab] = useState('all');
  const tabs = ['all', 'sales', 'operations', 'support'];

  return (
    <div className="flex p-1 bg-slate-900 rounded-xl border border-slate-800">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className="relative px-4 py-1.5 text-xs font-mono uppercase text-slate-300"
        >
          {activeTab === tab && (
            <motion.div
              layoutId="activePill"
              className="absolute inset-0 bg-cyan-400 rounded-lg"
              transition={{ type: 'spring', stiffness: 450, damping: 32 }}
            />
          )}
          <span className="relative z-10 font-bold mix-blend-difference">{tab}</span>
        </button>
      ))}
    </div>
  );
}`,
                },
                {
                  id: 'stagger-recipe',
                  title: '3. Staggered Scroll-Triggered Grid with whileInView',
                  description: 'Cards view me aane par automatically cascade delay ke sath smoothly rise karti hain.',
                  code: `import { motion } from 'motion/react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
};

export function FeatureGrid({ items }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className="grid grid-cols-3 gap-6"
    >
      {items.map((item) => (
        <motion.div key={item.id} variants={cardVariants} className="card">
          <h4>{item.title}</h4>
        </motion.div>
      ))}
    </motion.div>
  );
}`,
                },
                {
                  id: 'slider-recipe',
                  title: '4. Fluid 3-Slide Carousel with AnimatePresence & Drag Gestures',
                  description: '3 cards ke darmiyan directional velocity swipe aur spring physics ke sath slide transitions.',
                  code: `import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 320 : -320,
    opacity: 0,
    scale: 0.94,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: 'spring', stiffness: 320, damping: 30 },
      opacity: { duration: 0.25 },
      scale: { type: 'spring', stiffness: 320, damping: 30 },
    },
  },
  exit: (direction) => ({
    x: direction < 0 ? 320 : -320,
    opacity: 0,
    scale: 0.94,
    transition: {
      x: { type: 'spring', stiffness: 320, damping: 30 },
      opacity: { duration: 0.2 },
    },
  }),
};

export function ThreeCardSlider({ cards }) {
  const [[page, direction], setPage] = useState([0, 0]);
  const activeIndex = ((page % 3) + 3) % 3;

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className="relative overflow-hidden w-full">
      {/* 3 Pagination Numbers */}
      <div className="flex gap-2 mb-4">
        {[0, 1, 2].map((i) => (
          <button
            key={i}
            onClick={() => setPage([i, i - activeIndex])}
            className={activeIndex === i ? 'font-bold text-cyan-400' : 'text-slate-500'}
          >
            0{i + 1}
          </button>
        ))}
      </div>

      {/* Animated Slide Canvas */}
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
            if (offset.x < -60 || velocity.x < -300) paginate(1);
            else if (offset.x > 60 || velocity.x > 300) paginate(-1);
          }}
          className="p-8 rounded-2xl border border-cyan-500/30 bg-[#081829] cursor-grab active:cursor-grabbing"
        >
          <h3>{cards[activeIndex].title}</h3>
          <p>{cards[activeIndex].description}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}`,
                },
              ].map((recipe) => (
                <div
                  key={recipe.id}
                  className="rounded-xl border border-[#1b3a58] bg-[#061422] overflow-hidden"
                >
                  <div className="p-4 border-b border-[#142d45] flex items-center justify-between bg-[#0a1e32]">
                    <div>
                      <h4 className="text-xs font-bold text-white">{recipe.title}</h4>
                      <p className="text-[11px] text-[#6E8FA9]">{recipe.description}</p>
                    </div>

                    <button
                      onClick={() => handleCopy(recipe.id, recipe.code)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#234b73] bg-[#0c243b] text-[#49E3FF] text-[11px] font-mono hover:bg-[#11314f] transition-colors focus:outline-none"
                    >
                      {copiedId === recipe.id ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>COPIED!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>COPY CODE</span>
                        </>
                      )}
                    </button>
                  </div>

                  <pre className="p-4 text-[11px] font-mono text-[#D8E6F5] bg-[#040d17] overflow-x-auto leading-relaxed">
                    <code>{recipe.code}</code>
                  </pre>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="border-t border-[#173552] p-4 bg-[#0a1f33] flex items-center justify-between text-xs font-mono">
          <span className="text-[#6E8FA9]">SAVRDH Motion Design System · Framer Motion Guide</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#49E3FF] hover:bg-[#68e9ff] text-[#050C15] font-bold transition-colors focus:outline-none"
          >
            Close Inspector
          </button>
        </div>
      </motion.div>
    </div>
  );
}
