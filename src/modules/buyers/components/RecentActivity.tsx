import { BuyerActivity } from '../types';
import { Activity } from 'lucide-react';

interface RecentActivityProps {
  activities: BuyerActivity[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 overflow-hidden flex flex-col h-full">
      <div className="flex items-center gap-2 mb-6">
        <Activity className="w-5 h-5 text-zinc-500" />
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Recent Activity</h3>
      </div>
      <div className="flex-1 overflow-y-auto pr-2 space-y-6">
        {activities.map((activity, index) => {
          const date = new Date(activity.createdAt);
          return (
            <div key={index} className="flex gap-4 relative">
              {/* Timeline line */}
              {index !== activities.length - 1 && (
                <div className="absolute left-2 top-8 bottom-[-24px] w-0.5 bg-zinc-100 dark:bg-zinc-800" />
              )}
              
              <div className="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-500 mt-1 flex-shrink-0 z-10" />
              
              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {activity.description}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                    {activity.type.replace(/_/g, ' ')}
                  </span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    {date.toLocaleDateString()} {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        {activities.length === 0 && (
          <div className="text-center py-8 text-sm text-zinc-500">
            No recent activity found.
          </div>
        )}
      </div>
    </div>
  );
}
