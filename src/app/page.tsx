import HeroEditorial from "@/components/HeroEditorial";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import ProgressTracker from "@/components/ProgressTracker";
import PipelineWidget from "@/components/PipelineWidget";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <main
      id="main-content"
      className="max-w-5xl mx-auto border-x border-slate-800/60 bg-slate-950 text-slate-100 font-sans"
    >
      {/* Section 1: Hero */}
      <HeroEditorial />

      {/* Section 2: Top 3 Featured Projects */}
      <Projects featuredOnly={true} />

      {/* Section 3: Technical Capabilities & Certifications */}
      <Skills />

      {/* Section 4: Progress Learning Roadmap */}
      <ProgressTracker />

      {/* Section 5: Terminal & Contact */}
      <section id="terminal-and-contact">
        <PipelineWidget />
        <CTA />
      </section>
    </main>
  );
}
