import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CompuLibre Control Plane",
  description:
    "Panel centralizado para administrar las aplicaciones de CompuLibre.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="es"
        className={`${inter.className} ${inter.variable} ${geistMono.variable} h-full antialiased`}
      >
        <body className="flex min-h-full flex-col overflow-x-clip">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
