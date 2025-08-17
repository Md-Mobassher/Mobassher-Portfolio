import Container from "@/components/layout/Container";
import Title from "@/components/layout/Title";
import Button from "@/components/shared/button/Button";
import Projects from "./Projects";

const MyProjects = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/projects`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 30,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch projects");
    }

    const data = await res.json();
    // console.log(data);

    // Ensure the fetched data is an array
    const projects = Array.isArray(data?.data) ? data?.data : [];

    return (
      <div id="projects" className=" lg:py-14 md:py-10 py-7">
        <Container>
          <Title title="My" titleColor="Projects" />
          <Projects projects={projects} />
          <div className="mt-10 text-center">
            <Button
              clickEvent
              link="/projects"
              title="View All Projects"
              className="bg-primary text-white hover:bg-green-600 px-5 py-2 inline-block border border-primary  "
            />
          </div>
        </Container>
      </div>
    );
  } catch (error) {
    console.error("Error fetching projects:", error);
    return (
      <div id="projects" className=" lg:py-14 md:py-10 py-7">
        <Container>
          <Title title="My" titleColor="Projects" />
          <p>Error loading Projects.</p>
        </Container>
      </div>
    );
  }
};

export default MyProjects;
