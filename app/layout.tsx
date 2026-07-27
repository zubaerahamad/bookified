import type {Metadata} from "next";
import {IBM_Plex_Serif, Mona_Sans} from "next/font/google";

import Navbar from "@/components/Navbar";
import "./globals.css";

const ibmPlexSerif = IBM_Plex_Serif({
    variable: "--font-ibm-plex-serif",
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    display: 'swap'
});

const monaSans = Mona_Sans({
    variable: "--font-mona-sans",
    subsets: ["latin"],
    display: "swap"
});

export const metadata: Metadata = {
    title: "Bookified",
    description: "Transform your reading experience with Bookified.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${ibmPlexSerif.variable} ${monaSans.variable} h-full font-sans antialiased`}
        >
        <body className="min-h-full flex flex-col">
        <Navbar/>
        {children}
        </body>
        </html>
    );
}
