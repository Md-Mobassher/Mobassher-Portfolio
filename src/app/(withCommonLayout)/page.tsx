import React from "react";
import Intro from "./components/Intro";
import About from "./components/About";

const HomePage = () => {
  return (
    <div className="container mx-auto px-4">
      <Intro />
      <About />
    </div>
  );
};

export default HomePage;
