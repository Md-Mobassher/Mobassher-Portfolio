import Container from "@/components/layout/Container";
import { Calendar } from "lucide-react";
import Link from "next/link";

const MakeSchedule = () => {
  return (
    <section className="py-10 ">
      <Container>
        <div className="flex md:flex-row flex-col items-center justify-between gap-10">
          <div className="flex flex-col items-start justify-center flex-1 gap-3">
            <h1 className="lg:text-5xl md:text-4xl text-3xl font-bold">
              Have a project in mind?
            </h1>
            <h1 className="lg:text-5xl md:text-4xl text-3xl font-bold">
              Let's get to work. 👋📫
            </h1>
          </div>
          <div className="flex flex-col items-start justify-center flex-1 gap-4 max-w-lg">
            <p className="text-lg">
              I am dedicated to delivering exceptional digital solutions to
              clients worldwide. Let’s collaborate to bring your vision to life
              and achieve outstanding results together.
            </p>
            <Link
              href="https://calendly.com/mobassherhossain/30min"
              target="_blank"
              className="bg-primary text-white  hover:bg-green-600  px-5 py-2 rounded-md border border-primary flex items-center gap-2 transition-all duration-300"
            >
              <Calendar className="size-7" /> Schedule a call
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default MakeSchedule;
