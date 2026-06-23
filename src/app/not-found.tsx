import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import { AlertTriangle, LayoutDashboard, LogIn } from 'lucide-react';

export default async function NotFound() {
  let userId: string | null = null;
  
  try {
    const authContext = await auth();
    userId = authContext.userId;
  } catch (error) {
    // En caso de que auth() se llame en un contexto estático (durante el build de Next.js),
    // ignoramos el error de Clerk y asumimos que no hay sesión activa por defecto.
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)] flex flex-col items-center justify-center p-4">
      <div className="industrial-card max-w-md w-full p-8 rounded-2xl flex flex-col items-center text-center shadow-sm">
        <div className="w-20 h-20 bg-[var(--color-surface-container-high)] rounded-full flex items-center justify-center mb-6 border border-[var(--color-outline-variant)]">
          <AlertTriangle className="w-10 h-10 text-[var(--color-on-surface-variant)]" />
        </div>
        
        <h1 className="text-6xl font-black text-[var(--color-on-surface)] mb-2">404</h1>
        <h2 className="text-2xl font-bold text-[var(--color-on-surface)] mb-4">Página no encontrada</h2>
        
        <p className="text-[var(--color-on-surface-variant)] mb-8">
          Lo sentimos, la ruta que estás buscando no existe, ha sido eliminada o nunca fue creada.
        </p>

        {userId ? (
          <Link 
            href="/"
            className="flex items-center gap-2 px-6 py-3.5 bg-[var(--color-primary)] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity w-full justify-center"
          >
            <LayoutDashboard className="w-5 h-5" />
            Volver al Dashboard
          </Link>
        ) : (
          <Link 
            href="/sign-in"
            className="flex items-center gap-2 px-6 py-3.5 bg-[var(--color-primary)] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity w-full justify-center"
          >
            <LogIn className="w-5 h-5" />
            Iniciar Sesión
          </Link>
        )}
      </div>
    </div>
  );
}
