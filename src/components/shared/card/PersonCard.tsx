import Image from "next/image";
import React from "react";

interface PersonCardProps {
  id: string;
  name: string;
  role: string;
  designation?: string;
  department?: string;
  companyName?: string;
  bio?: string;
  imageUrl?: string;
  layout?: "horizontal" | "vertical";
  onClick?: (person: any) => void;
}

const PersonCard: React.FC<PersonCardProps> = ({
  id,
  name,
  role,
  designation,
  department,
  companyName,
  bio,
  imageUrl,
  layout = "vertical",
  onClick,
}) => {
  return (
    <div
      className={`bg-white shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer group ${
        layout === "horizontal" ? "flex flex-col md:flex-row" : "flex flex-col"
      }`}
      onClick={onClick}
    >
      {/* Image Section */}
      <div
        className={`relative overflow-hidden border-2 border-gray-300 ${
          layout === "horizontal"
            ? "md:w-1/2 w-full h-full md:h-80"
            : "w-full h-64"
        }`}
      >
        <Image
          src={imageUrl || "/images/noimage.png"}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Content Section */}
      <div
        className={`flex flex-col justify-between p-2 md:p-3 lg:p-4 ${
          layout === "horizontal" ? "md:w-2/3 w-full" : "w-full"
        }`}
      >
        <div>
          {/* Name and Role */}
          <div className="mb-3">
            <h3 className="text-xl font-bold text-gray-800 mb-1">{name}</h3>
          </div>

          {/* Designation */}
          {designation && (
            <p className="text-gray-700 font-semibold text-sm mb-1">
              {designation}
            </p>
          )}

          {/* Department */}
          {department && (
            <p className="text-gray-600 text-sm mb-1">{department}</p>
          )}

          {/* Company Name */}
          {companyName && (
            <p className="text-gray-600 text-sm">{companyName}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonCard;
