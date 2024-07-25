import React from "react";

type BlogContentProps = {
  content: string;
};

const BlogContent: React.FC<BlogContentProps> = ({ content }) => {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};

export default BlogContent;
