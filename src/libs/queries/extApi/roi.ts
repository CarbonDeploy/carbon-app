import { useQuery } from '@tanstack/react-query';
import { QueryKey } from '../queryKey';
import { carbonApi } from 'utils/carbonApi';
import { FIVE_MIN_IN_MS } from 'utils/time';

export interface StrategyROI {
  id: string;
  ROI: number;
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
          return [] as StrategyROI[];
        }),
    refetchInterval: FIVE_MIN_IN_MS,
    staleTime: FIVE_MIN_IN_MS,
    retry: 2,
    refetchOnWindowFocus: false,
  });
};
