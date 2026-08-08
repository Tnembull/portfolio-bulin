import dynamic from "next/dynamic";

import SequenceScroll from "@/components/Hero/SequenceScroll";
import About from "@/components/About";
import Projects from "@/components/Projects";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import ToolsSlider from "@/components/ToolsSlider";
import WorkProcess from "@/components/WorkProcess";
import Stats from "@/components/Stats";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";

const GitHubContributions = dynamic(() => import("@/components/GitHubContributions"));
const MusicPlayer = dynamic(() => import("@/components/MusicPlayer"));
const AwardsMarquee = dynamic(() => import("@/components/AwardsMarquee"));

export default function Home() {
  return (
    <main className="relative pb-12">
      <SequenceScroll />
      <About />
      <Projects />
      <ExperienceTimeline />
      <Education />
      <Skills />
      <ToolsSlider />
      <WorkProcess />
      <GitHubContributions />
      <MusicPlayer />
      <Stats />
      <FAQ />
      <AwardsMarquee />
      <Testimonials />
      <CTA />
    </main>
  );
}
