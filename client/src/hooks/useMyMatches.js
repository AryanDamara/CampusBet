import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import useAuth from './useAuth';

const useMyMatches = () => {
  const { user } = useAuth();
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?._id) {
      setMatches([]);
      setIsLoading(false);
      return;
    }

    const fetchMatches = async () => {
      setIsLoading(true);
      try {
        // Fetch lobbies where the current user is a player and the status is completed
        const { data: lobbyPlayers, error: playerError } = await supabase
          .from('lobby_players')
          .select('lobby_id')
          .eq('user_id', user._id);

        if (playerError) throw playerError;

        if (!lobbyPlayers || lobbyPlayers.length === 0) {
          setMatches([]);
          return;
        }

        const lobbyIds = lobbyPlayers.map((p) => p.lobby_id);

        const { data: completedLobbies, error: lobbiesError } = await supabase
          .from('lobbies')
          .select(`
            *,
            lobby_players(user_id, profiles(name, avatar_url))
          `)
          .in('id', lobbyIds)
          .eq('status', 'completed')
          .order('created_at', { ascending: false });

        if (lobbiesError) throw lobbiesError;

        // Map to match format expected by ActivityFeed and Wallet
        const mappedMatches = completedLobbies.map((lobby) => {
          const isWinner = lobby.winner_id === user._id;
          const opponent = lobby.lobby_players.find((p) => p.user_id !== user._id)?.profiles || { name: 'Unknown Opponent' };

          return {
            _id: lobby.id,
            lobbyId: lobby.id,
            game: lobby.game,
            opponent: { name: opponent.name, avatarUrl: opponent.avatar_url },
            result: isWinner ? 'won' : 'lost',
            creditsChange: isWinner ? lobby.bid_amount : -lobby.bid_amount,
            date: lobby.created_at, // Use completed_at if it exists, otherwise created_at
          };
        });

        setMatches(mappedMatches);
      } catch (err) {
        console.error('Failed to fetch matches:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatches();
  }, [user]);

  return { matches, isLoading };
};

export default useMyMatches;
