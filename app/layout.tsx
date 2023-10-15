'use client'

// These styles apply to every route in the application
import "@/styles/globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Roboto } from 'next/font/google'
import { usePathname } from 'next/navigation'
import localFont from 'next/font/local'

import { Header } from './header';

 
// Font files can be colocated inside of `pages`
const futura = localFont({ src: '../public/futura_medium.woff' })

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname()

  const hideFox = pathname == '/' ? true : false;

  return (
    <html lang="en">
      <body className={`${roboto.className} bg-primary`}>
        <Header hideFox={hideFox} />
        {children}
      </body>
    </html>
  );
}
