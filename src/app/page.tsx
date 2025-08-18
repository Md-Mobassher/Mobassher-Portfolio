import TestimonialSlider from "@/components/shared/slider/TestimonialSlider";
import React from "react";
import About from "./(main)/components/about/About";
import MyBlogs from "./(main)/components/blog/MyBlogs";
import Contact from "./(main)/components/contact/Contact";
import Intro from "./(main)/components/intro/Intro";
import MakeSchedule from "./(main)/components/MakeSchedule";
import MyProjects from "./(main)/components/projects/MyProjects";
import MySkills from "./(main)/components/skills/MySkills";

export default function HomePage() {
  return (
    <React.Fragment>
      <Intro />
      <About />
      <MySkills />
      <MyProjects />
      <TestimonialSlider />
      <MyBlogs />
      <Contact />
      <MakeSchedule />
    </React.Fragment>
  );
}
