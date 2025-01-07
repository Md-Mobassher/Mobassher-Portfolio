import Image from "next/image";
import BlogContent from "./BlogContent";
import ShareButton from "./ShareButton";
import { TBlog } from "@/type";

const BlogDetails = ({
  _id,
  author,
  blogStatus,
  category,
  comments,
  coverImage,
  content,
  title,
  createdAt,
  updatedAt,
}: TBlog) => {
  return (
    <div className=" rounded-lg shadow-lg py-4 md:py-6 lg:py-10">
      <div className="text-center">
        <h1 className="text-3xl lg:text-5xl font-bold mb-4">{title}</h1>
        <div className="text-sm text-gray-300 mb-6 flex lg:gap-5 md:gap-4 gap-3 justify-center lg:flex-row md:flex-row flex-col">
          <p>Author: {author?.name}</p>
          <p>Updated At: {new Date(updatedAt).toLocaleDateString()}</p>
        </div>
        <ShareButton title={title} />
      </div>
      <div className="my-8">
        <Image
          src={coverImage}
          alt={title}
          width={1280}
          height={500}
          className="rounded-lg mx-auto"
        />
      </div>
      <div className="lg:flex gap-10">
        <div className="lg:w-3/4 mx-auto w-full">
          {content && <BlogContent content={content} />}
        </div>
        {/* <div className="lg:w-1/4 border border-gray-700 p-4 rounded-lg ">
          <h2 className="text-xl font-semibold mb-4">Category</h2>
          <p className="mb-4">{category}</p>
          <h2 className="text-xl font-semibold mb-4">Recent Posts</h2>
  
          <ul>
            <li className="mb-2">
              <a href="#" className="text-blue-600 hover:underline">
                Post 1
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-blue-600 hover:underline">
                Post 2
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-blue-600 hover:underline">
                Post 3
              </a>
            </li>
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default BlogDetails;
