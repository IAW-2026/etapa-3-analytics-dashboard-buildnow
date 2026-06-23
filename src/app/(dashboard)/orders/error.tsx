'use client';

import { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

export default function ErrorDashboard({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Dashboard Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8">
      <div className="bg-white p-8 rounded-2xl border border-rose-200 shadow-sm max-w-md w-full text-center">
        <div className="bg-rose-100 text-rose-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle size={32} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Ups, algo salió mal</h2>
        <p className="text-slate-500 mb-8">
          No pudimos cargar los datos del dashboard. Asegúrate de que el backend esté en funcionamiento.
        </p>
        <button
          onClick={() => reset()}
          className="bg-slate-800 text-white font-medium py-2.5 px-6 rounded-lg hover:bg-slate-700 transition-colors w-full"
        >
          Intentar de nuevo
        </button>
      </div>
    </div>
  );
}
