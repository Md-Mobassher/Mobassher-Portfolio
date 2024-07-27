import assets from "@/assets";
import Title from "@/components/ui/Title";
import Image from "next/image";
import AboutButton from "./AboutButton";
import Container from "@/components/ui/Container";

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
              src={assets.image.mobassher}
            />
          </div>

          <div className="lg:max-w-[70%] md:max-w-[60%] md:mt-0 mt-2">
            <p className="lg:text-start md:text-start text-center">
              This is MD MOBASSHER HOSSAIN. A passionate Full-Stack Developer
              from Bangladesh. I have received my B.Sc. in Textile Engineering
              from Primeasia University (PAU) in 2021. After graduation, I
              pivoted my career towards programming, with a particular focus on
              web development.
            </p>
            <p className="mt-2 lg:text-start md:text-start text-center">
              To kickstart my journey, I enrolled in the Complete Web
              Development with Jhankar Mahbub (ID: WEB5-1490) course at
              Programming Hero. My dedication and hard work earned me the SCIC
              reward upon successfully completing the course. Seeking to deepen
              my expertise, I pursued advanced topics in MERN stack web
              development through the Next Level Web Development (ID: L2B2-0353)
              course at Programming Hero, where I excelled and secured a
              position among the top 100 students.
            </p>
            <p className="mt-2 lg:text-start md:text-start text-center">
              Currently, I am a skilled Full Stack Developer, known for
              delivering high-quality projects for my clients. My proficiency
              spans front-end and back-end development, allowing me to create
              seamless and dynamic web applications.
            </p>
            <AboutButton />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default About;
