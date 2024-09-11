"use client";

import Button from "@/components/ui/Button";

const IntroButton = () => {
  return (
    <div className="mt-10">
      <Button
        link="https://drive.google.com/file/d/1lrAMInBo2I610RC-oMsihi2_Tt2sZW7j/view?usp=sharing"
        target="__blank"
        color="white"
        bgColor="#00cf5d"
        title="Get Resume"
      />
      <Button
        clickEvent
        link="#about"
        color="white"
        bgColor="#1F2937"
        margin="0 0 0 15px"
        title="About Me"
      />
    </div>
  );
};

export default IntroButton;
