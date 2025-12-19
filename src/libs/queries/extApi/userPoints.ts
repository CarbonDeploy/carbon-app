import { useQuery } from '@tanstack/react-query';
import { QueryKey } from '../queryKey';
import { ONE_DAY_IN_MS } from 'utils/time';

export interface UserPointsResponse {
  walletAddress: string;
  dexVolume: number;
  spotVolume: number;
  totalVolume: number;
  points: number;
}

const fetchUserPoints = async (
  walletAddress: string,
): Promise<UserPointsResponse> => {
  const url = `https://dna-perp-dex-prod-y7fqo.ondigitalocean.app/api/api/users/${walletAddress}/volume`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch user points: ${response.statusText}`);
  }

  return response.json();
};

export const useUserPoints = (walletAddress?: string) => {
  return useQuery({
    queryKey: QueryKey.userPoints(walletAddress || ''),
    queryFn: () => fetchUserPoints(walletAddress!),
    enabled: !!walletAddress,
    staleTime: ONE_DAY_IN_MS / 24, // 1 hour
    refetchOnWindowFocus: false,
    retry: 2,
  });
};

const fetchPointsLeaderboard = async (): Promise<UserPointsResponse[]> => {
  try {
    const url = `https://dna-perp-dex-prod-y7fqo.ondigitalocean.app/api/api/users/leaderboard`;
    const response = await fetch(url);
    if (!response.ok) {
      console.error(
        `Failed to fetch points leaderboard: ${response.statusText}`,
      );
      return [];
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching points leaderboard:', error);
    return [];
  }
};

export const usePointsLeaderboard = () => {
  return useQuery({
    queryKey: QueryKey.pointsLeaderboard(),
    queryFn: () => fetchPointsLeaderboard(),
    staleTime: ONE_DAY_IN_MS / 24, // 1 hour
    refetchOnWindowFocus: false,
    retry: 2,
  });
};
