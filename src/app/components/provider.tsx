"use client";

// IMP START - Setup Web3Auth Provider
import { Web3AuthProvider, type Web3AuthContextConfig } from "@web3auth/modal/react";
import { IWeb3AuthState, WEB3AUTH_NETWORK } from "@web3auth/modal";
// IMP END - Setup Web3Auth Provider
// IMP START - Setup Wagmi Provider
import { WagmiProvider } from "@web3auth/modal/react/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
// IMP END - Setup Wagmi Provider

// IMP START - Dashboard Registration
const clientId = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID ?? ""; // get from https://dashboard.web3auth.io
// IMP END - Dashboard Registration

// IMP START - Setup Wagmi Provider
const queryClient = new QueryClient();
// IMP END - Setup Wagmi Provider

// IMP START - Config
const web3AuthContextConfig: Web3AuthContextConfig = {
  web3AuthOptions: {
    clientId,
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
    // IMP START - SSR
    ssr: true,
    chains: [
      {
        chainNamespace: "eip155",
        chainId: "0x13882", // hexadecimal de 80002
        displayName: "Polygon Amoy",
        tickerName: "MATIC",
        ticker: "MATIC",
        decimals: 18,
        rpcTarget: "https://rpc-amoy.polygon.technology",
        blockExplorerUrl: "https://amoy.polygonscan.com",
        logo: "", // opcional
      },
    ],
  },
};

// IMP START - SSR
export default function Provider({
  children,
  web3authInitialState,
}: {
  children: React.ReactNode;
  web3authInitialState: IWeb3AuthState | undefined;
}) {
  // IMP END - SSR
  return (
    // IMP START - Setup Web3Auth Provider
    // IMP START - SSR
    <Web3AuthProvider config={web3AuthContextConfig} initialState={web3authInitialState}>
      {/* // IMP END - SSR */}
      {/* // IMP END - Setup Web3Auth Provider */}
      {/* // IMP START - Setup Wagmi Provider */}
      <QueryClientProvider client={queryClient}>
        <WagmiProvider>
        {children}
        </WagmiProvider>
      </QueryClientProvider>
      {/*// IMP START - Setup Web3Auth Provider */}
    </Web3AuthProvider>
    // IMP END - Setup Web3Auth Provider
  );
}