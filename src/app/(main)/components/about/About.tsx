import Container from "@/components/layout/Container";
import Title from "@/components/layout/Title";
import Button from "@/components/shared/button/Button";
import workExperience from "@/data/workExperience.json";
import Link from "next/link";
import { MdMyLocation } from "react-icons/md";
import { PiDiamondsFourBold } from "react-icons/pi";

const About = () => {
  return (
    <div id="about" className="lg:py-10 md:py-8 py-6">
      <Container>
        <Title title="About" titleColor="Me" />

        <div className="flex lg:flex-row md:flex-col flex-col gap-8 md:gap-6 lg:gap-14 items-center mt-5">
          {/* Left Section - Personal Info and Bio */}
          <div className="lg:w-1/2  w-full">
            <div className="flex justify-between items-center gap-4 md:gap-10 ">
              <div>
                <h2 className="text-3xl font-bold dark:text-white mb-1">
                  Mobassher Hossain
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-400">
                  Full-Stack Developer
                </p>
              </div>
              <div className="text-center flex  items-center gap-5">
                <div className="text-6xl font-bold text-primary">2</div>
                <div className="text-lg text-gray-700 dark:text-gray-400 flex flex-col items-start gap-1">
                  <h3>Years</h3>
                  <p className="">Experience</p>
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-primary mt-4 mb-6"></div>

            <div className="space-y-4">
              <p className="dark:text-gray-400 text-gray-700 leading-relaxed text-lg">
                Hi there! I'm a Full Stack Developer with 2+ years of experience
                in building scalable, user-friendly, and visually engaging web
                applications. Passionate about solving problems with clean code
                and creative solutions, I strive to deliver excellence that
                keeps clients coming back. Let's create something amazing
                together!
              </p>
            </div>
            <div className="flex flex-start gap-5 justify-start items-center  mt-5">
              <Button
                clickEvent
                link="#myskills"
                title="My Skills"
                className="bg-primary text-white hover:bg-green-600 px-5 py-2 inline-block border border-primary"
              />
              <Link
                href="https://drive.google.com/file/d/1lrAMInBo2I610RC-oMsihi2_Tt2sZW7j/view"
                target="_blank"
                className="bg-gray-200/60 dark:bg-gray-600/60  text-primary dark:text-white hover:bg-primary dark:hover:bg-primary hover:text-white px-5 py-2 rounded-md border border-primary flex items-center gap-2 transition-all duration-300"
              >
                Resume
              </Link>
            </div>
          </div>

          {/* Middle Section - 3D Illustration */}
          {/* <div className="lg:col-span-1 md:col-span-1 flex justify-center">
            <div className="relative w-64 h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center shadow-lg">
              <div className="text-center text-gray-500">
                <div className="text-6xl mb-2">👨‍💻</div>
                <p className="text-sm">3D Illustration</p>
                <p className="text-xs">Placeholder</p>
              </div>
            </div>
          </div> */}

          {/* Right Section - Work Experience Timeline */}
          <div className="lg:w-1/2  w-full md:mt-0 mt-5">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute lg:left-5 left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-primary/20 rounded-full h-full"></div>

              <div className="space-y-4">
                {workExperience.map((job, index) => (
                  <div key={job.id} className="relative flex items-start">
                    {/* Timeline node */}
                    <div className="absolute lg:left-5.5 left-0.5 w-3 h-3 bg-primary rounded-full -translate-x-1/2 mt-2"></div>

                    <div className="lg:ml-14  ml-6 flex  justify-between lg:items-center md:items-center items-start w-full border-b border-primary border-dashed  md:pb-2 pb-3">
                      <div className="w-full flex flex-col gap-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold dark:text-white md:text-xl text-lg">
                            {job.jobTitle},{" "}
                            <span className="dark:text-gray-300 text-gray-700 text-lg">
                              {job.jobType}
                            </span>
                          </h3>
                        </div>
                        <div className="flex justify-between items-center w-full">
                          <div className="flex flex-col ">
                            <div className="flex items-center gap-2">
                              <span className="text-gray-400">
                                <PiDiamondsFourBold />
                              </span>
                              <span className="dark:text-gray-400 text-gray-700 text-lg">
                                {job.company}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-gray-400">
                                {" "}
                                <MdMyLocation />
                              </span>
                              <span className="dark:text-gray-400 text-gray-700 text-lg">
                                {job.location}
                              </span>
                            </div>
                          </div>
                          <div
                            className={`px-3 py-1  text-lg rounded-md font-medium ${job.isCurrent ? "bg-primary text-white" : "border border-primary"}`}
                          >
                            {job.duration}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default About;
