import Container from "@/components/ui/Container";
import Title from "@/components/ui/Title";
import ProjectDetails from "../components/PtojectDetails";

type TProjectParams = {
  params: {
    projectId: string;
  };
};

const PortfolioDetailsPage = async ({ params }: TProjectParams) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/projects/${params.projectId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "force-cache",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch project");
    }

    const data = await res.json();
    // console.log(data);

    return (
      <div id="projects" className=" md:mt-28 mt-20">
        <Container>
          <Title title="Project Details" />
          <ProjectDetails {...data?.data} />
        </Container>
      </div>
    );
  } catch (error) {
    console.error("Error fetching projects:", error);
    return (
      <div id="projects" className=" md:mt-28 mt-20">
        <Container>
          <Title title="Project Details" />
          <p>Error loading projects.</p>
        </Container>
      </div>
    );
  }
};

export default PortfolioDetailsPage;
