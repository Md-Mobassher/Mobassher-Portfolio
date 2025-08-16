"use client";
import NewsCard from "@/components/shared/card/NewsCard";
import CardSubtitle from "@/components/shared/title/CardSubtitle";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllPublicationsQuery } from "@/redux/features/admin/publicationApi";
import { dateFormatter } from "@/utils/dateFormatter";
import { useMemo } from "react";
import NotFound from "./NotFound";

interface RelatedPostProps {
  title?: string;
  posts?: Array<{
    id: string;
    imageUrl: string;
    title: string;
    author: string;
    date: string;
    link?: string;
  }>;
  showTitle?: boolean;
}

const RelatedPost = ({
  title = "Related Posts",
  posts,
  showTitle = true,
}: RelatedPostProps) => {
  const query = useMemo(
    () => ({
      page: 1,
      limit: 10,
      sortBy: "publishDate",
      sortOrder: "desc",
      type: "COMMENTARY",
    }),
    []
  );

  const { data: defaultPosts, isLoading } = useGetAllPublicationsQuery(query, {
    refetchOnMountOrArgChange: true,
  });

  const displayPosts = posts || defaultPosts?.data;

  return (
    <div className="bg-white rounded-lg border border-gray-300 md:p-5 p-4">
      {showTitle && <CardSubtitle title={title} />}
      <div className="flex flex-col gap-2">
        {isLoading ? (
          <Skeleton />
        ) : displayPosts?.length > 0 ? (
          displayPosts?.map((post: any) => {
            const formattedDate = dateFormatter(
              post?.publishDate || post?.createdAt
            );
            return (
              <NewsCard
                key={post.id}
                id={post.id}
                imageUrl={post.imageUrl}
                title={post.title}
                author={post.author?.name || ""}
                date={formattedDate}
                fileUrl={post.fileUrl}
                singleMode
              />
            );
          })
        ) : (
          <NotFound message="No related posts found" />
        )}
      </div>
    </div>
  );
};

export default RelatedPost;
