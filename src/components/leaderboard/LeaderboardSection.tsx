import { FC, useMemo, useState } from 'react';
import { LeaderboardTable } from './LeaderboardTable';
import { LeaderboardList } from './LeaderboardList';
import { useROI, StrategyROI } from 'libs/queries/extApi/roi';
import { NotFound } from 'components/common/NotFound';
import { CarbonLogoLoading } from 'components/common/CarbonLogoLoading';
import { useGetStrategyList } from 'libs/queries/sdk/strategy';
import { useBreakpoints } from 'hooks/useBreakpoints';
import { StrategyFilterDropdown } from 'components/explorer/strategies/StrategyFilterSort';
import { StrategyFilter } from 'components/explorer/strategies/utils';
import { useGetEnrichedStrategies } from 'hooks/useStrategies';

export interface StrategyWithROI {
  roi: StrategyROI;
  rank: number;
}

export const LeaderboardSection: FC = () => {
  const { data: roiData, status: roiStatus, error: roiError } = useROI();
  const [filter, setFilter] = useState<StrategyFilter>({ status: 'all' });

  const positiveROIStrategies = useMemo(() => {
    return roiData?.filter((s) => s.ROI > 0.01) || [];
  }, [roiData]);

  const strategyIds = useMemo(() => {
    return positiveROIStrategies.map((s) => s.id);
  }, [positiveROIStrategies]);

  const strategyQuery = useGetStrategyList(strategyIds);

  const { data: strategies, isPending: strategiesLoading } =
    useGetEnrichedStrategies(strategyQuery);

  const { aboveBreakpoint } = useBreakpoints();

  const strategiesStatus = strategiesLoading ? 'pending' : 'success';
  const strategiesError = strategyQuery.error;

  const strategiesWithROI = useMemo(() => {
    if (!strategies || strategies.length === 0) return [];

    return positiveROIStrategies
      .map((roiItem) => {
        const strategy = strategies.find((s) => s.id === roiItem.id);
        if (!strategy) return null;
        return {
          strategy,
          roi: roiItem.ROI,
        };
      })
      .filter((item) => item !== null);
  }, [strategies, positiveROIStrategies]);

  const filtered = useMemo(() => {
    const result = strategiesWithROI.filter((item) => {
      if (filter.status === 'active' && item.strategy.status !== 'active') {
        return false;
      }
      if (filter.status === 'inactive' && item.strategy.status === 'active') {
        return false;
      }
      return true;
    });

    return result.map((item, index) => ({
      ...item,
      rank: index + 1,
    }));
  }, [strategiesWithROI, filter]);

  const isLoading = roiStatus === 'pending' || strategiesStatus === 'pending';
  const hasError = roiError || strategiesError;

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
        text="There was an error loading the strategy data. Please try again later."
        className="surface rounded-2xl"
      />
    );
  }

  if (strategiesWithROI.length === 0) {
    return (
      <NotFound
        variant="error"
        title="No strategies found"
        text="There are no strategies with positive ROI at the moment."
        className="surface rounded-2xl"
      />
    );
  }

  return (
    <div className="grid gap-20 md:gap-32 grid-cols-[auto_1fr] auto-rows-auto">
      <div className="bg-main-900/20 text-white/60 flex gap-24 rounded-full px-16 py-8 border border-main-500/40 text-12 md:text-14">
        <span>Total Strategies: {filtered.length}</span>
      </div>
      <div
        role="toolbar"
        className="grid grid-flow-col items-center justify-end gap-16"
      >
        <StrategyFilterDropdown filter={filter} setFilter={setFilter} />
      </div>
      <div className="col-span-2">
        {filtered.length === 0 ? (
          <NotFound
            variant="info"
            title="No results found"
            text="Try changing the filter options"
            className="surface rounded-2xl"
          />
        ) : aboveBreakpoint('lg') ? (
          <LeaderboardTable strategiesWithROI={filtered} />
        ) : (
          <LeaderboardList strategiesWithROI={filtered} />
        )}
      </div>
    </div>
  );
};
