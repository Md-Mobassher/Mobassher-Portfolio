"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Facebook,
  Linkedin,
  Mail,
  MessageCircle,
  Share2,
  Twitter,
} from "lucide-react";
import { useState } from "react";

interface ShareButton {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
}

interface DetailsCardProps {
  title?: string;
  content?: React.ReactNode;
  subtitle?: string;
  showShareButtons?: boolean;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  customShareButtons?: ShareButton[];
  onShare?: (platform: string) => void;
}

export default function DetailsCard({
  title,
  content,
  subtitle,
  showShareButtons = true,
  className = "",
  headerClassName = "",
  contentClassName = "",
  customShareButtons,
  onShare,
}: DetailsCardProps) {
  const [isSharing, setIsSharing] = useState(false);

  const defaultShareButtons: ShareButton[] = [
    {
      id: "facebook",
      label: "Share",
      icon: <Facebook className="w-4 h-4" />,
      color: "bg-blue-600 hover:bg-blue-700",
      onClick: () => handleShare("facebook"),
    },
    {
      id: "twitter",
      label: "Tweet",
      icon: <Twitter className="w-4 h-4" />,
      color: "bg-black hover:bg-gray-800",
      onClick: () => handleShare("twitter"),
    },
    {
      id: "email",
      label: "Email",
      icon: <Mail className="w-4 h-4" />,
      color: "bg-gray-600 hover:bg-gray-700",
      onClick: () => handleShare("email"),
    },
    {
      id: "whatsapp",
      label: "Share",
      icon: <MessageCircle className="w-4 h-4" />,
      color: "bg-green-600 hover:bg-green-700",
      onClick: () => handleShare("whatsapp"),
    },
    {
      id: "general",
      label: "Share",
      icon: <Share2 className="w-4 h-4" />,
      color: "bg-green-600 hover:bg-green-700",
      onClick: () => handleShare("general"),
    },
    {
      id: "linkedin",
      label: "in",
      icon: <Linkedin className="w-4 h-4" />,
      color: "bg-blue-600 hover:bg-blue-700",
      onClick: () => handleShare("linkedin"),
    },
    {
      id: "google",
      label: "G",
      icon: null,
      color: "bg-blue-600 hover:bg-blue-700",
      onClick: () => handleShare("google"),
    },
  ];

  const shareButtons = customShareButtons || defaultShareButtons;

  const handleShare = (platform: string) => {
    setIsSharing(true);

    if (onShare) {
      onShare(platform);
    } else {
      // Default sharing behavior
      const url = window.location.href;
      const text = title;

      switch (platform) {
        case "facebook":
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            "_blank"
          );
          break;
        case "twitter":
          window.open(
            `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
            "_blank"
          );
          break;
        case "email":
          window.open(
            `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`,
            "_blank"
          );
          break;
        case "whatsapp":
          window.open(
            `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
            "_blank"
          );
          break;
        case "linkedin":
          window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
            "_blank"
          );
          break;
        case "google":
          window.open(
            `https://plus.google.com/share?url=${encodeURIComponent(url)}`,
            "_blank"
          );
          break;
        default:
          // Fallback to navigator.share if available
          if (navigator.share) {
            navigator.share({
              title: text,
              url: url,
            });
          }
          break;
      }
    }

    setTimeout(() => setIsSharing(false), 1000);
  };

  return (
    <Card
      className={`w-full max-w-6xl border-none bg-[#F3F7F6] shadow-none ${className}`}
    >
      <CardHeader className={`pb-4 p-0 ${headerClassName}`}>
        <div className="space-y-0">
          <div
            className={`${
              title ? "border-b border-gray-300  md:pb-4 pb-2 mb-4" : ""
            }`}
          >
            <h1
              className={`md:text-3xl text-2xl font-bold leading-tight text-primary `}
            >
              {title || ""}
            </h1>

            {subtitle && (
              <h2 className="text-md font-medium text-gray-700 leading-tight mt-2">
                {subtitle}
              </h2>
            )}
          </div>
          {showShareButtons && (
            <div className="flex flex-wrap gap-2">
              {shareButtons.map((button) => (
                <Button
                  key={button.id}
                  variant="outline"
                  size="sm"
                  className={`${button.color} text-white border-0 hover:scale-105 transition-transform`}
                  onClick={button.onClick}
                  disabled={isSharing}
                >
                  {button.icon}
                  <span className="ml-2">{button.label}</span>
                </Button>
              ))}
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent
        className={`${contentClassName ? contentClassName : "p-0 text-black lg:py-8 md:py-7 py-6"} `}
      >
        {content}
      </CardContent>
    </Card>
  );
}
