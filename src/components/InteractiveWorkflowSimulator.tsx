import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WORKFLOW_SCENARIOS } from '../data/workforceData';
import {
  BrainCircuit,
  MessageCircleMore,
  PhoneCall,
  Workflow,
  Layers3,
  Play,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Zap,
} from 'lucide-react';

export default function InteractiveWorkflowSimulator() {
  const [activeScenarioIndex, setActiveScenarioIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(1);

  const scenario = WORKFLOW_SCENARIOS[activeScenarioIndex];

  const handleRunSimulation = () => {
    setIsRunning(true);
    setActiveStepIndex(0);

    const stepInterval = setInterval(() => {
      setActiveStepIndex((prev) => {
        if (prev >= 3) {
          clearInterval(stepInterval);
          setIsRunning(false);
          return 3;
        }
        return prev + 1;
      });
    }, 900);
  };

  return (
    <section id="workflow" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#49E3FF]">
            <Workflow className="w-3.5 h-3.5" />
            <span>From Intent to Execution</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Describe the outcome. SAV coordinates the execution.
          </h2>
          <p className="text-sm text-[#8AA7C0] leading-relaxed">
            Give SAV a natural language instruction or automate business processes with event triggers, decision rules, human approval gates, and multi-channel actions.
          </p>
        </div>

        {/* Preset Selector Tabs */}
        <div className="flex flex-wrap gap-2">
          {WORKFLOW_SCENARIOS.map((sc, idx) => (
            <button
              key={sc.id}
              onClick={() => {
                setActiveScenarioIndex(idx);
                setActiveStepIndex(1);
              }}
              className={`px-3.5 py-1.5 rounded-lg border text-xs font-mono transition-all focus:outline-none ${
                idx === activeScenarioIndex
                  ? 'border-[#49E3FF] bg-[#49E3FF]/15 text-[#49E3FF] shadow-[0_0_12px_rgba(73,227,255,0.25)]'
                  : 'border-[#1b3a58] bg-[#091a2b] text-[#8AA7C0] hover:text-white hover:border-[#2d5880]'
              }`}
            >
              {sc.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Workflow Simulation Panel */}
      <div className="relative rounded-2xl border border-[#214365] bg-[#081829] p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
        {/* Background circuit glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-radial from-[#49E3FF]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Workflow Details & Trigger Controller */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#6E8FA9]">
                SELECTED ORCHESTRATION PIPELINE
              </span>
              <h3 className="text-2xl font-bold text-white">{scenario.title}</h3>
              <p className="text-xs text-[#8AA7C0] leading-relaxed">
                {scenario.description}
              </p>
            </div>

            {/* Inbound Trigger Box */}
            <div className="p-3.5 rounded-xl border border-[#1e4266] bg-[#0c2238] space-y-1.5">
              <div className="text-[10px] font-mono text-[#49E3FF] uppercase tracking-wide">
                EVENT TRIGGER IDENTIFIED
              </div>
              <div className="text-xs font-mono text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#49E3FF] animate-pulse" />
                <span>{scenario.trigger}</span>
              </div>
            </div>

            {/* Run Button */}
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleRunSimulation}
                disabled={isRunning}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#49E3FF] to-[#5B8CFF] text-[#050C15] font-semibold text-xs font-mono shadow-[0_0_20px_rgba(73,227,255,0.3)] hover:shadow-[0_0_25px_rgba(73,227,255,0.5)] transition-all focus:outline-none"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isRunning ? 'EXECUTING STEP...' : 'TEST PIPELINE EXECUTION'}</span>
              </motion.button>

              <span className="text-xs font-mono text-[#6E8FA9]">
                Step {activeStepIndex + 1} of 4
              </span>
            </div>

            {/* Execution Outcome Badge */}
            <div className="p-3 rounded-lg border border-[#193a5a] bg-[#071524] text-xs font-mono text-[#95B3CF] flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#49E3FF] shrink-0 mt-0.5" />
              <div>
                <span className="text-white font-semibold">Outcome Guarantee: </span>
                {scenario.outcome}
              </div>
            </div>
          </div>

          {/* Right: Fluid Motion Node Graph */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 rounded-xl border border-[#1b3a58] bg-[#061423]/90 relative">
            {/* Step 1: User / Trigger Node */}
            <motion.div
              animate={{
                scale: activeStepIndex === 0 ? 1.06 : 1,
                borderColor: activeStepIndex >= 0 ? '#49E3FF' : '#1d3e5e',
                boxShadow:
                  activeStepIndex === 0
                    ? '0 0 25px rgba(73,227,255,0.4)'
                    : '0 0 0 rgba(73,227,255,0)',
              }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3 px-5 py-3 rounded-xl border bg-[#0a1e32] text-white z-10"
            >
              <div className="p-1.5 rounded-lg bg-[#143452] text-[#49E3FF]">
                <MessageCircleMore className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-[10px] font-mono text-[#6E8FA9]">NODE 01: TRIGGER</div>
                <div className="text-xs font-bold">{scenario.nodes[0].name}</div>
              </div>
            </motion.div>

            {/* Connecting Animated Line 1 */}
            <div className="relative w-0.5 h-12 bg-[#1b3a58] overflow-hidden my-1">
              <motion.div
                animate={{
                  y: activeStepIndex >= 1 ? ['0%', '100%'] : '0%',
                  opacity: activeStepIndex >= 1 ? [0, 1, 0] : 0.2,
                }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 bg-[#49E3FF] shadow-[0_0_8px_#49E3FF]"
              />
            </div>

            {/* Step 2: SAV AI Brain Core */}
            <motion.div
              animate={{
                scale: activeStepIndex === 1 ? 1.08 : 1,
                borderColor: activeStepIndex >= 1 ? '#5B8CFF' : '#1d3e5e',
                boxShadow:
                  activeStepIndex === 1
                    ? '0 0 30px rgba(91,140,255,0.5)'
                    : '0 0 10px rgba(91,140,255,0.1)',
              }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3 px-6 py-3.5 rounded-xl border bg-[#0e2742] text-white z-10"
            >
              <div className="p-2 rounded-lg bg-[#1b436e] text-[#49E3FF]">
                <BrainCircuit className="w-5 h-5 animate-pulse" />
              </div>
              <div className="text-left">
                <div className="text-[10px] font-mono text-[#49E3FF] flex items-center gap-1">
                  <span>SAV ORCHESTRATOR</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#49E3FF] animate-ping" />
                </div>
                <div className="text-xs font-bold">{scenario.nodes[1].name}</div>
              </div>
            </motion.div>

            {/* Branching SVG Lines */}
            <div className="relative w-full max-w-sm h-14 my-1">
              <svg className="w-full h-full" viewBox="0 0 360 56" fill="none">
                <path
                  d="M180 0 V25 C180 35 60 35 60 56"
                  stroke={activeStepIndex >= 2 ? '#49E3FF' : '#1b3a58'}
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                <path
                  d="M180 0 V56"
                  stroke={activeStepIndex >= 2 ? '#5B8CFF' : '#1b3a58'}
                  strokeWidth="2"
                />
                <path
                  d="M180 0 V25 C180 35 300 35 300 56"
                  stroke={activeStepIndex >= 2 ? '#7A5CFF' : '#1b3a58'}
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
              </svg>
            </div>

            {/* Step 3: Multi-Branch Results */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-md z-10">
              <motion.div
                animate={{
                  scale: activeStepIndex >= 2 ? 1.03 : 1,
                  borderColor: activeStepIndex >= 2 ? '#49E3FF' : '#1b3a58',
                }}
                className="p-3 rounded-xl border bg-[#0a1e32] text-center space-y-1"
              >
                <div className="p-1 rounded bg-[#102a42] text-[#49E3FF] w-fit mx-auto">
                  <PhoneCall className="w-3.5 h-3.5" />
                </div>
                <div className="text-[9px] font-mono text-[#6E8FA9]">COMMUNICATION</div>
                <div className="text-[11px] font-bold text-white truncate">
                  {scenario.nodes[2].name}
                </div>
              </motion.div>

              <motion.div
                animate={{
                  scale: activeStepIndex >= 2 ? 1.03 : 1,
                  borderColor: activeStepIndex >= 2 ? '#5B8CFF' : '#1b3a58',
                }}
                className="p-3 rounded-xl border bg-[#0a1e32] text-center space-y-1"
              >
                <div className="p-1 rounded bg-[#102a42] text-[#5B8CFF] w-fit mx-auto">
                  <Workflow className="w-3.5 h-3.5" />
                </div>
                <div className="text-[9px] font-mono text-[#6E8FA9]">ACTION GATE</div>
                <div className="text-[11px] font-bold text-white truncate">Autonomous Policy</div>
              </motion.div>

              <motion.div
                animate={{
                  scale: activeStepIndex >= 3 ? 1.03 : 1,
                  borderColor: activeStepIndex >= 3 ? '#98E2A5' : '#1b3a58',
                }}
                className="p-3 rounded-xl border bg-[#0a1e32] text-center space-y-1"
              >
                <div className="p-1 rounded bg-[#102a42] text-[#98E2A5] w-fit mx-auto">
                  <Layers3 className="w-3.5 h-3.5" />
                </div>
                <div className="text-[9px] font-mono text-[#6E8FA9]">INTEGRATION</div>
                <div className="text-[11px] font-bold text-white truncate">
                  {scenario.nodes[3].name}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
