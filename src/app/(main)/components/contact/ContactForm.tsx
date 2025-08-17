"use client";

import { FormInput } from "@/components/form/FormInput";
import { FormTextarea } from "@/components/form/FormTextarea";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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

  const onSubmit = async (data: ContactFormData) => {
    try {
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
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error(`FAILED to send your message... ${err.message}`);
      } else {
        toast.error("FAILED to send your message...");
      }
    }
  };

  return (
    <div className="flex-1">
      <h1 className="lg:text-3xl md:text-2xl text-xl font-semibold text-center ">
        Contact{" "}
        <span className="text-primary lg:text-3xl md:text-2xl text-xl font-semibold">
          Me
        </span>
      </h1>
      <div className=" max-w-sm mx-auto lg:mt-10 mt-6">
        <div className="">
          <div className="">
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-4">
                  <FormInput name="name" placeholder="Your Name" required />
                  <FormInput
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    required
                  />
                  <FormInput name="subject" placeholder="Subject" required />
                  <FormTextarea
                    name="message"
                    placeholder="Your Message"
                    required
                  />
                </div>

                <div className="flex lg:justify-end md:justify-end justify-center mt-4">
                  <Button
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
