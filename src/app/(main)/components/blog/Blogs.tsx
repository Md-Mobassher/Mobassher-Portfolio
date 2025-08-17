"use client";

import { TBlog } from "@/types";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import BlogCard from "../../blogs/components/BlogCard";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface BlogsProps {
  blogs: TBlog[];
}

const Blogs = ({ blogs }: BlogsProps) => {
  const blogsGridRef = useRef<HTMLDivElement>(null);
  const blogCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Wait for next tick to ensure refs are populated
    const timeoutId = setTimeout(() => {
      if (blogsGridRef.current && blogCardRefs.current.length > 0) {
        // GSAP Animation for blog cards
        gsap.fromTo(
          blogCardRefs.current,
          {
            opacity: 0,
            scale: 0.7,
            y: 50,
            rotation: -10,
            filter: "blur(5px)",
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            rotation: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "back.out(1.5)",
            stagger: {
              each: 0.05,
              from: "start",
              ease: "power2.out",
            },
            scrollTrigger: {
              trigger: blogsGridRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      // Clean up ScrollTrigger
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [blogs]);

  // Function to add ref to each blog card
  const addBlogCardRef = (el: HTMLDivElement | null, index: number) => {
    blogCardRefs.current[index] = el;
  };

  return (
    <div
      ref={blogsGridRef}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 md:gap-7 gap-6 mx-auto"
    >
      {blogs?.slice(0, 3).map((blog, index) => (
        <div key={blog?._id} ref={(el) => addBlogCardRef(el, index)}>
          <BlogCard blog={blog} />
        </div>
      ))}
    </div>
  );
};

export default Blogs;
