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
    <div className="border dark:bg-dark-secondary bg-light-background rounded-md shadow-lg max-w-md mx-auto">
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

        <div className="flex justify-between items-end mt-4">
          <Button
            title="Details"
            link={`/blogs/${blog?._id}`}
            className="py-2 bg-dark-primary px-4 hover:bg-green-600 text-white"
          />
          <ShareButton title={blog?.title} />
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
