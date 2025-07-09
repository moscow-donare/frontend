"use client";

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  setTimeout(() => {
    router.push('/home'); // o la ruta relativa a tu grupo de rutas
  }, 1000); // Espera 1 segundo antes de redirigir
  // Redirige a la ruta deseada
  return(
    <div>
      <div className="w-screen h-screen bg-gradient-to-br from-primary-600 to-secondary-800">
        <p className="text-center text-white mt-2">Pagina no habilitada.</p>
        <p className="text-center text-white mt-4">Redirigiendo...</p>
      </div>
    </div>
  )
}
