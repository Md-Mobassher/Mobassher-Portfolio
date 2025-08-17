"use client";

import Image from "next/image";
import { useState } from "react";

const ShareButton = ({ title }: { title: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const shareOnSocialMedia = (platform: string) => {
    const url = window.location.href;
    const text = `Check out this blog: ${title}`;

    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${text} ${url}`;
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
        return;
      default:
        break;
    }

    window.open(shareUrl, "_blank");
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleDropdown}
        className="border border-primary rounded-lg px-4 md:py-2 py-1.5 flex justify-center items-center gap-2 bg-gray-200 dark:bg-gray-800 hover:text-light-background hover:bg-primary dark:hover:bg-primary font-semibold cursor-pointer"
      >
        <Image src={"/icons/share.png"} alt="share" width={20} height={20} />{" "}
        Share
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-200 dark:bg-gray-800 border border-green-400 rounded-lg shadow-lg dark:text-dark-text text-light-text">
          <button
            onClick={() => shareOnSocialMedia("linkedin")}
            className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-green-500 rounded-t-lg cursor-pointer"
          >
            <Image
              src={"/icons/linkedin.png"}
              alt="share"
              width={20}
              height={20}
            />{" "}
            LinkedIn
          </button>
          <button
            onClick={() => shareOnSocialMedia("facebook")}
            className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-green-500 cursor-pointer"
          >
            <Image
              src={"/icons/facebook.png"}
              alt="share"
              width={20}
              height={20}
            />{" "}
            Facebook
          </button>
          <button
            onClick={() => shareOnSocialMedia("twitter")}
            className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-green-500 cursor-pointer"
          >
            <Image
              src={"/icons/twitter.png"}
              alt="share"
              width={20}
              height={20}
            />{" "}
            Twitter
          </button>

          <button
            onClick={() => shareOnSocialMedia("whatsapp")}
            className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-green-500 cursor-pointer"
          >
            <Image
              src={"/icons/whatsapp.png"}
              alt="share"
              width={20}
              height={20}
            />{" "}
            WhatsApp
          </button>
          <button
            onClick={() => shareOnSocialMedia("copy")}
            className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-green-500 rounded-b-lg cursor-pointer"
          >
            <Image
              src={"/icons/share.png"}
              alt="share"
              width={20}
              height={20}
            />{" "}
            Copy Link
          </button>
        </div>
      )}
    </div>
  );
};

export default ShareButton;
