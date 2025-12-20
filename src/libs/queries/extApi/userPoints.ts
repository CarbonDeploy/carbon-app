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

const BASE_URL =
  'https://dna-perp-dex-prod-y7fqo.ondigitalocean.app/api/api/users';

const fetchUserPoints = async (
  walletAddress: string,
): Promise<UserPointsResponse> => {
  try {
    const url = `${BASE_URL}/${walletAddress}/volume`;
    const response = await fetch(url);

    if (response.status === 404) {
      return {
        walletAddress,
        dexVolume: 0,
        spotVolume: 0,
        totalVolume: 0,
        points: 0,
      };
    }

    return response.json();
  } catch (error) {
    return {
      walletAddress,
      dexVolume: 0,
      spotVolume: 0,
      totalVolume: 0,
      points: 0,
    };
  }
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
    const url = `${BASE_URL}/*/volume`;
    const response = await fetch(url);
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
