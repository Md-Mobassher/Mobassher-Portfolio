"use client";

import Container from "@/components/layout/Container";
import Button from "@/components/shared/button/Button";
import Typewriter from "@/components/shared/Typewriter";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { FaSquareUpwork } from "react-icons/fa6";

const Intro = () => {
  const helloRef = useRef(null);
  const nameRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonsRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    // GSAP Timeline for smooth sequential animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Initial state - hide all elements
    gsap.set(
      [
        helloRef.current,
        nameRef.current,
        titleRef.current,
        descriptionRef.current,
        buttonsRef.current,
        imageRef.current,
      ],
      {
        opacity: 0,
        y: 30,
      }
    );

    // Animate elements in sequence
    tl.to(helloRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      scale: 1.1,
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
        titleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.4"
      )
      .to(
        descriptionRef.current,
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
        imageRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.4"
      );

    // Add floating animation to image
    gsap.to(imageRef.current, {
      y: -20,
      duration: 2,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
    });

    // Add glow effect to border
    gsap.to(imageRef.current, {
      boxShadow: "0 0 25px var(--primary), 0 0 50px var(--primary)",
      duration: 2,
      ease: "power1.inOut",
      yoyo: false,
      repeat: -1,
    });
  }, []);

  return (
    <div className="pt-10">
      <Container>
        <div className="mt-20 flex items-center justify-between lg:flex-row md:flex-row flex-col md:gap-5 gap-10">
          <div className="">
            <div className="flex justify-start items-center md:gap-5 gap-3 mb-2">
              <span
                ref={helloRef}
                className="bg-primary text-white px-3 py-0.5 rounded-md text-lg font-semibold"
              >
                Hello!
              </span>{" "}
              <span className="text-xl font-semibold">I&apos;m</span>
            </div>
            <h1
              ref={nameRef}
              className="lg:text-[60px] md:text-[40px] text-[32px] font-extrabold text-gray-800 dark:text-white"
            >
              Mobassher Hossain
            </h1>
            <h3
              ref={titleRef}
              className="lg:text-5xl md:text-4xl text-2xl font-bold text-gray-800 dark:text-white"
            >
              Full-Stack{" "}
              <Typewriter
                text="Developer"
                speed={150}
                delay={1000}
                className="text-primary lg:text-5xl md:text-4xl text-2xl font-bold"
              />
            </h3>
            <p
              ref={descriptionRef}
              className="text-gray-600 dark:text-gray-400 text-lg mt-5 max-w-lg md:py-5 py-2"
            >
              A dedicated professional with 2+ years of experience, committed to
              delivering excellence in every service and building lasting client
              relationships that keep them coming back.
            </p>
            <div
              ref={buttonsRef}
              className="flex flex-start gap-5 justify-start items-center mt-5"
            >
              <Button
                clickEvent
                link="#about"
                title="More About Me"
                className="bg-primary text-white hover:bg-green-600 px-5 py-2 inline-block border border-primary"
              />
              <Link
                href="https://www.upwork.com/freelancers/~01950a903c93abad36?mp_source=share"
                target="_blank"
                className="bg-gray-200/60 dark:bg-gray-600/60 text-primary dark:text-white hover:bg-primary dark:hover:bg-primary hover:text-white px-5 py-2 rounded-md border border-primary flex items-center gap-2 transition-all duration-300"
              >
                <FaSquareUpwork className="size-6" /> Hire Me
              </Link>
            </div>
          </div>
          <div
            ref={imageRef}
            className="lg:max-w-[380px] md:max-w-[300px] max-w-full flex justify-center lg:mt-0 mt-0 border-8 border-primary"
          >
            <Image
              className="transform scale-[0.95] filter grayscale hover:scale-[1] hover:grayscale-0 transition-all duration-1000 z-0"
              alt="profile"
              src={"/images/mobassher.png"}
              width={500}
              height={400}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Intro;
