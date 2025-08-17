"use client";

import { FormInput } from "@/components/form/FormInput";
import { FormTextarea } from "@/components/form/FormTextarea";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Zod schema for contact form validation
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(100, "Email must be less than 100 characters"),
  subject: z
    .string()
    .min(5, "Subject must be at least 5 characters")
    .regex(/^[a-zA-Z0-9\s\-_.,!?]+$/, "Subject contains invalid characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
});

// TypeScript type derived from the Zod schema
type ContactFormData = z.infer<typeof contactFormSchema>;

const ContactForm = () => {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const titleRef = useRef(null);
  const formFieldsRef = useRef<(HTMLDivElement | null)[]>([]);
  const submitButtonRef = useRef(null);

  useEffect(() => {
    // Wait for next tick to ensure refs are populated
    const timeoutId = setTimeout(() => {
      if (
        titleRef.current &&
        formFieldsRef.current.length > 0 &&
        submitButtonRef.current
      ) {
        // GSAP Timeline for smooth sequential animations
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // Initial state - hide elements
        gsap.set(
          [titleRef.current, ...formFieldsRef.current, submitButtonRef.current],
          {
            opacity: 0,
            y: 50,
          }
        );

        // Animate title first
        tl.to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
        })
          // Then animate form fields with stagger
          .to(
            formFieldsRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: {
                each: 0.1,
                from: "start",
                ease: "power2.out",
              },
            },
            "-=0.3"
          )
          // Finally animate submit button
          .to(
            submitButtonRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
            },
            "-=0.2"
          );

        // Add hover animations for form fields
        formFieldsRef.current.forEach((fieldRef) => {
          if (fieldRef) {
            // Hover in effect
            fieldRef.addEventListener("mouseenter", () => {
              gsap.to(fieldRef, {
                scale: 1.02,
                y: -2,
                duration: 0.3,
                ease: "power2.out",
              });
            });

            // Hover out effect
            fieldRef.addEventListener("mouseleave", () => {
              gsap.to(fieldRef, {
                scale: 1,
                y: 0,
                duration: 0.3,
                ease: "power2.out",
              });
            });
          }
        });

        // Add hover animation for submit button
        if (submitButtonRef.current) {
          submitButtonRef.current.addEventListener("mouseenter", () => {
            gsap.to(submitButtonRef.current, {
              scale: 1.05,
              y: -3,
              duration: 0.3,
              ease: "power2.out",
            });
          });

          submitButtonRef.current.addEventListener("mouseleave", () => {
            gsap.to(submitButtonRef.current, {
              scale: 1,
              y: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          });
        }
      }
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      // Clean up ScrollTrigger
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Add submission animation
      if (submitButtonRef.current) {
        gsap.to(submitButtonRef.current, {
          scale: 0.95,
          duration: 0.1,
          ease: "power2.out",
          yoyo: true,
          repeat: 1,
        });
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to contact.");
      }

      const responseData = await res.json();

      if (responseData.success) {
        toast.success("Successfully sent your message.");
        form.reset();

        // Add success animation
        if (submitButtonRef.current) {
          gsap.to(submitButtonRef.current, {
            backgroundColor: "#10b981",
            duration: 0.3,
            ease: "power2.out",
            yoyo: true,
            repeat: 1,
          });
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error(`FAILED to send your message... ${err.message}`);
      } else {
        toast.error("FAILED to send your message...");
      }
    }
  };

  // Function to add ref to each form field
  const addFormFieldRef = (el: HTMLDivElement | null, index: number) => {
    formFieldsRef.current[index] = el;
  };

  return (
    <div className="flex-1">
      <div ref={titleRef}>
        <h1 className="lg:text-3xl md:text-2xl text-xl font-semibold text-center ">
          Contact{" "}
          <span className="text-primary lg:text-3xl md:text-2xl text-xl font-semibold">
            Me
          </span>
        </h1>
      </div>
      <div className=" max-w-sm mx-auto lg:mt-10 mt-6">
        <div className="">
          <div className="">
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-4">
                  <div ref={(el) => addFormFieldRef(el, 0)}>
                    <FormInput
                      name="name"
                      placeholder="Your Name"
                      required
                      className="bg-gray-200 dark:bg-gray-800"
                    />
                  </div>
                  <div ref={(el) => addFormFieldRef(el, 1)}>
                    <FormInput
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      required
                      className="bg-gray-200 dark:bg-gray-800"
                    />
                  </div>
                  <div ref={(el) => addFormFieldRef(el, 2)}>
                    <FormInput
                      name="subject"
                      placeholder="Subject"
                      required
                      className="bg-gray-200 dark:bg-gray-800"
                    />
                  </div>
                  <div ref={(el) => addFormFieldRef(el, 3)}>
                    <FormTextarea
                      name="message"
                      placeholder="Your Message"
                      required
                      className="bg-gray-200 dark:bg-gray-800"
                    />
                  </div>
                </div>

                <div className="flex lg:justify-end md:justify-end justify-center mt-4">
                  <Button
                    ref={submitButtonRef}
                    type="submit"
                    className="px-10 bg-primary hover:bg-green-600 border-0 text-white text-md font-semibold"
                    size="lg"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? "Sending..." : "Contact"}
                  </Button>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
