import Container from "@/components/layout/Container";
import Title from "@/components/layout/Title";
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

    return (
      <div id="myskills" className="lg:py-14 md:py-10 py-7 min-h-20">
        <Container>
          <Title title="My Skills" />
          <Skills skills={skills as TSkill[]} />
        </Container>
      </div>
    );
  } catch (error) {
    console.error(error);
    return (
      <div id="myskills" className="lg:py-14 md:py-10 py-7 min-h-20">
        <Container>
          <Title title="My Skills" />
          <p>Error loading skills. Please try again later.</p>
        </Container>
      </div>
    );
  }
};

export default MySkills;
