import { useCallback, useState } from 'react';
import { AnimatePresence, MotionConfig } from 'framer-motion';

import { EngineeringProject } from '@/components/EngineeringProject';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { TechnicalDrawer } from '@/components/TechnicalDrawer';
import { Work } from '@/components/Work';

export default function App() {
  const [briefOpen, setBriefOpen] = useState(false);
  const closeBrief = useCallback(() => setBriefOpen(false), []);

  return (
    <MotionConfig reducedMotion="user">
      <div id="top" className="overflow-x-clip">
        <Hero />
        <Work />
        <EngineeringProject onOpen={() => setBriefOpen(true)} />
        <Footer />
      </div>
      <AnimatePresence>{briefOpen && <TechnicalDrawer key="brief" onClose={closeBrief} />}</AnimatePresence>
    </MotionConfig>
  );
}
