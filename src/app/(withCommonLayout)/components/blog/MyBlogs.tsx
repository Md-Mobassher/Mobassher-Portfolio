import Container from "@/components/ui/Container";
import Title from "@/components/ui/Title";
import { TBlog } from "@/type";
import Blogs from "./Blogs";
import Link from "next/link";

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
      <div id="blog" className=" lg:mt-28 md:mt-24 mt-20">
        <Container>
          <Title title="My Blog" />
          <Blogs blogs={blogs as TBlog[]} />
          <div className="mt-10 text-center">
            <Link href={"/blog"}>
              <button className="bg-green-500 rounded-md px-5 py-2">
                View All Blog
              </button>
            </Link>
          </div>
        </Container>
      </div>
    );
  } catch (error) {
    console.error(error);
    return (
      <div id="blog" className="">
        <Container>
          <Title title="My Blog" />
          <p>Error loading blogs. Please try again later.</p>
        </Container>
      </div>
    );
  }
};

export default MyBlogs;
