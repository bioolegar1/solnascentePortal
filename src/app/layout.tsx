import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL
  || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")) as string;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Sol Nascente - Alimentos de Qualidade",
  description: "Descubra nossa linha completa de alimentos com qualidade premium. Valorizamos a culinária simples, democrática e autêntica da nossa cultura.",
  keywords: "alimentos, qualidade, culinária, sustentabilidade, produtos alimentícios",
  openGraph: {
    title: "Sol Nascente - Alimentos de Qualidade",
    description: "Culinária simples e autêntica para sua casa",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} font-sans antialiased bg-white text-gray-900`}
      >
        {children}
      </body>
    </html>
  );
}
