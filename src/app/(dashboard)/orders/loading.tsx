import React from 'react';

export default function LoadingDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Skeleton */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="space-y-2">
            <div className="h-8 w-64 bg-slate-200 rounded animate-pulse"></div>
            <div className="h-4 w-96 bg-slate-200 rounded animate-pulse"></div>
          </div>
          <div className="h-10 w-48 bg-slate-200 rounded-lg animate-pulse"></div>
        </div>

        {/* Row 1: KPI Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 h-32 flex flex-col justify-between animate-pulse">
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 bg-slate-200 rounded-full"></div>
                <div className="h-4 w-24 bg-slate-200 rounded"></div>
              </div>
              <div className="space-y-2 mt-4">
                <div className="h-8 w-20 bg-slate-200 rounded"></div>
                <div className="h-3 w-32 bg-slate-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2: Charts Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 h-[400px] animate-pulse"></div>
          <div className="lg:col-span-1 bg-white rounded-xl border border-slate-200 h-[400px] animate-pulse"></div>
        </div>

      </div>
    </div>
  );
}
