import Container from "@/components/layout/Container";
import Title from "@/components/layout/Title";
import skillsData from "@/data/skillsData.json";
import { TSkill } from "@/types";
import Skills from "./Skills";

const MySkills = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/skills`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 30,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch skills");
    }

    const { data: skills } = await res.json();
    // console.log(skills);

    return (
      <div id="myskills" className="lg:py-6 md:py-8 py-6 ">
        <Container>
          <Title title="My" titleColor="Skills" />
          <Skills skills={skillsData as TSkill[]} />
        </Container>
      </div>
    );
  } catch (error) {
    console.error(error);
    return (
      <div id="myskills" className="lg:py-10 md:py-8 py-6">
        <Container>
          <Title title="My" titleColor="Skills" />
          <Skills skills={skillsData as TSkill[]} />
        </Container>
      </div>
    );
  }
};

export default MySkills;
