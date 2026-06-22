import { BuyerActivity } from '../types';
import { Activity } from 'lucide-react';

interface RecentActivityProps {
  activities: BuyerActivity[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 overflow-hidden flex flex-col h-full shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Activity className="w-5 h-5 text-slate-500" />
        <h3 className="text-lg font-semibold text-slate-800">Actividad Reciente</h3>
      </div>
      <div className="flex-1 overflow-y-auto pr-2 space-y-6">
        {activities.map((activity, index) => {
          const date = new Date(activity.createdAt);
          return (
            <div key={index} className="flex gap-4 relative">
              {/* Timeline line */}
              {index !== activities.length - 1 && (
                <div className="absolute left-2 top-8 bottom-[-24px] w-0.5 bg-slate-100" />
              )}
              
              <div className="w-4 h-4 rounded-full bg-blue-100 border-2 border-blue-500 mt-1 flex-shrink-0 z-10" />
              
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-800">
                  {activity.description}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {activity.type.replace(/_/g, ' ')}
                  </span>
                  <span className="text-xs text-slate-500">
                    {date.toLocaleDateString('es-AR')} {date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        {activities.length === 0 && (
          <div className="text-center py-8 text-sm text-slate-500">
            No se encontró actividad reciente.
          </div>
        )}
      </div>
    </div>
  );
}
