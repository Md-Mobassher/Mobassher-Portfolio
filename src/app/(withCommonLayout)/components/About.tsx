import assets from "@/assets";
import Title from "@/components/ui/Title";
import Image from "next/image";
import AboutButton from "./AboutButton";

const About = () => {
  return (
    <div id="about" className="lg:mt-28 md:mt-20 mt-14">
      <div className="container">
        <Title title="About Me" />
        <div className="lg:flex sm:flex-row-reverse  md:flex  items-center justify-between">
          <div className="lg:max-w-[350px]  flex  justify-center lg:mt-0 mt-0">
            <Image
              className="w-[320px] rounded-xl transform scale-[0.95] filter grayscale hover:scale-[1] hover:grayscale-0 transition-all duration-1000 z-0"
              alt="profile"
              src={assets.image.mobassher}
            />
          </div>

          <div className="lg:max-w-[70%] md:max-w-[60%] md:mt-0 mt-2">
            <p className="lg:text-start md:text-start text-center">
              Hello! I&apos;m Md Mobassher Hossain, a passionate Full-stack
              developer. I develop web applications. My core skill is based on
              JavaScript and I love to do most of the things using JavaScript. I
              love to make the web more open to the world. I have graduated with
              a bachelor&apos;s degree in Textile Engineering from Primeasia
              University at Banani, Bangladesh in 2021. I am available for any
              kind of job opportunity that suits my interests.
            </p>
            <AboutButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
