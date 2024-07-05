import Footer from "@/components/shared/Footer/Footer";
import Navbar from "@/components/shared/Navbar/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mobassher Portfolio",
  description: "This is Md Mobassher Hossain Portfolio website",
};

const CommonLayoutPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-[#111A28] text-slate-100 ">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default CommonLayoutPage;
