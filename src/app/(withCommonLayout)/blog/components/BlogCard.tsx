import { TBlog } from "@/type";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BlogCardProps {
  blog: TBlog;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  const router = useRouter();
  const navigateToBlogDetail = (id: string) => {
    router.push(`/blog/${id}`);
  };

  return (
    <div className="border bg-gray-800 rounded-md border-gray-700">
      {blog.coverImage && (
        <Image
          src={blog?.coverImage}
          alt={blog.title}
          className="card-img-top border-b border-gray-700"
          width={600}
          height={300}
        />
      )}
      <div className="card-body p-4">
        <h5 className="card-title">{blog.title}</h5>
        <p className="card-text">{blog.content}</p>
        <div className="card-tags">
          {blog.tags.map((tag) => (
            <span key={tag} className="badge badge-primary mr-1">
              Tags: {tag}
            </span>
          ))}
        </div>
        <div className="card-author">
          <p>Author: {blog.author.name}</p>
        </div>
        <div>
          <button
            onClick={() => navigateToBlogDetail(blog._id)}
            className="bg-green-500 px-5 py-2 rounded-md mt-5"
          >
            Blog Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
