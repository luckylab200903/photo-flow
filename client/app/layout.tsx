"use client";

import "./globals.css";
import { useAppDispatch } from "@/lib/hooks";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { Toaster } from "@/components/ui/sonner";
import { useEffect } from "react";
import { loadUser } from "@/lib/actions/userActions";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body>
          <DataFetcher />
          {children}
          <Toaster />
        </body>
      </html>
    </StoreProvider>
  );
}

const DataFetcher = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  return null;
};
