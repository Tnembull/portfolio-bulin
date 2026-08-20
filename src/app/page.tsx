import SequenceScroll from "@/components/Hero/SequenceScroll";
import PipelineWidget from "@/components/PipelineWidget";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import ProgressTracker from "@/components/ProgressTracker";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main id="main-content" className="relative pb-12">
      {/* 1. Hero Header & Pipeline Widget */}
      <SequenceScroll />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PipelineWidget />
      </div>

      {/* 2. Top 3 Featured Projects */}
      <Projects featuredOnly={true} />

      {/* 3. Capabilities & Digital Badges */}
      <Skills />

      {/* 4. Progress Learning Roadmap */}
      <ProgressTracker />

      {/* 5. Contact & Footer */}
      <CTA />
      <Footer />
    </main>
  );
}
