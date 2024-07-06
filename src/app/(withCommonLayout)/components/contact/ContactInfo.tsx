import { FcManager } from "react-icons/fc";
import { GoLocation } from "react-icons/go";
import { HiOutlineMailOpen } from "react-icons/hi";
import { TbPhoneCall } from "react-icons/tb";

const ContactInfo = () => {
  return (
    <div className="flex-1  lg:mb-10 mb-8 ">
      <h1 className="lg:text-3xl md:text-2xl text-xl font-semibold text-center">
        Contact <span className="text-green-500"> Info</span>
      </h1>
      <div className=" mx-auto lg:mt-10 mt-6">
        <div className="flex justify-start max-w-sm items-center ">
          <div>
            <FcManager className="w-10 h-10 mr-6 text-green-500"></FcManager>
          </div>
          <div>
            <h2 className="font-bold text-green-500">Name</h2>
            <h2 className="">Md Mobassher Hossain</h2>
          </div>
        </div>
        <div className="flex justify-start max-w-sm items-center mt-7">
          <div>
            <GoLocation className="w-10 h-10 mr-6  text-slate-300"></GoLocation>
          </div>
          <div>
            <h2 className="font-bold text-green-500 ">Location</h2>
            <h2 className="">
              Tograihat, Rajarhat, Kurigram, Bangladesh-5600.
            </h2>
          </div>
        </div>
        <div className="flex justify-start max-w-sm items-center mt-7">
          <div>
            <TbPhoneCall className="w-10 h-10 mr-6 text-slate-300"></TbPhoneCall>
          </div>
          <div>
            <h2 className="font-bold text-green-500">Call / WhatsApp</h2>
            <h2 className="">
              <a href="tell:+8801706060647" className=" ">
                +88-01706060647
              </a>
            </h2>
          </div>
        </div>
        <div className="flex justify-start max-w-sm items-center mt-7">
          <div>
            <HiOutlineMailOpen className="w-10 h-10 mr-6 text-slate-300"></HiOutlineMailOpen>
          </div>
          <div>
            <h2 className="font-bold text-green-500">Email</h2>
            <h2 className="">
              <a
                target="_black"
                href="mailto:mdmobassherhossain1@gmail.com"
                className=""
              >
                mdmobassherhossain1@gmail.com
              </a>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
