import Footer from "@/components/shared/footer/Footer";
import Navbar from "@/components/shared/navbar/Navbar";
import { Metadata } from "next";

import { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    template: "%m - Mobassher Hossain | Full-Stack Developer",
    absolute: "Mobassher Hossain | Full-Stack Developer",
  },
  description:
    "Discover the professional portfolio of Md Mobassher Hossain, a highly skilled Full-Stack Developer specializing in building dynamic and responsive web applications. Explore a wide range of projects, including innovative platforms for pet adoption, bike management, and more. With expertise in Next.js, TypeScript, Node.js, and MongoDB, Mobassher delivers cutting-edge solutions tailored for businesses and users alike. Browse through detailed case studies, blog posts, and insights into modern web development technologies. Connect to collaborate or hire a versatile developer for your next project.",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="bg-light-background text-light-text dark:bg-dark-background dark:from-gray-700 dark:via-gray-950 dark:to-black dark:text-dark-text min-h-screen">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
