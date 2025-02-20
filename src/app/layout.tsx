import type { Metadata } from "next";
import Header from "./components/header/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agora-모두 모여라",
  description: "우리들의 모임을 위한 공간",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
