import { FC, useMemo } from 'react';
import { LeaderboardTable } from './LeaderboardTable';
import { LeaderboardList } from './LeaderboardList';
import { useROI } from 'libs/queries/extApi/roi';
import { NotFound } from 'components/common/NotFound';
import { CarbonLogoLoading } from 'components/common/CarbonLogoLoading';
import { useBreakpoints } from 'hooks/useBreakpoints';
import { calculateReturnOnTVL } from './utils';

export const LeaderboardSection: FC = () => {
  const { data: roiData, status: roiStatus, error: roiError } = useROI();

  const { aboveBreakpoint } = useBreakpoints();

  // Rank pairs using Return on TVL Ratio methodology
  const rankedPairs = useMemo(() => {
    if (!roiData) return [];

    // Minimum TVL threshold to filter out unreliable pairs ($1,000)
    const MIN_TVL = 1000;

    // Filter pairs with positive ROI and meaningful TVL, then calculate Return on TVL
    const filtered = roiData
      .filter((pair) => pair.roiRange.max > 0.01 && pair.tvl >= MIN_TVL)
      .map((pair) => ({
        pair,
        returnOnTVL: calculateReturnOnTVL(pair),
      }))
      .filter((item) => !isNaN(item.returnOnTVL) && isFinite(item.returnOnTVL))
      .sort((a, b) => b.returnOnTVL - a.returnOnTVL);

    // Add rank
    return filtered.map((item, index) => ({
      pair: item.pair,
      rank: index + 1,
    }));
  }, [roiData]);

  const isLoading = roiStatus === 'pending';
  const hasError = roiError;

  if (isLoading) {
    return (
      <div className="grid place-items-center md:min-h-[600px]">
        <CarbonLogoLoading className="h-[80px]" />
      </div>
    );
  }

  if (hasError) {
    return (
      <NotFound
        variant="error"
        title="Failed to load leaderboard"
        text="There was an error loading the pair data. Please try again later."
        className="surface rounded-2xl"
      />
    );
  }

  if (rankedPairs.length === 0) {
    return (
      <NotFound
        variant="error"
        title="No trading pairs found"
        text="There are no trading pairs with positive ROI at the moment."
        className="surface rounded-2xl"
      />
    );
  }

  return (
    <div className="grid gap-16 md:gap-24">
      <div className="bg-main-900/20 text-white/60 flex items-center gap-16 rounded-full px-16 md:px-20 py-10 border border-main-500/40 text-12 md:text-14 w-fit">
        <span className="font-medium">
          Total Pairs: <span className="text-white">{rankedPairs.length}</span>
        </span>
      </div>
      {aboveBreakpoint('lg') ? (
        <LeaderboardTable pairs={rankedPairs} />
      ) : (
        <LeaderboardList pairs={rankedPairs} />
      )}
    </div>
  );
};
