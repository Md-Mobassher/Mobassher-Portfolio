"use client";

import Button from "@/components/ui/Button";

const AboutButton = () => {
  return (
    <div className="lg:mt-10 md:mt-8 mt-5 flex lg:justify-start md:justify-start justify-center">
      <Button
        link="https://drive.google.com/file/d/1lrAMInBo2I610RC-oMsihi2_Tt2sZW7j/view?usp=sharing"
        target="__blank"
        className="bg-dark-primary mr-5 text-white hover:bg-green-600"
        title="Get Resume"
      />

      <Button clickEvent link="#myskills" title="My Skills" />
    </div>
  );
};

export default AboutButton;
