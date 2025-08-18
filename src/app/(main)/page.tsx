import TestimonialSlider from "@/components/shared/slider/TestimonialSlider";
import React from "react";
import About from "./components/about/About";
import MyBlogs from "./components/blog/MyBlogs";
import Contact from "./components/contact/Contact";
import Intro from "./components/intro/Intro";
import MakeSchedule from "./components/MakeSchedule";
import MyProjects from "./components/projects/MyProjects";
import MySkills from "./components/skills/MySkills";

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
