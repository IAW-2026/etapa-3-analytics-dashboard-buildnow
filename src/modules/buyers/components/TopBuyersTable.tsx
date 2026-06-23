'use client';

import { Trophy, Medal } from 'lucide-react';
import { TopCartValue } from '../types';

interface TopBuyersTableProps {
  buyers: TopCartValue[];
}

export function TopBuyersTable({ buyers }: TopBuyersTableProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 overflow-hidden flex flex-col shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800 mb-6">Principales Compradores</h3>
      <div className="flex-1 min-h-[300px] overflow-y-auto pr-2">
        {buyers.length === 0 ? (
          <div className="h-full flex items-center justify-center text-sm text-slate-500">
            No hay datos de compradores disponibles
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {buyers.map((buyer, index) => {
              let RankIcon = null;
              let rankStyle = 'bg-slate-100 text-slate-500';
              let containerStyle = 'border-transparent hover:bg-slate-50';
              
              if (index === 0) {
                RankIcon = Trophy;
                rankStyle = 'bg-yellow-100 text-yellow-600 border border-yellow-200';
                containerStyle = 'bg-gradient-to-r from-yellow-50/50 to-transparent border border-yellow-100 shadow-sm';
              } else if (index === 1) {
                RankIcon = Medal;
                rankStyle = 'bg-slate-100 text-slate-500 border border-slate-200';
                containerStyle = 'bg-gradient-to-r from-slate-50 to-transparent border border-slate-100 shadow-sm';
              } else if (index === 2) {
                RankIcon = Medal;
                rankStyle = 'bg-amber-100 text-amber-700 border border-amber-200';
                containerStyle = 'bg-gradient-to-r from-amber-50/50 to-transparent border border-amber-100 shadow-sm';
              }

              return (
                <div key={buyer.buyerId} className={`flex items-center gap-4 p-3 rounded-xl transition-all ${containerStyle}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0 ${rankStyle}`}>
                    {RankIcon ? <RankIcon size={20} /> : index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-800 truncate">{buyer.buyerName}</p>
                    <p className="text-xs text-slate-500 truncate">ID: {buyer.buyerId}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-800">
                      {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(buyer.estimatedValue)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
