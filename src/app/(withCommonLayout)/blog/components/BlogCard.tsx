"use client";

import { TBlog } from "@/type";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ShareButton from "./ShareButton";

interface BlogCardProps {
  blog: TBlog;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  const router = useRouter();
  const navigateToBlogDetail = (id: string) => {
    router.push(`/blog/${id}`);
  };

  return (
    <div className="border bg-gray-800 rounded-md border-gray-700 max-w-sm mx-auto">
      <div className="h-48 ">
        <figure className="h-full">
          {blog?.coverImage ? (
            <Image
              className="w-full h-full object-fill object-center rounded-t-md "
              src={blog?.coverImage}
              alt={blog?.title}
              width={600}
              height={300}
            />
          ) : (
            <Image
              className="w-full h-full object-fill object-center rounded-t-md "
              src={blog?.coverImage}
              alt={blog?.title}
              width={600}
              height={300}
            />
          )}
        </figure>
      </div>

      <div className="card-body p-4">
        <h5 className=" text-xl font-bold">{blog?.title}</h5>

        <div className="flex justify-between items-end mt-auto">
          <button
            onClick={() => navigateToBlogDetail(blog?._id)}
            className="bg-[#00CF5D] hover:bg-green-500 px-5 py-2 rounded-md mt-5"
          >
            Details
          </button>
          <ShareButton title={blog?.title} />
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
