"use client";

import Container from "@/components/layout/Container";
import Title from "@/components/layout/Title";
import Button from "@/components/shared/button/Button";
import workExperience from "@/data/workExperience.json";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { MdMyLocation } from "react-icons/md";
import { PiDiamondsFourBold } from "react-icons/pi";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const titleRef = useRef(null);
  const nameRef = useRef(null);
  const bioRef = useRef(null);
  const buttonsRef = useRef(null);
  const timelineRef = useRef(null);
  const timelineLineRef = useRef(null);

  useEffect(() => {
    // GSAP Timeline for smooth sequential animations
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    // Initial state - hide all elements
    gsap.set(
      [
        titleRef.current,
        nameRef.current,
        bioRef.current,
        buttonsRef.current,
        timelineRef.current,
      ],
      {
        opacity: 0,
        y: 50,
      }
    );

    // Animate elements in sequence
    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
    })
      .to(
        nameRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.4"
      )

      .to(
        bioRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.4"
      )
      .to(
        buttonsRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.4"
      )
      .to(
        timelineRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.6"
      );

    // Animate timeline line
    gsap.fromTo(
      timelineLineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Animate timeline nodes with stagger
    gsap.fromTo(
      ".timeline-node",
      {
        scale: 0,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
        stagger: 0.2,
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Animate experience cards with stagger
    gsap.fromTo(
      ".experience-card",
      {
        x: -50,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.3,
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <div id="about" className="lg:py-10 md:py-8 py-6">
      <Container>
        <div ref={titleRef}>
          <Title title="About" titleColor="Me" />
        </div>

        <div className="flex lg:flex-row md:flex-col flex-col gap-8 md:gap-6 lg:gap-14 items-center mt-5">
          {/* Left Section - Personal Info and Bio */}
          <div className="lg:w-1/2 w-full">
            <div
              ref={nameRef}
              className="flex justify-between items-center gap-4 md:gap-10"
            >
              <div>
                <h2 className="text-3xl font-bold dark:text-white mb-1">
                  Mobassher Hossain
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-400">
                  Full-Stack Developer
                </p>
              </div>
              <div className="text-center flex items-center gap-5">
                <div className="text-6xl font-bold text-primary">2</div>
                <div className="text-lg text-gray-700 dark:text-gray-400 flex flex-col items-start gap-1">
                  <h3>Years</h3>
                  <p className="">Experience</p>
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-primary mt-4 mb-6"></div>

            <div ref={bioRef} className="space-y-4">
              <p className="dark:text-gray-400 text-gray-700 leading-relaxed text-lg">
                Hi there! I'm a Full Stack Developer with 2+ years of experience
                in building scalable, user-friendly, and visually engaging web
                applications. Passionate about solving problems with clean code
                and creative solutions, I strive to deliver excellence that
                keeps clients coming back. Let's create something amazing
                together!
              </p>
            </div>
            <div
              ref={buttonsRef}
              className="flex flex-start gap-5 justify-start items-center mt-5"
            >
              <Button
                clickEvent
                link="#myskills"
                title="My Skills"
                className="bg-primary text-white hover:bg-green-600 px-5 py-2 inline-block border border-primary"
              />
              <Link
                href="https://drive.google.com/file/d/1lrAMInBo2I610RC-oMsihi2_Tt2sZW7j/view"
                target="_blank"
                className="bg-gray-200/60 dark:bg-gray-600/60 text-primary dark:text-white hover:bg-primary dark:hover:bg-primary hover:text-white px-5 py-2 rounded-md border border-primary flex items-center gap-2 transition-all duration-300"
              >
                Resume
              </Link>
            </div>
          </div>

          {/* Right Section - Work Experience Timeline */}
          <div ref={timelineRef} className="lg:w-1/2 w-full md:mt-0 mt-5">
            <div className="relative">
              {/* Timeline line */}
              <div
                ref={timelineLineRef}
                className="absolute lg:left-5 left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-primary/20 rounded-full h-full origin-top"
              ></div>

              <div className="space-y-4">
                {workExperience.map((job, index) => (
                  <div
                    key={job.id}
                    className="relative flex items-start experience-card"
                  >
                    {/* Timeline node */}
                    <div className="absolute lg:left-5.5 left-0.5 w-3 h-3 bg-primary rounded-full -translate-x-1/2 mt-2 timeline-node"></div>

                    <div className="lg:ml-14 ml-6 flex justify-between lg:items-center md:items-center items-start w-full border-b border-primary border-dashed md:pb-2 pb-3">
                      <div className="w-full flex flex-col gap-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold dark:text-white md:text-xl text-lg">
                            {job.jobTitle},{" "}
                            <span className="dark:text-gray-300 text-gray-700 text-lg">
                              {job.jobType}
                            </span>
                          </h3>
                        </div>
                        <div className="flex justify-between items-center w-full">
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <span className="text-gray-400">
                                <PiDiamondsFourBold />
                              </span>
                              <span className="dark:text-gray-400 text-gray-700 text-lg">
                                {job.company}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-gray-400">
                                {" "}
                                <MdMyLocation />
                              </span>
                              <span className="dark:text-gray-400 text-gray-700 text-lg">
                                {job.location}
                              </span>
                            </div>
                          </div>
                          <div
                            className={`px-3 py-1 text-lg rounded-md font-medium ${job.isCurrent ? "bg-primary text-white" : "border border-primary"}`}
                          >
                            {job.duration}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default About;
