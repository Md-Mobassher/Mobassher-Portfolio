import { TBlog } from "@/type";
import BlogCard from "../../blog/components/BlogCard";

interface BlogsProps {
  blogs: TBlog[];
}

const Blogs = ({ blogs }: BlogsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 md:gap-7 gap-6">
      {blogs?.slice(0, 3).map((blog) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </div>
  );
};

export default Blogs;
