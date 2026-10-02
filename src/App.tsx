/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import OmnichannelMarquee from './components/OmnichannelMarquee';
import PlatformFeatures from './components/PlatformFeatures';
import AgentsShowcase from './components/AgentsShowcase';
import InteractiveWorkflowSimulator from './components/InteractiveWorkflowSimulator';
import OmnichannelEcosystem from './components/OmnichannelEcosystem';
import SecurityGovernance from './components/SecurityGovernance';
import CtaSection from './components/CtaSection';
import Footer from './components/Footer';
import MotionInspectorModal from './components/MotionInspectorModal';
import { motion } from 'motion/react';
import { Sliders } from 'lucide-react';

export default function App() {
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050C15] text-[#D8E6F5] selection:bg-[#49E3FF]/20 selection:text-[#49E3FF] relative">
      {/* Top Navigation */}
      <Navigation onOpenInspector={() => setIsInspectorOpen(true)} />

      {/* Main Content Sections */}
      <main className="relative">
        <HeroSection />
        <OmnichannelMarquee />
        <PlatformFeatures />
        <AgentsShowcase />
        <InteractiveWorkflowSimulator />
        <OmnichannelEcosystem />
        <SecurityGovernance />
        <CtaSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Motion Guide & Inspector Quick Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setIsInspectorOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#49E3FF]/40 bg-[#071b2d]/90 text-[#49E3FF] text-xs font-mono font-bold shadow-[0_8px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(73,227,255,0.25)] backdrop-blur-md focus:outline-none"
        title="Open Motion Inspector & Code Recipes"
      >
        <Sliders className="w-4 h-4 animate-spin-slow" />
        <span>Framer Motion Guide</span>
        <span className="w-2 h-2 rounded-full bg-[#49E3FF] animate-ping" />
      </motion.button>

      {/* Motion Inspector & Architecture Drawer/Modal */}
      <MotionInspectorModal
        isOpen={isInspectorOpen}
        onClose={() => setIsInspectorOpen(false)}
      />
    </div>
  );
}
