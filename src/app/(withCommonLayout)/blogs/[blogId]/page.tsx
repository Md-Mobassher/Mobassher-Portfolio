import Container from "@/components/ui/Container";
import Title from "@/components/ui/Title";
import BlogDetails from "../components/BlogDetails";

type TBlogParams = {
  params: {
    blogId: string;
  };
};
const BlogDetailsPage = async ({ params }: TBlogParams) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/blogs/${params.blogId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch blog");
    }

    const data = await res.json();
    // console.log(data);

    return (
      <div id="blogDetails" className="lg:mt-28 md:mt-24 mt-20 ">
        <Container>
          <Title title="Blog Details" />
          <BlogDetails {...data?.data} />
        </Container>
      </div>
    );
  } catch (error) {
    console.error("Error fetching projects:", error);
    return (
      <div id="blogDetails" className=" lg:mt-28 md:mt-24 mt-20">
        <Container>
          <Title title="Blog Details" />
          <p>Error loading projects.</p>
        </Container>
      </div>
    );
  }
};

export default BlogDetailsPage;
