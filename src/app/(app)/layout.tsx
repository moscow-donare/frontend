"use client"
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { CampaignProvider } from "../context/CampaignContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
      <>
      <Navbar/>
          <CampaignProvider>
            {children}
          </CampaignProvider>
        <Footer/>
      </>
  );
}