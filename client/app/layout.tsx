import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { Toaster } from "@/components/ui/sonner"


export const metadata: Metadata = {
  title: "FotoFlow",
  description: "...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body>{children}
         <Toaster />
        </body>
      </html>
    </StoreProvider>
  );
}
