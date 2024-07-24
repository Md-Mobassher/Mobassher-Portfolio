import Container from "@/components/ui/Container";
import Title from "@/components/ui/Title";
import AllPortfolios from "./components/AllPortfolios";

const PortfoliosPage = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/projects`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch portfolios");
    }

    const data = await res.json();
    // console.log(data);

    // Ensure the fetched data is an array
    const projects = Array.isArray(data?.data) ? data?.data : [];

    return (
      <div id="portfolios" className=" ">
        <Container>
          <Title title="All Portfolios" />
          <AllPortfolios portfolios={projects} />
        </Container>
      </div>
    );
  } catch (error) {
    console.error("Error fetching portfolios:", error);
    return (
      <div id="portfolios" className=" ">
        <Container>
          <Title title="All Portfolios" />
          <p>Error loading portfolios.</p>
        </Container>
      </div>
    );
  }
};

export default PortfoliosPage;
