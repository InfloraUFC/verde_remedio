import type { Metadata } from "next";
import { Gamja_Flower, Geist_Mono } from "next/font/google";
import "./globals.css";

// Fonte de texto do design. A fonte de títulos (Montaser Arabic) é carregada
// via @font-face em globals.css (arquivo local em public/fonts).
const gamja = Gamja_Flower({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-gamja",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Verde Remédio: Saberes Tradicionais",
  description:
    "Jogo educativo sobre plantas medicinais e etnobotânica — Projeto Inflora (UFC).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`font-sans ${gamja.variable}`}>
      <body className={`${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
