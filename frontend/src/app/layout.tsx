import "./globals.css";
import PortfolioProvider from "@/contexts/PortfolioContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PortfolioProvider>{children}</PortfolioProvider>
      </body>
    </html>
  );
}
