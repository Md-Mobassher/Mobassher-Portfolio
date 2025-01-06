import { socialData } from "../shared/Footer/SocialData";
import Image from "next/image";

const SocialIcon = () => {
  return (
    <div className="transition duration-100 ">
      <div className="flex flex-wrap mt-4 lg:gap-5 md:gap-4 gap-3">
        {socialData?.map((item) => (
          <a
            href={item?.link}
            key={item?.title}
            target={item.link.startsWith("http") ? "_blank" : ""}
            rel={item.link.startsWith("http") ? "noopener noreferrer" : ""}
          >
            <Image
              src={item?.image}
              alt={item?.title}
              className="object-cover filter grayscale transition duration-500 ease-in-out p-1 hover:grayscale-0"
              width={50}
              height={50}
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialIcon;
