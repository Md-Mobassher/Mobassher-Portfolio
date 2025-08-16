import Image from "next/image";
import Link from "next/link";
import HtmlViewer from "../common/HtmlViewer";

interface NewsCardProps {
  id?: string;
  imageUrl: string;
  title: string;
  author: string;
  date: string;
  layout?: "horizontal" | "vertical";
  fileUrl?: string;
  details?: string;
  singleMode?: boolean;
  showDetails?: boolean;
}

const NewsCard = ({
  id,
  imageUrl,
  title,
  author,
  date,
  layout = "horizontal",
  fileUrl = "",
  details = "",
  singleMode = false,
  showDetails = false,
}: NewsCardProps) => {
  return (
    <Link
      href={`/publications/${id}`}
      className={`group ${
        layout === "horizontal"
          ? "flex md:flex-row flex-col border-b border-gray-300 last:border-0  items-center"
          : "flex flex-grow flex-col border rounded border-gray-300 p-2 md:p-3 lg:p-4"
      } py-4 `}
    >
      <div
        className={`${
          layout === "horizontal"
            ? `lg:w-1/3 md:w-1/3 w-full flex-shrink-0  ${
                singleMode
                  ? "shadow-none h-full md:mr-2 mr-0"
                  : "shadow min-h-20 h-full md:mr-4 mr-0"
              }`
            : "w-full h-full md:h-40 lg:h-44 mr-4"
        } `}
      >
        <Image
          src={imageUrl}
          alt={title}
          width={128}
          height={96}
          className={` ${
            layout === "horizontal"
              ? "w-full h-full object-cover"
              : "w-full h-full object-cover "
          }`}
        />
      </div>
      <div
        className={`flex flex-col  ${
          layout === "horizontal"
            ? `justify-start md:items-start items-center md:mt-0 mt-4 ${singleMode ? "gap-0.5" : "md:gap-2 gap-1 "}`
            : `justify-center items-start mt-4 md:mt-5 ${singleMode ? "gap-0.5" : "md:gap-2 gap-1 "}`
        }  
        `}
      >
        <h3
          className={`text-gray-800 group-hover:text-primary font-semibold  ${
            layout === "horizontal"
              ? `md:text-start text-center ${singleMode ? "text-sm" : "text-md md:text-lg lg:text-xl"} `
              : "md:text-lg text-md text-start"
          }`}
        >
          {title}
        </h3>
        <p
          className={`text-sm text-gray-500 group-hover:text-gray-800 ${
            layout === "horizontal" ? "md:text-start text-center" : "text-start"
          }`}
        >
          {author} | {date}
        </p>
        {showDetails && (
          <div className="text-sm text-gray-500 group-hover:text-gray-800 flex flex-wrap gap-2">
            <HtmlViewer html={details?.slice(0, 250)} allowScripts={true} />
            <span className="text-gray-500 group-hover:text-primary cursor-pointer">
              Read More
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default NewsCard;
