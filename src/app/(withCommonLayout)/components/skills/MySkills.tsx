import Container from "@/components/ui/Container";
import Title from "@/components/ui/Title";
import Skills from "./Skills";

export type TSkill = {
  _id: string;
  name: string;
  proficiencyLevel: string;
  category: string;
};

const MySkills = async () => {
  const res = await fetch(` ${process.env.NEXT_PUBLIC_SERVER_URL}/skills`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "force-cache",
  });
  const skills = await res.json();
  // console.log(skills?.data);

  return (
    <div id="myskills" className="lg:mt-28 md:mt-20 mt-14  min-h-20 ">
      <Container>
        <Title title="My Skills" />

        <Skills {...(skills as TSkill[])} />
      </Container>
    </div>
  );
};

export default MySkills;
