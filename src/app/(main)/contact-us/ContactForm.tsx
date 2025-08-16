"use client";

import { FormInput, FormTextarea } from "@/components/form";
import { Button } from "@/components/ui/button";
import { createGenericOperationsHook } from "@/hooks/useGenericOperations";
import { useCreateContactMutation } from "@/redux/features/admin/contactApi";
import { CreateContactFormData, createContactFormSchema } from "@/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ContactForm() {
  const form = useForm<CreateContactFormData>({
    resolver: zodResolver(createContactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });
  // Use the custom hook for contact operations
  const { createEntity, isCreating } = createGenericOperationsHook(
    {
      createMutation: useCreateContactMutation,
    },
    "Contact"
  )();
  const onSubmit = async (values: CreateContactFormData) => {
    const success = await createEntity(values);

    if (success) {
      toast.success("Your message has been sent successfully!");
      form.reset();
    }
  };

  return (
    <section className="bg-white md:p-6 p-0">
      <h2 className="text-2xl font-bold text-primary mb-4 md:mb-8 text-center">
        Contact Form
      </h2>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full"
        >
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 w-full justify-between">
            <FormInput
              name="name"
              label="👤 Your Name"
              placeholder="Enter your full name"
              required
            />{" "}
            <FormInput
              name="phone"
              label="📞 Phone"
              type="tel"
              placeholder="Enter your phone number"
              required
            />
          </div>

          <FormInput
            name="email"
            label="📧 Email"
            type="email"
            placeholder="Enter your email address"
            required
          />

          <FormTextarea
            name="message"
            label="📝 Message"
            placeholder="Enter your message"
            rows={4}
            required
          />

          <Button
            type="submit"
            disabled={isCreating}
            className="bg-primary text-white font-bold px-6 py-2 rounded hover:bg-primary/80 transition w-full"
          >
            {isCreating ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </FormProvider>
    </section>
  );
}
