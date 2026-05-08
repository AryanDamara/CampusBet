// ActivityFeed.jsx — live social timeline of recent campus activity.
// Shows match results and tournament registrations in a clean feed.

import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import useActivityFeed from '../../hooks/useActivityFeed';
import { timeFromNow } from '../../utils/formatters';

const ActivityFeed = () => {
  const { activities, isLoading } = useActivityFeed(12);

  return (
    <div className="bg-bg-card border border-white/5 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-white/5 flex items-center gap-2">
        <Activity className="w-4 h-4 text-purple-400" />
        <h2 className="font-display font-semibold text-text-primary">Campus Activity</h2>
        <span className="ml-auto flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          <span className="text-xs text-text-muted">Live</span>
        </span>
      </div>

      {/* Feed */}
      <div className="divide-y divide-white/5">
        {isLoading ? (
          Array(5).fill(0).map((_, i) => (
            <div key={i} className="px-5 py-3.5 flex items-start gap-3 animate-pulse">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex-shrink-0" />
              <div className="flex-1 space-y-1.5">
                <div className="h-3 bg-white/5 rounded w-3/4" />
                <div className="h-2.5 bg-white/5 rounded w-1/3" />
              </div>
            </div>
          ))
        ) : activities.length === 0 ? (
          <div className="px-5 py-10 text-center">
            <p className="text-text-muted text-sm">No activity yet.</p>
            <p className="text-text-muted text-xs mt-1">Be the first to complete a match!</p>
          </div>
        ) : (
          activities.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className="px-5 py-3.5 flex items-start gap-3 hover:bg-white/3 transition-colors"
            >
              <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-base
                ${item.type === 'match' ? 'bg-purple-500/10' : 'bg-warning/10'}`}
              >
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-text-primary leading-snug">{item.text}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-text-muted">{item.sub}</span>
                  <span className="text-text-muted/40 text-xs">·</span>
                  <span className="text-xs text-text-muted">{timeFromNow(item.time)}</span>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;
