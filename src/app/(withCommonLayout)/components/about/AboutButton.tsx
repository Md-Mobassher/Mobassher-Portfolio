"use client";

import Button from "@/components/ui/Button";

const AboutButton = () => {
  return (
    <div className="lg:mt-10 md:mt-8 mt-5 flex lg:justify-start md:justify-start justify-center">
      <Button
        link="https://drive.google.com/file/d/1lrAMInBo2I610RC-oMsihi2_Tt2sZW7j/view?usp=sharing"
        target="__blank"
        color="white"
        bgColor="#00cf5d"
        title="Get Resume"
      />

      <Button
        clickEvent
        link="#myskills"
        color="white"
        bgColor="#1F2937"
        margin="0 0 0 15px"
        title="My Skills"
      />
    </div>
  );
};

export default AboutButton;
