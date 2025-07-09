"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CampaignsPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirigir a home por ahora ya que las campañas individuales no están habilitadas
    router.push('/home');
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 to-secondary-800 flex items-center justify-center">
      <div className="text-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-xl mb-2">Redirigiendo...</p>
        <p className="text-sm opacity-75">Esta página será habilitada próximamente</p>
      </div>
    </div>
  );
}