import Container from "@/components/ui/Container";
import Title from "@/components/ui/Title";
import { TBlog } from "@/type";
import Blogs from "./Blogs";
import Button from "@/components/ui/Button";

const MyBlogs = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/blogs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 30,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch Blog");
    }

    const data = await res.json();
    // console.log(data);

    const blogs = Array.isArray(data?.data) ? data?.data : [];

    return (
      <div id="blog" className=" lg:py-14 md:py-10 py-7">
        <Container>
          <Title title="My Blog" />
          <Blogs blogs={blogs as TBlog[]} />
          <div className="mt-10 text-center">
            <Button clickEvent link="/blogs" title="View All Blogs" />
          </div>
        </Container>
      </div>
    );
  } catch (error) {
    console.error(error);
    return (
      <div id="blog" className="lg:py-14 md:py-10 py-7">
        <Container>
          <Title title="My Blog" />
          <p>Error loading blogs. Please try again later.</p>
        </Container>
      </div>
    );
  }
};

export default MyBlogs;
