import assets from "@/assets";
import { TPortfolio } from "@/type";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaGithub, FaShareSquare } from "react-icons/fa";

const PortfolioCard = ({ project }: { project: TPortfolio }) => {
  const {
    image,
    name,
    liveUrl,
    clientUrl,
    serverUrl,
    technology,
    description,
  } = project;
  const router = useRouter();

  const navigateToProjectDetail = (id: string) => {
    router.push(`/portfolios/${id}`);
  };

  return (
    <div className="card bg-slate-800 rounded-md  max-w-sm mx-auto shadow-2xl">
      <div className="h-44 ">
        <figure className="h-full">
          {image.cover ? (
            <Image
              className="w-full h-full object-cover object-center rounded-t-md "
              src={image?.cover}
              alt={name}
              width={350}
              height={250}
            />
          ) : (
            <Image
              className="w-full h-full object-cover object-center rounded-t-md "
              src={assets.image.noImage}
              alt={name}
              width={350}
              height={250}
            />
          )}
        </figure>
      </div>

      <div className="card-body px-5 pt-5 pb-6 justify-between items-between">
        <div className="">
          <h2 className=" mb-1 text-xl font-bold ">{name}</h2>
          <p className="text-justify text-sm mt-2 text-gray-300">
            {description[0]}
          </p>
        </div>

        <div className="">
          <div className="flex justify-between items-center  mt-3">
            <div className="flex gap-3 ">
              {clientUrl && (
                <div className="group  relative">
                  <a target="_blank" href={clientUrl}>
                    <FaGithub className="size-6  hover:text-green-500  transition duration-400"></FaGithub>
                    <div className="absolute bottom-7 left-20 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-[#00CF5D] hover:bg-green-500 text-white text-center p-1 w-36 rounded-sm  transition-opacity duration-300 ">
                      Client Site Code
                    </div>
                  </a>
                </div>
              )}

              {serverUrl && (
                <div className="group  relative">
                  <a target="_blank" href={serverUrl}>
                    <FaGithub className="size-6  hover:text-green-500 transition duration-400"></FaGithub>
                    <div className="absolute bottom-7 left-20 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-[#00CF5D] hover:bg-green-500 text-white text-center p-1 w-36 rounded-sm  transition-opacity duration-300">
                      Server Site Code
                    </div>
                  </a>
                </div>
              )}

              {liveUrl && (
                <div className="group  relative">
                  <a target="_blank" href={liveUrl}>
                    <FaShareSquare className="size-6  hover:text-green-500 transition duration-400"></FaShareSquare>
                    <div className="absolute bottom-7 left-12 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-[#00CF5D] hover:bg-green-500 text-white text-center p-1 w-20 rounded-sm  transition-opacity duration-300">
                      Live Site
                    </div>
                  </a>
                </div>
              )}
            </div>
            <div
              onClick={() => navigateToProjectDetail(project._id)}
              className="border-green-500 border px-2 rounded-sm transition text-md font-bold hover:text-white hover:bg-[#00CF5D]   duration-300 cursor-pointer"
            >
              Details
            </div>
          </div>

          <div className="pt-4">
            <div className="text-sm text-slate-300 flex flex-wrap justify-start items-center gap-1">
              {technology.map((item, index) => (
                <span key={index} className="">
                  {item},
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
