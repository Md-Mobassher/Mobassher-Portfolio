import Footer from "@/components/shared/Footer/Footer";
import Navbar from "@/components/shared/Navbar/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mobassher Hossain | Full-Stack Developer",
  description: "This is Md Mobassher Hossain Portfolio website",
};

const CommonLayoutPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-[#111A28]  text-slate-100 ">
      <Navbar />
      <div className="max-w-7xl mx-auto">{children}</div>
      <Footer />
    </div>
  );
};

export default CommonLayoutPage;
