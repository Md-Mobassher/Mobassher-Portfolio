"use client";

import { TSkill } from "@/types";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import SkillCard from "./SkillCard";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface SkillsProps {
  skills: TSkill[];
}

const Skills = ({ skills }: SkillsProps) => {
  const skillsContainerRef = useRef<HTMLDivElement>(null);
  const skillCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    // Wait for next tick to ensure refs are populated
    const timeoutId = setTimeout(() => {
      if (skillCardRefs.current.length > 0 && skillsContainerRef.current) {
        // GSAP Animation for skills
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: skillsContainerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        });

        // Initial state - hide all skill cards
        gsap.set(skillCardRefs.current, {
          opacity: 0,
          scale: 0.5,
          y: 50,
          rotation: -15,
        });

        // Animate skills with stagger effect
        tl.to(skillCardRefs.current, {
          opacity: 1,
          scale: 1,
          y: 0,
          rotation: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: {
            amount: 0.8,
            from: "start",
            ease: "power2.out",
          },
        });

        // Add hover animations for individual skill cards
        skillCardRefs.current.forEach((cardRef) => {
          if (cardRef) {
            // Hover in effect
            cardRef.addEventListener("mouseenter", () => {
              gsap.to(cardRef, {
                scale: 1.1,
                y: -10,
                duration: 0.3,
                ease: "power2.out",
              });
            });

            // Hover out effect
            cardRef.addEventListener("mouseleave", () => {
              gsap.to(cardRef, {
                scale: 1,
                y: 0,
                duration: 0.3,
                ease: "power2.out",
              });
            });
          }
        });
      }
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      // Clean up ScrollTrigger
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [skills]);

  // Function to add ref to each skill card
  const addSkillCardRef = (el: HTMLDivElement | null, index: number) => {
    skillCardRefs.current[index] = el;
  };

  return (
    <div
      ref={skillsContainerRef}
      className="flex flex-wrap lg:gap-3 md:gap-3 gap-2 mx-auto justify-center items-center"
    >
      {skills?.map((skill, index) => (
        <div key={skill._id} ref={(el) => addSkillCardRef(el, index)}>
          <SkillCard name={skill.name} />
        </div>
      ))}
    </div>
  );
};

export default Skills;
