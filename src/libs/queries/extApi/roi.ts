import { useQuery } from '@tanstack/react-query';
import { QueryKey } from '../queryKey';
import { carbonApi } from 'utils/carbonApi';
import { FIVE_MIN_IN_MS } from 'utils/time';

export interface PairROI {
  baseTokenAddress: string;
  quoteTokenAddress: string;
  roiRange: {
    min: number;
    max: number;
  };
  apr7d: number;
  apr30d: number;
  tvl: number;
  totalTrades: number;
  strategyCount: number;
  strategies: Array<{
    id: string;
    ROI: number;
    trades: number;
  }>;
}

export const useROI = () => {
  return useQuery({
    queryKey: QueryKey.roi(),
    queryFn: () =>
      carbonApi
        .getROI()
        .then((res) => res)
        .catch((err) => {
          console.error(err);
          return [] as PairROI[];
        }),
    refetchInterval: FIVE_MIN_IN_MS,
    staleTime: FIVE_MIN_IN_MS,
    retry: 2,
    refetchOnWindowFocus: false,
  });
};
