import { BuyerActivity } from '../types';
import { Activity, ShoppingCart, PackagePlus, CheckCircle2, MapPin, Clock } from 'lucide-react';

interface RecentActivityProps {
  activities: BuyerActivity[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  
  const getActivityMetadata = (type: string, description: string) => {
    const t = type.toUpperCase();
    
    if (t.includes('CART_CREATED')) {
      return { 
        icon: ShoppingCart, 
        color: 'text-emerald-600', 
        bg: 'bg-emerald-100', 
        title: 'Nuevo Carrito Iniciado',
        text: 'Un comprador ha comenzado un proceso de compra.'
      };
    }
    if (t.includes('ITEM_ADDED')) {
      return { 
        icon: PackagePlus, 
        color: 'text-blue-600', 
        bg: 'bg-blue-100', 
        title: 'Producto Agregado',
        text: 'Se añadió un nuevo ítem al carrito de compras.'
      };
    }
    if (t.includes('ORDER') || t.includes('CHECKOUT')) {
      return { 
        icon: CheckCircle2, 
        color: 'text-purple-600', 
        bg: 'bg-purple-100', 
        title: 'Compra Finalizada',
        text: 'Se ha completado un pedido exitosamente.'
      };
    }
    if (t.includes('ADDRESS') || t.includes('LOCATION')) {
      return { 
        icon: MapPin, 
        color: 'text-orange-600', 
        bg: 'bg-orange-100', 
        title: 'Dirección Actualizada',
        text: 'Un comprador actualizó sus datos de envío.'
      };
    }

    // Default fallback, capitalizing the original description if available
    const fallbackTitle = type.replace(/_/g, ' ');
    return { 
      icon: Clock, 
      color: 'text-indigo-600', 
      bg: 'bg-indigo-100', 
      title: fallbackTitle.charAt(0).toUpperCase() + fallbackTitle.slice(1).toLowerCase(),
      text: description || 'Actividad registrada en la plataforma.'
    };
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col h-full shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-50 rounded-xl border border-indigo-100/50">
            <Activity className="w-5 h-5 text-indigo-600" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Actividad Reciente</h3>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-2 space-y-6 relative">
        {activities.map((activity, index) => {
          const date = new Date(activity.createdAt);
          const meta = getActivityMetadata(activity.type, activity.description);
          const Icon = meta.icon;
          
          return (
            <div key={index} className="flex gap-4 relative group">
              {/* Timeline line */}
              {index !== activities.length - 1 && (
                <div className="absolute left-6 top-10 bottom-[-24px] w-px bg-slate-200 group-hover:bg-indigo-200 transition-colors" />
              )}
              
              {/* Icon */}
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 z-10 border-4 border-white ${meta.bg}`}>
                <Icon className={`w-5 h-5 ${meta.color}`} />
              </div>
              
              {/* Content Box */}
              <div className="flex-1 bg-slate-50 rounded-xl p-4 border border-slate-100 transition-all duration-300 group-hover:border-indigo-100 group-hover:bg-indigo-50/30 group-hover:shadow-sm">
                <div className="flex justify-between items-start mb-1.5">
                  <h4 className="text-sm font-bold text-slate-800">
                    {meta.title}
                  </h4>
                  <span className="text-xs font-semibold text-slate-500 bg-white px-2.5 py-1 rounded-md border border-slate-200 shadow-sm flex-shrink-0 ml-2">
                    {date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {meta.text}
                </p>
                <div className="flex items-center justify-end">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400">
                    {date.toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        {activities.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center h-full">
            <Activity className="w-8 h-8 text-slate-300 mb-3" />
            <p className="text-sm font-medium text-slate-500">No se encontraron actividades recientes.</p>
          </div>
        )}
      </div>
    </div>
  );
}
