"use client"
import Footer from "../components/Footer"
import type React from "react"
import Navbar from "../components/Navbar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
        <div className="pt-16">{children}</div>
      <Footer />
    </>
  )
}