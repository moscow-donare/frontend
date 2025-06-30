"use client"
import Footer from "../components/Footer"
import type React from "react"
import Navbar from "../components/Navbar"
import { CampaignProvider } from "../context/CampaignContext"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <CampaignProvider>
        <div className="pt-16">{children}</div>
      </CampaignProvider>
      <Footer />
    </>
  )
}