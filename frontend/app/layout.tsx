import type { Metadata } from "next";
import { Inter, Mochiy_Pop_One, Kanit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chrome from "@/components/Chrome";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const mochiy = Mochiy_Pop_One({
  variable: "--font-mochiy",
  weight: "400",
  subsets: ["latin"],
});

const kanit = Kanit({
  variable: "--font-kanit",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jack -- 3D Creator",
  description: "Jack -- a 3D creator driven by crafting striking and unforgettable projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${mochiy.variable} ${kanit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Chrome navbar={<Navbar />} footer={<Footer />}>
          {children}
        </Chrome>
      </body>
    </html>
  );
}
