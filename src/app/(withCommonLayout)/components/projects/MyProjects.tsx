import Container from "@/components/ui/Container";
import Title from "@/components/ui/Title";
import Projects from "./Projects";
import Link from "next/link";

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
      <div id="projects" className=" lg:mt-28 md:mt-24 mt-20">
        <Container>
          <Title title="My Projects" />
          <Projects projects={projects} />
          <div className="mt-10 text-center">
            <Link href={"/projects"}>
              <button className="bg-[#00CF5D] hover:bg-green-500 rounded-md px-5 py-2">
                View All Projects
              </button>
            </Link>
          </div>
        </Container>
      </div>
    );
  } catch (error) {
    console.error("Error fetching projects:", error);
    return (
      <div id="projects" className=" ">
        <Container>
          <Title title="My Projects" />
          <p>Error loading Projects.</p>
        </Container>
      </div>
    );
  }
};

export default MyProjects;
