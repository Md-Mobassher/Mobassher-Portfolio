import Button from "@/components/shared/button/Button";
import HtmlViewer from "@/components/shared/common/HtmlViewer";
import { TBlog } from "@/types";
import Image from "next/image";
import ShareButton from "./ShareButton";

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
    <div className="">
      <div className="text-center">
        <h1 className="text-2xl lg:text-4xl md:text-3xl font-bold mb-4">
          {title}
        </h1>
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
          {content && <HtmlViewer html={content} />}
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

      <div className="mt-10 text-center">
        <Button
          clickEvent
          link="/blogs"
          title="View All Blogs"
          className="bg-primary text-white hover:bg-green-600 px-5 py-2 inline-block border border-primary  "
        />
      </div>
    </div>
  );
};

export default BlogDetails;
