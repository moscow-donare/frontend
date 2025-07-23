import React, { useState, useEffect } from 'react'; // Import useState, useEffect
import { ChevronRight, Shield, Zap, Heart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import hero from "@public/images/home/hero.png"
import { Card, user } from '@heroui/react';
import { useWeb3AuthUser } from '@web3auth/modal/react'; // Import useWeb3AuthUser
import { useCampaigns } from '@/app/hooks/useCampaings';
import { Campaign } from '@/app/types/Campaign';

const Hero = () => {
  const { userInfo } = useWeb3AuthUser();
  const [canCreateCampaign, setCanCreateCampaign] = useState(true);
  const { getAllCampaigns } = useCampaigns(); // Assuming useCampaigns provides campaigns
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    console.log("hola");
    if (userInfo?.name) {
      console.log("User Info:", userInfo);
      const fetchCampaigns = async () => {
        const allCampaigns = await getAllCampaigns();
        console.log("Fetched Campaigns:", allCampaigns);
        setCampaigns(allCampaigns);
      };
      fetchCampaigns();
      // Simulate checking if the logged-in user (e.g., 'Juan Pérez') has an existing campaign
      // For a real app, this check would come from the backend.
      const userHasCampaign = campaigns.some(campaign => campaign.creator === userInfo.name);
      setCanCreateCampaign(!userHasCampaign);
    }
  }, [userInfo]);

  const getAriaLabelCreateCampaign = () => {
    if (!userInfo?.name) {
      return "Inicia sesión para crear una campaña";
    }
    return canCreateCampaign ? "Crear una nueva campaña" : "Ya tienes una campaña activa o en revisión";
  }

  const getHrefCreateCampaign = () => {
    let href = canCreateCampaign ? "/campaigns/create" : "#";
    if (!userInfo?.name) {
      href = '/login';
    }
    return href;
  }

  return (
    <div className="bg-gradient-to-br from-primary-600 to-secondary-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Donaciones Transparentes con <span className="text-secondary-300">Blockchain</span>
            </h1>
            <p className="text-lg md:text-xl mb-6 text-teal-100">
              Revoluciona la forma en que gestionas la recaudacion de fondos con total transparencia,
              seguridad y eficiencia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={getHrefCreateCampaign()}
                className={`bg-white text-teal-700 hover:bg-teal-50 px-6 py-3 rounded-md font-medium text-center transition-colors ${!canCreateCampaign ? "opacity-50 cursor-not-allowed" : ""}`}
                aria-disabled={!canCreateCampaign}
                title={getAriaLabelCreateCampaign()}
              >
                Crear Campaña
              </Link>
              <Link
                href="/how-it-works"
                className="bg-transparent border border-white text-white hover:bg-white/10 px-6 py-3 rounded-md font-medium flex items-center justify-center transition-colors"
              >
                ¿Cómo Funciona? <ChevronRight className="h-5 w-5 ml-1" />
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
              <div className="flex flex-col items-center sm:items-start">
                <div className="bg-white/10 p-2 rounded-full mb-2">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium mb-1">100% Seguro</h3>
                <p className="text-teal-100 text-sm">Transacciones protegidas</p>
              </div>

              <div className="flex flex-col items-center sm:items-start">
                <div className="bg-white/10 p-2 rounded-full mb-2">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium mb-1">Rápido</h3>
                <p className="text-teal-100 text-sm">Fondos disponibles al instante</p>
              </div>

              <div className="flex flex-col items-center sm:items-start">
                <div className="bg-white/10 p-2 rounded-full mb-2">
                  <Heart className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium mb-1">Impacto Real</h3>
                <p className="text-teal-100 text-sm">Validación de donaciones</p>
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative">
              <Card className="w-full h-full rounded-lg shadow-lg overflow-hidden">
                <Image
                  src={hero}
                  alt="Donaciones transparentes"
                  className="w-full h-full object-cover"
                  width={400}
                  height={400}
                />
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;