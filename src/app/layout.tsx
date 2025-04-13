import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Header />
        <main className="container mx-auto px-32">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
