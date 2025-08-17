"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { FcManager } from "react-icons/fc";
import { GoLocation } from "react-icons/go";
import { HiOutlineMailOpen } from "react-icons/hi";
import { TbPhoneCall } from "react-icons/tb";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Contact information data
const contactData = [
  {
    id: 1,
    icon: FcManager,
    title: "Name",
    value: "Md Mobassher Hossain",
    link: null,
  },
  {
    id: 2,
    icon: GoLocation,
    title: "Location",
    value: "Tograihat, Rajarhat, Kurigram, Bangladesh-5600.",
    link: null,
  },
  {
    id: 3,
    icon: TbPhoneCall,
    title: "Call / WhatsApp",
    value: "+88-01706060647",
    link: "tel:+8801706060647",
  },
  {
    id: 4,
    icon: HiOutlineMailOpen,
    title: "Email",
    value: "mdmobassherhossain1@gmail.com",
    link: "mailto:mdmobassherhossain1@gmail.com",
  },
];

const ContactInfo = () => {
  const titleRef = useRef(null);
  const contactItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Wait for next tick to ensure refs are populated
    const timeoutId = setTimeout(() => {
      if (titleRef.current && contactItemsRef.current.length > 0) {
        // GSAP Timeline for smooth sequential animations
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // Initial state - hide elements
        gsap.set([titleRef.current, ...contactItemsRef.current], {
          opacity: 0,
          x: -50,
        });

        // Animate title first
        tl.to(titleRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
        })
          // Then animate contact items with stagger
          .to(
            contactItemsRef.current,
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              stagger: {
                each: 0.1,
                from: "start",
                ease: "power2.out",
              },
            },
            "-=0.3"
          );

        // Add hover animations for interactive contact items
        contactItemsRef.current.forEach((itemRef, index) => {
          if (itemRef && contactData[index].link) {
            // Hover in effect
            itemRef.addEventListener("mouseenter", () => {
              gsap.to(itemRef, {
                scale: 1.02,
                x: 10,
                duration: 0.3,
                ease: "power2.out",
              });
            });

            // Hover out effect
            itemRef.addEventListener("mouseleave", () => {
              gsap.to(itemRef, {
                scale: 1,
                x: 0,
                duration: 0.3,
                ease: "power2.out",
              });
            });
          }
        });

        // Add floating animation to icons
        contactItemsRef.current.forEach((itemRef) => {
          if (itemRef) {
            gsap.to(itemRef.querySelector("svg"), {
              y: -3,
              duration: 2,
              ease: "power1.inOut",
              yoyo: true,
              repeat: -1,
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
  }, []);

  // Function to add ref to each contact item
  const addContactItemRef = (el: HTMLDivElement | null, index: number) => {
    contactItemsRef.current[index] = el;
  };

  return (
    <div className="flex-1 lg:mb-10 mb-8">
      <div ref={titleRef}>
        <h1 className="lg:text-3xl md:text-2xl text-xl font-semibold text-center">
          Contact{" "}
          <span className="text-primary lg:text-3xl md:text-2xl text-xl font-semibold">
            Info
          </span>
        </h1>
      </div>
      <div className="max-w-sm mx-auto lg:mt-10 mt-6">
        {contactData.map((contact, index) => {
          const IconComponent = contact.icon;
          return (
            <div
              key={contact.id}
              ref={(el) => addContactItemRef(el, index)}
              className={`flex justify-start max-w-sm items-center ${
                index > 0 ? "mt-7" : ""
              }`}
            >
              <div>
                <IconComponent className="w-10 h-10 mr-6 text-primary" />
              </div>
              <div>
                <h2 className="font-bold text-primary">{contact.title}</h2>
                <h2 className="">
                  {contact.link ? (
                    <a
                      target="_blank"
                      href={contact.link}
                      className="hover:text-primary transition-colors"
                    >
                      {contact.value}
                    </a>
                  ) : (
                    contact.value
                  )}
                </h2>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContactInfo;
