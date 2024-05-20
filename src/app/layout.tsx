import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "aos/dist/aos.css";
import Header from "@/components/Header";
import "./globals.css";
import "./variables.css";

const ebGaramond = EB_Garamond({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Info.in",
  description: "Cari berita yang anda inginkan mudah dan praktis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ebGaramond.className}>
        {/* <Header /> */}
        {children}
      </body>
    </html>
  );
}
