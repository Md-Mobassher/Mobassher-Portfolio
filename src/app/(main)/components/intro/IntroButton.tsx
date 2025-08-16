"use client";

import Button from "@/components/shared/button/Button";

const IntroButton = () => {
  return (
    <div className="mt-10">
      <Button
        link="https://drive.google.com/file/d/1lrAMInBo2I610RC-oMsihi2_Tt2sZW7j/view?usp=sharing"
        target="__blank"
        title="Get Resume"
        className="bg-dark-primary mr-5 text-white hover:bg-green-600 px-5 py-3 inline-block"
      />
      <Button clickEvent link="#about" title="About Me" />
    </div>
  );
};

export default IntroButton;
