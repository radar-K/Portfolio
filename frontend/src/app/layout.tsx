import "./globals.css";
import "@/app/globals.css";
import PortfolioProvider from "@/contexts/PortfolioContext";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <GoogleAnalytics />
        <PortfolioProvider>{children}</PortfolioProvider>
      </body>
    </html>
  );
}
