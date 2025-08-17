import { TProject } from "@/types";
import { MoveRight } from "lucide-react";
import Image from "next/image";

const ProjectDetails = (project: TProject) => {
  const {
    name,
    type,
    description,
    image,
    technology,
    liveUrl,
    clientUrl,
    serverUrl,
  } = project as TProject;

  return (
    <div>
      <div className="bg-gray-200 dark:bg-gray-800 border rounded-lg mt-1 z-0">
        <div className="items-center justify-start  lg:py-10 p-5 lg:px-20 ">
          {name && (
            <div className="flex items-center">
              <p className="mb-3 font-bold  lg:text-2xl md:text-2xl text-xl ">
                Name:
                <span className=" ml-2 font-bold text-primary lg:text-2xl md:text-2xl text-xl ">
                  {name}
                </span>
              </p>
            </div>
          )}
          {type && (
            <div className="flex">
              <p className="mb-3 font-bold lg:text-2xl md:text-2xl text-xl ">
                Type:
                <span className=" ml-2 font-semibold lg:text-xl">{type}</span>
              </p>
            </div>
          )}

          {description.length > 0 && (
            <div className="">
              <p className="mb-3 font-bold lg:text-2xl md:text-2xl text-xl ">
                Details:
              </p>
              <div className="mb-3 lg:ml-10 md:ml-5">
                {description.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-start items-start gap-3 mb-2"
                  >
                    <div className="flex justify-center items-start">
                      <MoveRight className="size-7 text-[#00CF5D]" />
                    </div>
                    <div>{item}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {technology.length > 0 && (
            <div className="lg:my-10 my-5">
              <p className=" font-bold lg:text-2xl md:text-2xl text-xl  mb-3 ">
                Technology:{" "}
              </p>
              <div className="font-semibold lg:text-md grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2  gap-1">
                {technology.map((tech, index) => (
                  <div key={index}>
                    <div className="flex justify-start lg:gap-4 md:gap-4 gap-3 items-start lg:ml-10 md:ml-5">
                      <MoveRight className="size-7 text-[#00CF5D]" />{" "}
                      <p className="text-md ">{tech}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {liveUrl && (
            <div className="flex justify-between items-center max-w-sm mb-5">
              <p className="font-bold md:text-xl text-lg">Go to Live site - </p>{" "}
              <a
                target="_black"
                href={liveUrl}
                className="bg-primary hover:bg-green-600 rounded-md px-5 md:py-2 py-1.5 transition duration-300  text-md text-white font-semibold"
              >
                Click here{" "}
              </a>
            </div>
          )}
          {clientUrl && (
            <div className="flex justify-between items-center max-w-sm mb-5">
              <p className=" font-bold  md:text-xl text-lg">
                Client-Side code -{" "}
              </p>
              <a
                target="_black"
                href={clientUrl}
                className="bg-primary hover:bg-green-600 rounded-md px-5 md:py-2 py-1.5 transition duration-300  text-md text-white font-semibold"
              >
                Click here{" "}
              </a>
            </div>
          )}
          {serverUrl && (
            <div className="flex justify-between items-center max-w-sm">
              <p className=" font-bold  md:text-xl text-lg">
                Server-Side code -{" "}
              </p>{" "}
              <a
                target="_black"
                href={serverUrl}
                className="bg-primary hover:bg-green-600 rounded-md px-5 md:py-2 py-1.5 transition duration-300  text-md text-white font-semibold"
              >
                Click here{" "}
              </a>
            </div>
          )}
        </div>
      </div>

      <div>
        {image.landing && (
          <Image src={image?.landing} alt={name} width={600} height={500} />
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;
