import { AnyStrategyWithFiat } from 'components/strategies/common/types';
import { prettifyNumber } from 'utils/helpers';

export interface StrategyWithROIData {
  strategy: AnyStrategyWithFiat;
  roi: number;
  rank: number;
}

export const formatROI = (roi: number): string => {
  return `${prettifyNumber(roi, { decimals: 2 })}%`;
};

export const getRoiColor = (roi: number): string => {
  if (roi > 10) return 'text-success';
  if (roi > 1) return 'text-white';
  return 'text-white/60';
};
