import Container from "@/components/ui/Container";
import Title from "@/components/ui/Title";
import AllProjects from "./components/AllProjects";

const ProjectsPage = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/projects`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch projects");
    }

    const data = await res.json();
    // console.log(data);

    // Ensure the fetched data is an array
    const projects = Array.isArray(data?.data) ? data?.data : [];

    return (
      <div id="projects" className=" md:pt-28 pt-20">
        <Container>
          <Title title="All Projects" />
          <AllProjects projects={projects} />
        </Container>
      </div>
    );
  } catch (error) {
    console.error("Error fetching projects:", error);
    return (
      <div id="projects" className=" md:pt-28 pt-20">
        <Container>
          <Title title="All Projects" />
          <p>Error loading projects.</p>
        </Container>
      </div>
    );
  }
};

export default ProjectsPage;
