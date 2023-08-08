import "./globals.scss";
import type { Metadata } from "next";
import localFont from "next/font/local";

const migra = localFont({
  src: [
    {
      path: "../public/fonts/Migra-Extralight.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Migra-Extrabold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/MigraItalic-ExtralightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/MigraItalic-ExtraboldItalic.woff2",
      weight: "800",
      style: "italic",
    },
  ],
  variable: "--font-migra",
  display: "swap",
});

const machina = localFont({
  src: [
    {
      path: "../public/fonts/NeueMachina-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/NeueMachina-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/NeueMachina-Ultrabold.otf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-machina",
  display: "swap",
});

export const metadata: Metadata = {
  title: ".pay ",
  description:
    "👀.pay | Secure and Private Crypto Payment Gateway for Businesses: Integrate Seamless Transactions with our Anonymity-focused SDK",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${machina.variable} ${migra.variable}`} lang="en">
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
