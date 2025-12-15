import { PairROI } from 'libs/queries/extApi/roi';
import { prettifyNumber } from 'utils/helpers';

export interface PairWithRankData {
  pair: PairROI;
  rank: number;
}

export const calculateReturnOnTVL = (pair: PairROI): number => {
  const maxROI = pair.roiRange.max;
  const avgAPR = (pair.apr7d + pair.apr30d) / 2;
  const tvl = pair.tvl;

  // Return on TVL = (maxROI × avgAPR) / log(TVL + 1)
  return (maxROI * avgAPR) / Math.log(tvl + 1);
};

export const formatROIRange = (min: number, max: number): string => {
  // Show minimum of 0.01 for display purposes
  const displayMin = min < 0.01 ? 0.01 : min;
  return `${prettifyNumber(displayMin, { decimals: 2 })} - ${prettifyNumber(max, { decimals: 2 })}%`;
};

export const formatAPR = (apr: number): string => {
  return `${prettifyNumber(apr, { decimals: 2 })}%`;
};

export const getRoiColor = (roi: number): string => {
  if (roi > 10) return 'text-success';
  if (roi > 1) return 'text-white';
  return 'text-white/60';
};
