"use client";

import { getEmbedUrl } from "@/utils/getVideoUrl";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export interface Video {
  id: string;
  title: string;
  videoUrl: string;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface VideosSliderProps {
  videos: Video[];
}

const VideosSlider = ({ videos }: VideosSliderProps) => {
  return (
    <Swiper
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={1}
      spaceBetween={30}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      loop={true}
      pagination={{
        clickable: true,
        dynamicBullets: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="w-full mySwiper mt-5"
      breakpoints={{
        640: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 1,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 1,
          spaceBetween: 40,
        },
      }}
    >
      {videos?.map((video: Video) => (
        <SwiperSlide key={video?.id}>
          <div className="w-full h-64 md:h-80 lg:h-96 flex flex-col justify-center items-center p-4 bg-gray-100 rounded-lg">
            <div className="w-full h-full relative">
              <iframe
                src={getEmbedUrl(video?.videoUrl)}
                title={video?.title}
                className="w-full h-full rounded-lg"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800">
                {video?.title}
              </h3>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default VideosSlider;
