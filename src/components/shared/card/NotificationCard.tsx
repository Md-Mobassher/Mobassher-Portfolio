"use client";
import { format } from "date-fns";
import { ChevronRight, Trash2 } from "lucide-react";
import React from "react";

interface NotificationCardProps {
  title: string;
  message: string;
  date: string;
  type: string;
  isRead: boolean;
  onDelete: () => void;
  onView: () => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  title,
  message,
  date,
  type,
  isRead,
  onDelete,
  onView,
}) => {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onView();
      }}
      className={` ${isRead ? "border-[#B3D6F6] border-none" : "border-[#F36B7F] border-2"} rounded-xl shadow-md p-4 flex flex-col min-w-0 cursor-pointer relative bg-white`}
    >
      <div className={` font-bold text-base mb-1 flex justify-between gap-1`}>
        {/* <p className="text-[15px]">{title}</p> */}
      </div>
      <div className="text-[#222] text-[15px] py-2 mr-5">{message}</div>
      <div className="absolute top-5 -translate-y-1/2 right-4 flex items-center gap-2">
        <span className="text-[13px] text-[#A1A1A1]">
          {format(date, "dd MMM yyyy")}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <Trash2 className="w-5 h-5 text-[#F36B7F]" />
        </button>
      </div>
      <div className="absolute top-2/3 -translate-y-1/2 right-2 ">
        <ChevronRight className="w-8 h-8 text-2xl font-bold text-[#929292]" />
      </div>
    </div>
  );
};

export default NotificationCard;
