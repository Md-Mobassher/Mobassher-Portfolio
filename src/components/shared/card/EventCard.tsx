import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../../ui/button";

interface EventCardProps {
  id?: string;
  day: number;
  month: string;
  title: string;
  date: string;
  imageUrl?: string;
  isUpcoming?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({
  id,
  day,
  month,
  title,
  date,
  imageUrl = "/images/noimage.png",
  isUpcoming = false,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-5 justify-between p-4 border-b border-gray-300 bg-white">
      <div className="flex  items-center space-x-4 w-full">
        <div className="text-primary md:w-1/5">
          {isUpcoming ? (
            <>
              <div className="lg:text-4xl md:text-3xl  text-2xl font-bold text-black">
                {day}
              </div>
              <div className="text-md md:text-lg uppercase text-gray-500">
                {month}
              </div>
            </>
          ) : (
            <div className="w-full h-full">
              <Image
                src={imageUrl}
                alt={title}
                width={128}
                height={96}
                className={`w-full h-full object-cover`}
              />
            </div>
          )}
        </div>
        <div className="w-4/5">
          <div className="text-gray-900 font-semibold text-md md:text-xl hover:text-primary">
            {title}
          </div>
          <div className="text-md md:text-lg text-gray-500 mt-1">{date}</div>
        </div>
      </div>
      <Link href={`/events/${id}`}>
        <Button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/80 cursor-pointer">
          DETAILS
        </Button>
      </Link>
    </div>
  );
};

export default EventCard;
