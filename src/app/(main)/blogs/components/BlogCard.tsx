"use client";

import Button from "@/components/shared/button/Button";
import { TBlog } from "@/types";
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
    <div className="border bg-gray-200 dark:bg-gray-800 rounded-md shadow-md max-w-md mx-auto border-gray-300 dark:border-gray-700 shadow-primary/40 scale-100 hover:scale-105 transition-all duration-300">
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
        <h5 className=" text-lg font-semibold">{blog?.title}</h5>

        <div className="flex justify-between items-end mt-4">
          <Button
            clickEvent
            link={`/blogs/${blog?._id}`}
            title="Details"
            className="bg-primary text-white hover:bg-green-600 px-5 md:py-2 py-1.5 inline-block border border-primary  "
          />
          <ShareButton title={blog?.title} />
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
