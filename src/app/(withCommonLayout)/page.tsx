import React from "react";
import Intro from "./components/intro/Intro";
import About from "./components/about/About";
import MySkills from "./components/skills/MySkills";
import Contact from "./components/contact/Contact";
import MyPortfolios from "./components/portfolios/MyPortfolios";
import MyBlogs from "./components/blog/MyBlogs";

const HomePage = () => {
  return (
    <div className="">
      <Intro />
      <About />
      <MySkills />
      <MyPortfolios />
      <MyBlogs />
      <Contact />
    </div>
  );
};

export default HomePage;
