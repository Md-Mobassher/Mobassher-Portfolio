"use client";

import { ChangeEvent, useState } from "react";
import BlogCard from "./BlogCard";
import { TBlog } from "@/type";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface AllBlogsProps {
  blogs: TBlog[];
}

const AllBlogs = ({ blogs }: AllBlogsProps) => {
  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined
  >();
  const [search, setSearch] = useState<string>("");

  const getFilteredBlogs = () => {
    let blog;

    if (!selectedCategory) {
      blog = blogs;
    }
    if (!search) {
      blog = blogs;
    }

    if (selectedCategory) {
      blog = blogs.filter((item: TBlog) =>
        item.category.includes(selectedCategory)
      );
    }
    if (search) {
      blog = blogs?.filter((item: TBlog) =>
        item?.title?.toLowerCase().includes(search.toLowerCase())
      );
    }

    return blog;
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const uniqueCategories = Array.from(
    new Set(blogs.map((blog) => blog.category))
  );

  return (
    <div className="min-h-[300px]">
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setSelectedCategory(undefined)}
            className="border border-green-500 text-md py-2 bg-green-500 hover:bg-green-700 text-white rounded-md transition duration-500 lg:px-6 md:px-5 px-3 uppercase cursor-pointer"
          >
            All
          </button>
          <Select onValueChange={setSelectedCategory} defaultValue="">
            <SelectTrigger className="lg:w-[180px] md:w-[170px] w-[140px] py-3  text-md hover:bg-green-500 bg-white text-green-600 border-green-500 hover:text-white rounded-md transition duration-500 lg:px-6 md:px-5 pl-3 pr-1  cursor-pointer text-center">
              <SelectValue className="" placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="w-[200px]">
              <SelectGroup>
                {uniqueCategories?.map((cat) => (
                  <SelectItem
                    key={cat}
                    value={cat}
                    className="py-2 m-0 text-md hover:bg-green-500 bg-white text-green-600 hover:text-white rounded-md transition duration-300 lg:px-6 md:px-5 pl-4  cursor-pointer"
                  >
                    {cat}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="hidden md:flex">
          <h4 className="text-lg font-semibold">
            Total:{" "}
            <span className="text-green-500 px-1">
              {getFilteredBlogs()?.length || 0}
            </span>{" "}
            Blog Found
          </h4>
        </div>

        {/* Search */}
        <div className="lg:w-[180px] md:w-[170px] w-[120px] ">
          <Input
            type="text"
            className="border-green-500 text-center text-black"
            onChange={handleInputChange}
            placeholder="Search Blog"
          />
        </div>
      </div>

      <div className="flex md:hidden justify-center mb-5">
        <h4 className="text-md font-semibold">
          Total:{" "}
          <span className="text-cyan-500 px-1">
            {getFilteredBlogs()?.length || 0}
          </span>{" "}
          Blog Found
        </h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 md:gap-7 gap-6">
        {getFilteredBlogs()?.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default AllBlogs;
