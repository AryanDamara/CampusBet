// useActivityFeed.js — fetches recent platform activity from existing tables.
// No new DB tables needed — derives everything from lobbies + tournament_participants.

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const useActivityFeed = (limit = 15) => {
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        // Fetch recent completed matches with player names
        const { data: matches } = await supabase
          .from('lobbies')
          .select(`
            id, game, status, updated_at, bid_amount,
            winner:profiles!lobbies_winner_id_fkey(name),
            lobby_players(
              user_id,
              profile:profiles(name)
            )
          `)
          .eq('status', 'completed')
          .not('winner_id', 'is', null)
          .order('updated_at', { ascending: false })
          .limit(10);

        // Fetch recent tournament registrations with player + tournament info
        const { data: registrations } = await supabase
          .from('tournament_participants')
          .select(`
            user_id, created_at,
            profile:profiles(name),
            tournament:tournaments(title, game)
          `)
          .order('created_at', { ascending: false })
          .limit(10);

        // Map matches → activity items
        const matchItems = (matches || []).map((m) => {
          const players = m.lobby_players?.map((p) => p.profile?.name).filter(Boolean) || [];
          const winner = m.winner?.name;
          const loser = players.find((n) => n !== winner) || 'Opponent';
          return {
            id: `match-${m.id}`,
            type: 'match',
            icon: '🎮',
            text: winner
              ? `${winner} defeated ${loser} in ${m.game}`
              : `A ${m.game} match just wrapped up`,
            sub: m.bid_amount ? `${m.bid_amount} ⚡ on the line` : m.game,
            time: m.updated_at,
          };
        });

        // Map tournament registrations → activity items
        const regItems = (registrations || []).map((r) => ({
          id: `reg-${r.user_id}-${r.created_at}`,
          type: 'tournament',
          icon: '🏆',
          text: `${r.profile?.name || 'A player'} registered for ${r.tournament?.title || 'a tournament'}`,
          sub: r.tournament?.game || 'Tournament',
          time: r.created_at,
        }));

        // Merge, sort newest first, cap at limit
        const merged = [...matchItems, ...regItems]
          .sort((a, b) => new Date(b.time) - new Date(a.time))
          .slice(0, limit);

        setActivities(merged);
      } catch (err) {
        console.error('Activity feed error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, [limit]);

  return { activities, isLoading };
};

export default useActivityFeed;
