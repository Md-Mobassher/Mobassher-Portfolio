import Container from "@/components/ui/Container";
import Title from "@/components/ui/Title";
import AllPortfolios from "../components/AllPortfolios";
import PortfolioDetails from "../components/PortfolioDetails";

type TPortfolioParams = {
  params: {
    portfolioId: string;
  };
};

const PortfolioDetailsPage = async ({ params }: TPortfolioParams) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/projects/${params.portfolioId}`,
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
    console.log(data);

    return (
      <div id="portfolios" className=" ">
        <Container>
          <Title title="Portfolio Details" />
          <PortfolioDetails {...data?.data} />
        </Container>
      </div>
    );
  } catch (error) {
    console.error("Error fetching projects:", error);
    return (
      <div id="portfolios" className=" ">
        <Container>
          <Title title="All Portfolios" />
          <p>Error loading projects.</p>
        </Container>
      </div>
    );
  }
};

export default PortfolioDetailsPage;
