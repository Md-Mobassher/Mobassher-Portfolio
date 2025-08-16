"use client";

import { Partner } from "@/types";
import Image from "next/image";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface LogoSliderProps {
  partners: Partner[];
}

const LogoSlider = ({ partners }: LogoSliderProps) => {
  return (
    <div className="lg:py-8 md:py-6 py-4">
      <Swiper
        grabCursor={true}
        centeredSlides={false}
        slidesPerView={1}
        spaceBetween={20}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay]}
        className="w-full mySwiper mt-5"
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
        {partners?.map((slide: Partner) => (
          <SwiperSlide key={slide?.id}>
            <div className="w-full h-32 md:h-40 flex justify-center items-center">
              <Image
                src={slide?.logoUrl}
                alt={`Slide ${slide?.id}`}
                className="max-w-full max-h-full object-contain"
                width={200}
                height={120}
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 30vw, 20vw"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LogoSlider;
