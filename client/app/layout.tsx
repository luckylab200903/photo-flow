"use client"
import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { Toaster } from "@/components/ui/sonner";
import { useCookies } from 'react-cookie';
import { redirect } from "next/navigation"
import Cookies from "js-cookie";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  
  return (
    <StoreProvider>
      <html lang="en">
        <body>
          {children}
          <Toaster />
        </body>
      </html>
    </StoreProvider>
  );
}
