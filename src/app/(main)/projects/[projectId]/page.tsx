import Container from "@/components/layout/Container";
import Title from "@/components/layout/Title";
import ProjectDetails from "../components/PtojectDetails";

type TProjectParams = {
  params: Promise<{
    projectId: string;
  }>;
};

const PortfolioDetailsPage = async ({ params }: TProjectParams) => {
  const { projectId } = await params;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/projects/${projectId}`,
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
      <div id="projects" className=" md:pt-28 pt-20">
        <Container>
          <Title title="Project" titleColor="Details" />
          <ProjectDetails {...data?.data} />
        </Container>
      </div>
    );
  } catch (error) {
    console.error("Error fetching projects:", error);
    return (
      <div id="projects" className=" md:pt-28 pt-20">
        <Container>
          <Title title="Project" titleColor="Details" />
          <p>Error loading projects.</p>
        </Container>
      </div>
    );
  }
};

export default PortfolioDetailsPage;
