import Title from "@/components/ui/Title";
import Image from "next/image";
import AboutButton from "./AboutButton";
import Container from "@/components/ui/Container";
import mobassher from "@/assets/images/mobassher.png";

const About = () => {
  return (
    <div id="about" className="lg:mt-28 md:mt-20 mt-14">
      <Container>
        <Title title="About Me" />
        <div className="lg:flex sm:flex-row-reverse  md:flex  items-center justify-between">
          <div className="lg:max-w-[350px]  flex  justify-center lg:mt-0 mt-0">
            <Image
              className=" rounded-xl transform scale-[0.95] filter grayscale hover:scale-[1] hover:grayscale-0 transition-all duration-1000 z-0"
              alt="profile"
              src={mobassher}
            />
          </div>

          <div className="lg:max-w-[70%] md:max-w-[60%] md:mt-0 mt-2">
            <p className="lg:text-start md:text-start text-center">
              I am a passionate Full-Stack Developer currently working remotely
              at Dev Cluster, based in Dhaka, Bangladesh. With expertise in
              modern web technologies like React, Next.js, Node.js, and
              TypeScript, I specialize in building dynamic and efficient web
              applications. My portfolio features diverse projects that
              highlight my ability to deliver innovative and scalable solutions.
            </p>
            <p className="mt-2 lg:text-start md:text-start text-center">
              Dedicated to continuous learning and problem-solving, I thrive in
              collaborative environments where I can contribute to creating
              exceptional digital experiences. Let’s connect and bring your
              ideas to life!
            </p>

            <AboutButton />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default About;
