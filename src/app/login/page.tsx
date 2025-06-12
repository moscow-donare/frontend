"use client"

import { useWeb3AuthConnect } from "@web3auth/modal/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
    const { connect, isConnected} = useWeb3AuthConnect();
    const router = useRouter();
    // Connect immediately when component mounts
    useEffect(() => {
        setTimeout(() => {
            connect();
        }, 1000);
    }, []);


    useEffect(() => {
        if (isConnected) {
            console.log("✅ User logged in");
            router.push("/home"); // Redirect to dashboard after login
        }
    }, [isConnected]);

    return (
        <div className="w-screen h-screen bg-teal-600 to:bg-purple-600"></div>
    );
}

