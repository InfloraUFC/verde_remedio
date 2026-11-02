import type { Metadata } from "next";
import { Geist_Mono, Patrick_Hand } from "next/font/google";
import "./globals.css";

// Fonte de texto. A Gamja Flower foi trocada porque desenha mal os acentos do
// português (ç, õ, é...). A Patrick Hand tem o mesmo ar manuscrito e suporta
// `latin-ext`. A fonte de títulos (Montaser Arabic) é carregada via
// @font-face em globals.css (arquivo local em public/fonts).
const patrickHand = Patrick_Hand({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  variable: "--font-patrick",
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
    <html lang="pt-BR" className={`font-sans ${patrickHand.variable}`}>
      <body className={`${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
