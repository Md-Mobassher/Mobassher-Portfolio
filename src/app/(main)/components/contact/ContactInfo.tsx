import { FcManager } from "react-icons/fc";
import { GoLocation } from "react-icons/go";
import { HiOutlineMailOpen } from "react-icons/hi";
import { TbPhoneCall } from "react-icons/tb";

// Contact information data
const contactData = [
  {
    id: 1,
    icon: FcManager,
    title: "Name",
    value: "Md Mobassher Hossain",
    link: null,
  },
  {
    id: 2,
    icon: GoLocation,
    title: "Location",
    value: "Tograihat, Rajarhat, Kurigram, Bangladesh-5600.",
    link: null,
  },
  {
    id: 3,
    icon: TbPhoneCall,
    title: "Call / WhatsApp",
    value: "+88-01706060647",
    link: "tel:+8801706060647",
  },
  {
    id: 4,
    icon: HiOutlineMailOpen,
    title: "Email",
    value: "mdmobassherhossain1@gmail.com",
    link: "mailto:mdmobassherhossain1@gmail.com",
  },
];

const ContactInfo = () => {
  return (
    <div className="flex-1  lg:mb-10 mb-8 ">
      <h1 className="lg:text-3xl md:text-2xl text-xl font-semibold text-center">
        Contact{" "}
        <span className="text-primary lg:text-3xl md:text-2xl text-xl font-semibold">
          Info
        </span>
      </h1>
      <div className="max-w-sm mx-auto lg:mt-10 mt-6">
        {contactData.map((contact, index) => {
          const IconComponent = contact.icon;
          return (
            <div
              key={contact.id}
              className={`flex justify-start max-w-sm items-center ${
                index > 0 ? "mt-7" : ""
              }`}
            >
              <div>
                <IconComponent className="w-10 h-10 mr-6 text-primary" />
              </div>
              <div>
                <h2 className="font-bold text-primary">{contact.title}</h2>
                <h2 className="">
                  {contact.link ? (
                    <a
                      target="_blank"
                      href={contact.link}
                      className="hover:text-primary transition-colors"
                    >
                      {contact.value}
                    </a>
                  ) : (
                    contact.value
                  )}
                </h2>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContactInfo;
