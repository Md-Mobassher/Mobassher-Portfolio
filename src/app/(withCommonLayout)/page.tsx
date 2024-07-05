import React from "react";
import Intro from "./components/Intro";
import About from "./components/About";
import MySkills from "./components/MySkills";

const HomePage = () => {
  return (
    <div className="container mx-auto px-4">
      <Intro />
      <About />
      <MySkills />
    </div>
  );
};

export default HomePage;
