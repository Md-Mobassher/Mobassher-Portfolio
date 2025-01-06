import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "next-themes";

// const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Mobassher Hossain | Full-Stack Developer",
  description:
    "Discover the professional portfolio of Md Mobassher Hossain, a highly skilled Full-Stack Developer specializing in building dynamic and responsive web applications. Explore a wide range of projects, including innovative platforms for pet adoption, bike management, and more. With expertise in Next.js, TypeScript, Node.js, and MongoDB, Mobassher delivers cutting-edge solutions tailored for businesses and users alike. Browse through detailed case studies, blog posts, and insights into modern web development technologies. Connect to collaborate or hire a versatile developer for your next project.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className={roboto.className}>
        <ThemeProvider attribute="class">{children}</ThemeProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
