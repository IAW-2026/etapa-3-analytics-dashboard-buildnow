import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Store, ShoppingCart, Truck, Users, CircleDollarSign, ArrowRight } from 'lucide-react';

const MODULES = [
  {
    title: 'Stores',
    description: 'Gestión y seguimiento general del rendimiento operativo e ingresos de las tiendas de la plataforma.',
    href: '/stores',
    icon: Store,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10'
  },
  {
    title: 'Orders',
    description: 'Análisis del flujo de ventas, comportamiento de compra y desempeño global de los pedidos.',
    href: '/orders',
    icon: ShoppingCart,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10'
  },
  {
    title: 'Delivery',
    description: 'Monitoreo en tiempo real de la logística, estado de entregas y actividad de los repartidores.',
    href: '/delivery',
    icon: Truck,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10'
  },
  {
    title: 'Buyers',
    description: 'Métricas sobre comportamiento, fidelización y demografía de los clientes de la plataforma.',
    href: '/buyers',
    icon: Users,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-500/10'
  },
  {
    title: 'Finances',
    description: 'Control centralizado de las operaciones financieras, flujo de ingresos, pagos y transferencias.',
    href: '/finances',
    icon: CircleDollarSign,
    color: 'text-rose-500',
    bgColor: 'bg-rose-500/10'
  }
];

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="industrial-card rounded-xl p-8 bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-surface-container-high)] border-l-4 border-l-[var(--color-primary)]">
        <h1 className="text-3xl font-bold text-[var(--color-on-surface)]">
          Panel de Control BuildNow
        </h1>
        <p className="mt-3 text-lg text-[var(--color-on-surface-variant)] max-w-3xl">
          Bienvenido al centro de inteligencia de negocios. Aquí podrás monitorear, analizar y tomar decisiones basadas en datos sobre cada aspecto operativo de la plataforma. Selecciona un módulo para explorar las métricas detalladas.
        </p>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MODULES.map((module) => {
          const Icon = module.icon;
          return (
            <Link 
              key={module.href} 
              href={module.href}
              className="industrial-card group rounded-xl p-6 transition-all duration-300 hover:shadow-md hover:border-[var(--color-primary)] hover:-translate-y-1 flex flex-col h-full"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${module.bgColor}`}>
                  <Icon className={`w-6 h-6 ${module.color}`} />
                </div>
                <ArrowRight className="w-5 h-5 text-[var(--color-outline-variant)] group-hover:text-[var(--color-primary)] transition-colors" />
              </div>
              
              <h3 className="text-xl font-bold text-[var(--color-on-surface)] mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                {module.title}
              </h3>
              
              <p className="text-[var(--color-on-surface-variant)] text-sm leading-relaxed flex-grow">
                {module.description}
              </p>
            </Link>
          );
        })}
      </div>
      
      {/* Footer info */}
      <div className="mt-8 text-center text-sm text-[var(--color-on-surface-variant)]">
        <p>Los datos mostrados en los paneles se actualizan en tiempo real.</p>
      </div>
    </div>
  );
}