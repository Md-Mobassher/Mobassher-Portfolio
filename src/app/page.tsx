// File: src/app/page.tsx

import About from "@/app/(main)/components/about/About";
import MyBlogs from "@/app/(main)/components/blog/MyBlogs";
import Contact from "@/app/(main)/components/contact/Contact";
import Intro from "@/app/(main)/components/intro/Intro";
import MyProjects from "@/app/(main)/components/projects/MyProjects";
import MySkills from "@/app/(main)/components/skills/MySkills";
import Footer from "@/components/shared/footer/Footer";
import Navbar from "@/components/shared/navbar/Navbar";
import TestimonialSlider from "@/components/shared/slider/TestimonialSlider";
import React from "react";
import MakeSchedule from "./(main)/components/MakeSchedule";

// Force dynamic rendering to prevent static generation issues
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function HomePage() {
  return (
    <React.Fragment>
      <Navbar />
      <Intro />
      <About />
      <MySkills />
      <MyProjects />
      <TestimonialSlider />
      <MyBlogs />
      <Contact />
      <MakeSchedule />
      <Footer />
    </React.Fragment>
  );
}
