import React from "react";
import Intro from "./components/intro/Intro";
import About from "./components/about/About";
import MySkills from "./components/skills/MySkills";
import Contact from "./components/contact/Contact";
import Portfolios from "./components/portfolios/Portfolios";
import MyPortfolios from "./components/portfolios/MyPortfolios";

const HomePage = () => {
  return (
    <div className="container mx-auto px-4">
      <Intro />
      <About />
      <MySkills />
      <MyPortfolios />
      <Contact />
    </div>
  );
};

export default HomePage;
