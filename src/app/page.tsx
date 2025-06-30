// /app/page.tsx
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/home'); // o la ruta relativa a tu grupo de rutas
}
