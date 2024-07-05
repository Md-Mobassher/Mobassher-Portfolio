import Container from "@/components/ui/Container";
import Title from "@/components/ui/Title";
import AllPortfolios from "./components/AllPortfolios";

const PortfoliosPage = async () => {
  const res = await fetch(` ${process.env.NEXT_PUBLIC_SERVER_URL}/projects`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "force-cache",
  });
  const projects = await res.json();
  console.log(projects);

  return (
    <div id="portfolios" className=" ">
      <Container>
        <Title title="Portfolios" />

        <AllPortfolios {...projects} />
      </Container>
    </div>
  );
};

export default PortfoliosPage;
