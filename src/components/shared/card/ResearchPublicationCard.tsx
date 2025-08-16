import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ResearchCardProps {
  id: string;
  imageUrl: string;
  title: string;
  author?: any;
  date?: string;
  className?: string;
  fileUrl?: string;
  isResearch?: boolean;
}

const ResearchPublicationCard: React.FC<ResearchCardProps> = ({
  id,
  imageUrl,
  title,
  author,
  date,
  className = "",
  fileUrl,
  isResearch = false,
}) => {
  return (
    <Link
      href={`${isResearch ? "/research" : "/publications"}/${id}`}
      className="w-full"
    >
      <div
        className={`flex flex-col border rounded-lg border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden ${className}`}
      >
        {/* Image Container */}
        <div className="w-full max-w-[400px] min-h-[350px] h-full relative overflow-hidden p-3 md:p-4">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-contain w-full h-full"
            sizes="(max-width: 500px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Content Container */}
        <div className="flex flex-col p-3 md:p-3 flex-grow">
          {/* Title */}
          <h3 className="text-gray-800 hover:text-primary font-semibold text-sm md:text-base lg:text-md line-clamp-3 mb-2 md:mb-3">
            {title}
          </h3>

          {/* Author */}
          <p className="text-sm text-gray-600 font-medium mb-1">{author}</p>

          {/* Date */}
          <p className="text-xs md:text-sm text-gray-600 mt-auto">{date}</p>
        </div>
      </div>
    </Link>
  );
};

export default ResearchPublicationCard;
