import { TPortfolio } from "@/type";
import { MoveRight } from "lucide-react";
import Image from "next/image";

const PortfolioDetails = (project: TPortfolio) => {
  const {
    name,
    type,
    description,
    image,
    technology,
    liveUrl,
    clientUrl,
    serverUrl,
  } = project as TPortfolio;

  return (
    <div>
      <div className=" bg-gray-800 border-gray-700 border rounded-lg mt-1 z-0">
        <div className="items-center justify-start  lg:py-10 p-5 lg:px-20 ">
          {name && (
            <div className="flex lg:text-2xl">
              <p className="mb-3 font-bold ">
                Name:
                <span className=" ml-2 font-bold text-green-500">{name}</span>
              </p>
            </div>
          )}
          {type && (
            <div className="flex">
              <p className="mb-3 font-bold lg:text-xl">
                Type:
                <span className=" ml-2 font-semibold lg:text-xl">{type}</span>
              </p>
            </div>
          )}
          {description.length > 0 && (
            <div className="">
              <p className="mb-3 font-bold lg:text-xl ">Details:</p>
              <div className="mb-3 lg:ml-10 md:ml-5">
                {description.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-start items-start gap-3 mb-2"
                  >
                    <div className="flex justify-center items-start">
                      <MoveRight className="size-7 text-[#02CF5F]" />
                    </div>
                    <div>{item}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {technology.length > 0 && (
            <div className=" mt-8 pb-3">
              <p className=" font-bold lg:text-xl mb-3 ">Technology: </p>
              <div className="font-semibold lg:text-lg ">
                {technology.map((tech, index) => (
                  <div key={index}>
                    <div className="flex justify-start gap-4 items-start lg:ml-10 md:ml-5 mb-1">
                      <MoveRight className="size-7 text-[#02CF5F]" />{" "}
                      <div className="text-md ">{tech}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {liveUrl && (
            <p className="mb-8 mt-5 font-bold  lg:text-xl">
              Go to Live site -{" "}
              <a
                target="_black"
                href={liveUrl}
                className="bg-green-500 rounded-md px-5 py-3 hover:bg-green-400 transition duration-500 ml-auto text-md text-white"
              >
                Click here{" "}
              </a>
            </p>
          )}
          {clientUrl && (
            <p className="mb-8 mt-5 font-bold  lg:text-xl">
              Client-Side code -{" "}
              <a
                target="_black"
                href={clientUrl}
                className="bg-green-500 rounded-md px-5 py-3 hover:bg-green-400 transition duration-500 ml-auto text-md text-white"
              >
                Click here{" "}
              </a>
            </p>
          )}
          {serverUrl && (
            <p className="mb-3 mt-5 font-bold  lg:text-xl">
              Server-Side code -{" "}
              <a
                target="_black"
                href={serverUrl}
                className="bg-green-500 rounded-md px-5 py-3 hover:bg-green-400 transition duration-500 ml-auto text-md text-white"
              >
                Click here{" "}
              </a>
            </p>
          )}
        </div>
      </div>

      <div>{image.landing && <Image src={image?.landing} alt={name} />}</div>
    </div>
  );
};

export default PortfolioDetails;
