"use client";

import { toast } from "react-toastify";
// import emailjs from "@emailjs/browser";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: Record<string, string>) => {
    try {
      console.log(data);
      //   await emailjs.send("service_6ioyfyn", "template_vcxutb8", data, {
      //     publicKey: "KYzXXSYc5Sml-ySqX",
      //   });
      toast.success("Successfully Contacted.");
      reset();
    } catch (err) {
      if (err instanceof Error) {
        toast.error(`FAILED to Contact... ${err.message}`);
      } else {
        toast.error("FAILED to Contact...");
      }
    }
  };

  return (
    <div className="flex-1">
      <h1 className="lg:text-3xl md:text-2xl text-xl font-semibold text-center ">
        Contact <span className="text-green-500"> Me</span>
      </h1>
      <div className=" max-w-sm mx-auto lg:mt-10 mt-6">
        <div className="">
          <div className="">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <Input
                  type="text"
                  placeholder="Your Name"
                  className="input input-bordered input-primary text-sm w-full bg-slate-800 mb-5"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Name is Required",
                    },
                  })}
                />
                <label className="label">
                  {errors?.name?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {"Name is Required"}
                    </span>
                  )}
                </label>
              </div>

              <div className="form-control w-full ">
                <Input
                  type="email"
                  placeholder="Your Email"
                  className="input input-bordered input-primary text-sm w-full bg-slate-800  mb-5"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email is Required",
                    },
                    pattern: {
                      value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                      message: "Provide a valid Email",
                    },
                  })}
                />
                <label className="label">
                  {errors.email?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {"Email is Required"}
                    </span>
                  )}
                  {errors.email?.type === "pattern" && (
                    <span className="label-text-alt text-red-500">
                      {"Provide a valid Email"}
                    </span>
                  )}
                </label>
              </div>

              <div className="form-control w-full ">
                <Input
                  type="text"
                  placeholder="Subject"
                  className="input input-bordered input-primary text-sm w-full bg-slate-800  mb-5"
                  {...register("subject", {
                    required: {
                      value: true,
                      message: "Subject is Required",
                    },
                  })}
                />
                <label className="label">
                  {errors.subject?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {"Subject is Required"}
                    </span>
                  )}
                </label>
              </div>

              <div className="form-control w-full ">
                <Input
                  placeholder="Your Message"
                  className="textarea  textarea-bordered textarea-primary text-md  w-full bg-slate-800  mb-5"
                  {...register("message", {
                    required: {
                      value: true,
                      message: "Message is Required",
                    },
                  })}
                />
                <label className="label">
                  {errors.message?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {"Message is Required"}
                    </span>
                  )}
                </label>
              </div>

              <div className="flex lg:justify-end md:justify-end justify-center mt-2 hover:text-white">
                <Input
                  className="btn px-10  btn-primary bg-green-500 border-0 text-center text-white "
                  type="submit"
                  value="Contact"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;