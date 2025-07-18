"use client"
import React, { useEffect, useState } from 'react';
import { CheckCircle, ArrowRight, Home } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCampaigns } from '../../../../context/CampaignContext'; 

export default function CampaignConfirmationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const campaignId = searchParams.get('campaignId');
  const { getCampaignById } = useCampaigns();
  const [campaignTitle, setCampaignTitle] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (campaignId) {
      const campaign = getCampaignById(campaignId);
      if (campaign) {
        setCampaignTitle(campaign.title);
      } else {
        // If campaign not found (e.g., direct access or refresh)
        router.replace('/campaigns/create'); // Redirect back to creation or home
      }
    } else {
      router.replace('/campaigns/create'); // Redirect if no campaignId in URL
    }
  }, [campaignId, getCampaignById, router]);

  if (!campaignTitle) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Cargando confirmación...</h2>
        <p className="text-gray-600">Por favor, espera un momento.</p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-xl border border-gray-200">
        <div className="text-center">
          <CheckCircle className="mx-auto h-20 w-20 text-teal-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            ¡Campaña Creada con Éxito!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Tu campaña "<strong>{campaignTitle}</strong>" ha sido enviada para revisión.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Nuestro equipo la revisará y la activará en breve. Recibirás una notificación cuando esté lista.
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <Link
            href={`/campaigns/${campaignId}`}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <ArrowRight className="h-5 w-5 text-teal-500 group-hover:text-teal-400" />
            </span>
            Ver mi campaña (En Revisión)
          </Link>
          <Link
            href="/dashboard"
            className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <Home className="h-5 w-5 text-gray-500 group-hover:text-gray-600" />
            </span>
            Ir al Panel de Control
          </Link>
        </div>
      </div>
    </div>
  );
}