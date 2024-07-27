import Container from "@/components/ui/Container";
import Title from "@/components/ui/Title";
import Portfolios from "./Portfolios";
import Link from "next/link";

const MyPortfolios = async () => {
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
      throw new Error("Failed to fetch portfolios");
    }

    const data = await res.json();
    // console.log(data);

    // Ensure the fetched data is an array
    const projects = Array.isArray(data?.data) ? data?.data : [];

    return (
      <div id="portfolios" className=" lg:mt-28 md:mt-24 mt-20">
        <Container>
          <Title title="My Portfolios" />
          <Portfolios portfolios={projects} />
          <div className="mt-10 text-center">
            <Link href={"/portfolios"}>
              <button className="bg-[#00CF5D] hover:bg-green-500 rounded-md px-5 py-2">
                View All Portfolios
              </button>
            </Link>
          </div>
        </Container>
      </div>
    );
  } catch (error) {
    console.error("Error fetching projects:", error);
    return (
      <div id="portfolios" className=" ">
        <Container>
          <Title title="My Portfolios" />
          <p>Error loading portfolios.</p>
        </Container>
      </div>
    );
  }
};

export default MyPortfolios;
