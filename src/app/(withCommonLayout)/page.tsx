import React from "react";
import Intro from "./components/Intro";
import About from "./components/About";
import MySkills from "./components/skills/MySkills";
import Contact from "./components/contact/Contact";

const HomePage = () => {
  return (
    <div className="container mx-auto px-4">
      <Intro />
      <About />
      <MySkills />

      <Contact />
    </div>
  );
};

export default HomePage;
