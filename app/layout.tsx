import "./globals.css";
import { Open_Sans, Nanum_Myeongjo } from "next/font/google";
import PortfolioProvider from "@/components/portfolio-context";
import GoogleAnalytics from "@/components/google-analytics";

const openSans = Open_Sans({ subsets: ["latin"] });
const nanumMyeongjo = Nanum_Myeongjo({ weight: "700", subsets: ["latin"] });

export const metadata = {
  title: "Portfolio",
  description: "Frontend developer portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <body className={openSans.className}>
        <GoogleAnalytics />
        <PortfolioProvider>{children}</PortfolioProvider>
      </body>
    </html>
  );
}
