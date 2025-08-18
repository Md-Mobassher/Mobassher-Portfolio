"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Import testimonial data and types
import Container from "@/components/layout/Container";
import Title from "@/components/layout/Title";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import testimonialData from "@/data/testimonialData.json";
import { TStarRatingProps, TTestimonialCardProps } from "@/types/testimonial";
import { Avatar } from "@radix-ui/react-avatar";
import Link from "next/link";

// Star rating component
const StarRating = ({ rating }: TStarRatingProps) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className={`w-4 h-4 ${
            index < rating ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

// Testimonial card component
const TestimonialCard = ({ testimonial }: TTestimonialCardProps) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      // Add hover animations
      const card = cardRef.current;

      const handleMouseEnter = () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
        });
      };

      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        card.removeEventListener("mouseenter", handleMouseEnter);
        card.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className=" rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-300 dark:border-gray-700 hover:shadow-primary/20"
    >
      {/* Quote icon */}
      <div className="mb-2">
        <svg
          className="w-8 h-8 text-primary "
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>

      {/* Testimonial text */}
      <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-4 italic">
        "{testimonial.testimonial}"
      </p>

      {/* Rating */}
      <div className="mb-4">
        <StarRating rating={testimonial.rating} />
      </div>

      {/* Project info */}
      <div className="mb-4 p-3 bg-gray-200 dark:bg-gray-700 rounded-lg">
        <div className="text-sm text-gray-900 dark:text-gray-400">
          <span className="font-semibold mr-1">Project:</span>{" "}
          <Link
            href={testimonial.projectUrl}
            target="_blank"
            className="text-md font-semibold text-primary hover:scale-105"
          >
            {testimonial.project}
          </Link>
        </div>
      </div>

      {/* Client info */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-green-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
          <Avatar className="rounded-full">
            <AvatarImage src={testimonial.avatar} className="rounded-full" />
            <AvatarFallback className="text-5xl font-bold bg-transparent">
              {testimonial.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">
            {testimonial.name}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {testimonial.position}
          </p>
          <p className="text-sm text-primary font-medium">
            {testimonial.company}
          </p>
        </div>
        {testimonial.verified && (
          <div className="ml-auto">
            <svg
              className="w-5 h-5 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

const TestimonialSlider = () => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      // GSAP animation for container entrance
      gsap.fromTo(
        containerRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      setIsVisible(true);
    }

    return () => {
      // Clean up ScrollTrigger
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="py-10 bg-gradient-to-br  dark:to-gray-800"
      id="testimonials"
    >
      <Container>
        {/* Section Header */}
        <div className="text-center mb-8">
          <Title title="What Clients" titleColor="Say" />

          <p className="md:text-xl text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Don't just take my word for it. Here's what my clients have to say
            about working together on their projects.
          </p>
        </div>

        {/* Testimonials Slider */}
        {isVisible && (
          <div className="relative">
            <Swiper
              modules={[Autoplay, Navigation, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              loop={true}
              className="testimonial-swiper"
            >
              {testimonialData.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <TestimonialCard testimonial={testimonial} />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <button className="swiper-button-prev absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button className="swiper-button-next absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
              {/* {testimonialData.length}+ */}
              30+
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-lg font-semibold">
              Happy Clients
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
              5.0
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-lg font-semibold">
              Average Rating
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
              100%
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-lg font-semibold">
              Success Rate
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
              24/7
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-lg font-semibold">
              Support
            </div>
          </div>
        </div>
      </Container>

      {/* Custom CSS for Swiper */}
      <style jsx global>{`
        .testimonial-swiper .swiper-pagination-bullet {
          background: #10b981;
          opacity: 0.3;
        }
        .testimonial-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          background: #10b981;
        }
        .testimonial-swiper .swiper-pagination {
          bottom: -40px;
        }
      `}</style>
    </div>
  );
};

export default TestimonialSlider;
