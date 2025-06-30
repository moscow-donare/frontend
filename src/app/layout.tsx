import React from "react";
import Provider from "./components/provider";
import { cookieToWeb3AuthState } from "@web3auth/modal";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Donaré",
  description: "Donaré - Plataforma de recaudación de fondos, con trazabilidad en blockchain",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const web3authInitialState = cookieToWeb3AuthState(headersList.get('cookie'));
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* // IMP START - SSR */}
        <Providers>
          <Provider web3authInitialState={web3authInitialState}>{children}</Provider>
        </Providers>
        {/* // IMP END - SSR */}
      </body>
    </html>
  );
}