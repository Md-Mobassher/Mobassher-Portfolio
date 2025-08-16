import Image from "next/image";
import HtmlViewer from "../common/HtmlViewer";
import { ReusableModal } from "./ReusableModal";

const PersonDetailsModal = ({
  open,
  onClose,
  title,
  person,
  loading = false,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  person?: any;
  loading?: boolean;
}) => {
  return (
    <ReusableModal
      open={open}
      onClose={onClose}
      onConfirm={() => {}}
      size="3xl"
      loading={loading}
      showCloseButton={true}
      hideFooter
      title={title}
    >
      <div className="space-y-6 w-full h-full group ">
        {/* Image and Basic Info */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
          {/* Image */}
          <div className="relative w-full md:max-w-1/2 h-full md:h-80 border-2 border-gray-300 flex justify-center items-center overflow-hidden">
            <Image
              src={person?.imageUrl || "/images/noimage.png"}
              alt={person?.name || "person image"}
              fill
              className="object-cover transition-transform duration-300 ease-in-out hover:scale-110"
              sizes="(max-width: 500px) 100vw, 33vw"
              priority
            />
          </div>

          {/* Basic Info */}
          <div className="flex-1 space-y-3">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {person?.name}
              </h2>
            </div>

            {/* Designation */}
            {person?.designation && (
              <div className="flex gap-2 justify-start items-center">
                <p className="text-gray-600 text-lg font-semibold">
                  {person?.designation}
                </p>
              </div>
            )}

            {/* Department */}
            {person?.department && (
              <div className="flex gap-2 justify-start items-center">
                <p className="text-gray-600">{person?.department}</p>
              </div>
            )}

            {/* Company */}
            {person?.companyName && (
              <div className="flex gap-2 justify-start items-center">
                <p className="text-gray-600">{person?.companyName}</p>
              </div>
            )}
          </div>
        </div>

        {/* Bio */}
        {person?.bio && (
          <div>
            <h3 className="text-gray-700 font-semibold text-xl text-center mt-3 mb-2">
              Biography
            </h3>
            <div className="">
              <HtmlViewer html={person?.bio} style={{ fontFamily: "arial" }} />
            </div>
          </div>
        )}
      </div>
    </ReusableModal>
  );
};

export default PersonDetailsModal;
