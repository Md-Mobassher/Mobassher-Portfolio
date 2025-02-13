import Container from "@/components/ui/Container";
import Title from "@/components/ui/Title";
import { TBlog } from "@/type";
import AllBlogs from "./components/AllBlogs";

const BlogsPage = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/blogs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch Blog");
    }

    const data = await res.json();
    // console.log(data);

    return (
      <div id="blog" className="md:pt-28 pt-20">
        <Container>
          <Title title="My Blogs" />
          <AllBlogs blogs={data?.data as TBlog[]} />
        </Container>
      </div>
    );
  } catch (error) {
    console.error(error);
    return (
      <div id="blog" className="md:pt-28 pt-20">
        <Container>
          <Title title="My Blogs" />
          <p>Error loading blogs. Please try again later.</p>
        </Container>
      </div>
    );
  }
};

export default BlogsPage;
