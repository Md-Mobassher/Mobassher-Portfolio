"use client";

import Container from "@/components/layout/Container";
import Title from "@/components/layout/Title";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // GSAP Timeline for smooth sequential animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Initial state - hide elements
    gsap.set([titleRef.current, contentRef.current], {
      opacity: 0,
      y: 50,
    });

    // Animate title first
    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
    })
      // Then animate content
      .to(
        contentRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.3"
      );

    // ScrollTrigger for the entire section
    ScrollTrigger.create({
      trigger: titleRef.current,
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
    });

    return () => {
      // Clean up ScrollTrigger
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div id="contact" className="lg:py-10 md:py-8 py-6">
      <Container>
        <div ref={titleRef}>
          <Title title="Hire" titleColor="Me" />
        </div>
        <div
          ref={contentRef}
          className="lg:flex md:flex lg:mt-10 mt-6 justify-center items-start"
        >
          <ContactInfo />
          <ContactForm />
        </div>
      </Container>
    </div>
  );
};

export default Contact;
