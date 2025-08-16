// File: src/app/layout.tsx
import RootProvider from "@/lib/provider/RootProvider";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./globals.css";

// const notoSerifBengali = Noto_Serif_Bengali({
//   subsets: ["bengali", "latin"],
//   weight: ["400", "700", "900"],
// });

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: {
    template: "%m - Mobassher Hossain | Full-Stack Developer",
    absolute: "Mobassher Hossain | Full-Stack Developer",
  },
  description:
    "Discover the professional portfolio of Md Mobassher Hossain, a highly skilled Full-Stack Developer specializing in building dynamic and responsive web applications. Explore a wide range of projects, including innovative platforms for pet adoption, bike management, and more. With expertise in Next.js, TypeScript, Node.js, and MongoDB, Mobassher delivers cutting-edge solutions tailored for businesses and users alike. Browse through detailed case studies, blog posts, and insights into modern web development technologies. Connect to collaborate or hire a versatile developer for your next project.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.maateen.me/baloo-da-2/font.css"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning className={`${roboto.className}`}>
        <RootProvider>
          <div className="bg-light-background text-light-text dark:bg-gradient-to-tl dark:from-gray-800 dark:via-gray-950 dark:to-black dark:text-dark-text min-h-screen">
            {children}
          </div>
          <Toaster position="bottom-right" />
        </RootProvider>
      </body>
    </html>
  );
}
