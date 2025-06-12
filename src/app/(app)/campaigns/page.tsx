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
      <div className="w-screen h-screen bg-teal-600 to:bg-purple-600">
        <p className="text-center text-white mt-2">Pagina no habilitada <a href="/home" className="underline">aquí</a>.</p>
        <p className="text-center text-white mt-4">Redirigiendo...</p>
      </div>
    </div>
  )
}
