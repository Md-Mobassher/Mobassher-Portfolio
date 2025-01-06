import Footer from "@/components/shared/Footer/Footer";
import Navbar from "@/components/shared/Navbar/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mobassher Hossain | Full-Stack Developer",
  description:
    "Discover the professional portfolio of Md Mobassher Hossain, a highly skilled Full-Stack Developer specializing in building dynamic and responsive web applications. Explore a wide range of projects, including innovative platforms for pet adoption, bike management, and more. With expertise in Next.js, TypeScript, Node.js, and MongoDB, Mobassher delivers cutting-edge solutions tailored for businesses and users alike. Browse through detailed case studies, blog posts, and insights into modern web development technologies. Connect to collaborate or hire a versatile developer for your next project.",
};

const CommonLayoutPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text ">
      <Navbar />
      <div className="">{children}</div>
      <Footer />
    </div>
  );
};

export default CommonLayoutPage;
