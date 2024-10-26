// RootLayout.js
import "./globals.css";
import { Shadows_Into_Light_Two } from "next/font/google";
import ClientWrapper from './ClientWrapper';

const shadowsIntoLightTwo = Shadows_Into_Light_Two({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-shadows-into-light-two",
});

export const metadata = {
  title: "GreenHope",
  description: "Discover the World of Trees",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={shadowsIntoLightTwo.variable}>
      <body className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-white text-green-900 font-sans">
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}