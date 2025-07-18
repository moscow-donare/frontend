"use client";

import { useWeb3AuthConnect, useWeb3Auth } from "@web3auth/modal/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

export default function LoginPage() {
  const { connect, isConnected } = useWeb3AuthConnect();
  const { web3Auth } = useWeb3Auth(); // 👈 acceso al objeto Web3Auth
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      connect();
    }, 1000);
  }, []);

  useEffect(() => {
    const handleLogin = async () => {
      if (isConnected && web3Auth) {
        console.log("✅ User logged in");

        try {
          const idToken = (await web3Auth.getUserInfo()).idToken; // 👈 obtenemos el JWT
          console.log("📨 Sending idToken to backend:", idToken);

          const res = await fetch(`${BACKEND_URL}/auth/web3`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ idToken }),
          });

          if (!res.ok) throw new Error("❌ Error authenticating in backend");

          const data = await res.json();
          console.log("🟢 Backend response:", data);

          router.push("/home");
        } catch (err) {
          console.error("❌ Error in login flow:", err);
        }
      }
    };

    handleLogin();
  }, [isConnected, web3Auth]);

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-primary-600 to-secondary-800"></div>
  );
}
