"use client"

import { LogIn, Menu, Plus, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import logo from "../../../public/images/logo.png"
import { Button } from "@heroui/react"
import { useWeb3Auth, useWeb3AuthUser } from "@web3auth/modal/react" // Corregido: Importa useWeb3AuthUser
import { Balance } from "./wagmi/getBalance"
import AuthAvatar from "./AuthAvatar"
import { useCampaigns } from "../context/CampaignContext"
import { SwitchChain } from "./wagmi/switchNetwork"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isConnected } = useWeb3Auth() // Corregido: Solo desestructura isConnected de useWeb3Auth
  const { userInfo } = useWeb3AuthUser(); // Corregido: Obtén userInfo de useWeb3AuthUser
  const { campaigns } = useCampaigns();
  const [canCreateCampaign, setCanCreateCampaign] = useState(true);

  useEffect(() => {
    if (isConnected && userInfo?.name) {
      const userHasCampaign = campaigns.some(campaign => campaign.creator === userInfo.name);
      setCanCreateCampaign(!userHasCampaign);
    } else {
      setCanCreateCampaign(true);
    }
  }, [isConnected, userInfo, campaigns]);

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/home" className="flex items-center">
              <Image src={logo} alt="Logo" width={40} height={40} />
              <span className="ml-2 text-2xl font-bold text-gray-900">Donaré</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden w-full md:flex md:items-center md:space-x-4">
            <div className="w-full h-full flex flex-row justify-start items-center space-x-4 mx-10">
              <Link
                href="/home"
                className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md font-medium transition-colors"
              >
                Inicio
              </Link>
              <Link
                href="/campaigns"
                className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md font-medium transition-colors"
              >
                Ver Campañas
              </Link>
              <Link
                href="/how-it-works"
                className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md font-medium transition-colors"
              >
                ¿Cómo funciona?
              </Link>
              <Link
                href="/about-us"
                className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md font-medium transition-colors"
              >
                Contacto
              </Link>
            </div>
            <div className="w-full flex flex-row justify-end items-end space-x-2">
              {isConnected ? (
                <>
                  <Button
                    as={Link}
                    href={canCreateCampaign ? "/campaigns/create" : "#"}
                    color="primary"
                    disabled={!canCreateCampaign}
                    title={!canCreateCampaign ? "Ya tienes una campaña activa o en revisión" : "Crear una nueva campaña"}
                  >
                    <Plus className="h-4 w-4 mr-1" /> Crear Campaña
                  </Button>
                  <SwitchChain/>
                  <Balance />
                  <AuthAvatar />
                </>
              ) : (
                <>
                  <Button
                    as={Link}
                    href="/campaigns/create"
                    color="primary"
                  >
                    <Plus className="h-4 w-4 mr-1" /> Crear Campaña
                  </Button>
                  <Button
                    as={Link}
                    href="/login"
                    color="secondary"
                  >
                    <LogIn className="h-4 w-4 mr-1" /> Iniciar Sesion
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3">
            <Link
              href="/home"
              className="text-gray-600 hover:text-primary-600 block px-3 py-2 rounded-md font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link
              href="/campaigns"
              className="text-gray-600 hover:text-primary-600 block px-3 py-2 rounded-md font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Ver Campañas
            </Link>
            <Link
              href="/how-it-works"
              className="text-gray-600 hover:text-primary-600 block px-3 py-2 rounded-md font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              ¿Cómo funciona?
            </Link>
            <Link
              href="/about-us"
              className="text-gray-600 hover:text-primary-600 block px-3 py-2 rounded-md font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contacto
            </Link>

            {/* Mobile auth section */}
            <div className="pt-2 border-t border-gray-200 space-y-2">
              {isConnected ? (
                <div className="space-y-3">
                  <div className="px-3 py-2">
                    <Balance />
                  </div>
                  <div className="px-3 py-2">
                    <AuthAvatar />
                  </div>
                  <div className="px-3 py-2">
                    <SwitchChain/>
                  </div>
                  <div className="px-3">
                    <Button
                      as={Link}
                      href={canCreateCampaign ? "/campaigns/create" : "#"}
                      color="primary"
                      className="w-full justify-center"
                      onPress={() => setIsMenuOpen(false)}
                      disabled={!canCreateCampaign}
                      title={!canCreateCampaign ? "Ya tienes una campaña activa o en revisión" : "Crear una nueva campaña"}
                    >
                      <Plus className="h-4 w-4 mr-1" /> Crear Campaña
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="px-3">
                    <Button
                      as={Link}
                      href="/campaigns/create"
                      color="primary"
                      className="w-full justify-center"
                      onPress={() => setIsMenuOpen(false)}
                    >
                      <Plus className="h-4 w-4 mr-1" /> Crear Campaña
                    </Button>
                  </div>
                  <div className="px-3">
                    <Button
                      as={Link}
                      href="/login"
                      color="secondary"
                      className="w-full justify-center"
                      onPress={() => setIsMenuOpen(false)}
                    >
                      <LogIn className="h-4 w-4 mr-1" /> Iniciar Sesión
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar