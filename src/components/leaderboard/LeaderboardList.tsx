import { FC } from 'react';
import { AnyStrategyWithFiat } from 'components/strategies/common/types';
import { cn, prettifyNumber } from 'utils/helpers';
import { Link } from 'libs/routing';
import { ReactComponent as IconStar } from 'assets/icons/star-fill.svg';
import { TokensOverlap } from 'components/common/tokensOverlap';
import { PairName } from 'components/common/DisplayPair';
import { StrategyStatusTag } from 'components/strategies/overview/strategyBlock/StrategyBlockHeader';
import { StrategyWithROIData, formatROI, getRoiColor } from './utils';

interface LeaderboardListProps {
  strategiesWithROI: StrategyWithROIData[];
}

export const LeaderboardList: FC<LeaderboardListProps> = ({
  strategiesWithROI,
}) => {
  return (
    <div className="grid gap-12">
      {strategiesWithROI.map((item) => (
        <LeaderboardCard
          key={item.strategy.id}
          strategy={item.strategy}
          roi={item.roi}
          rank={item.rank}
        />
      ))}
    </div>
  );
};

interface LeaderboardCardProps {
  strategy: AnyStrategyWithFiat;
  roi: number;
  rank: number;
}

const LeaderboardCard: FC<LeaderboardCardProps> = ({ strategy, roi, rank }) => {
  const isTopThree = rank <= 3;
  const { base, quote, status, tradeCount } = strategy;

  return (
    <Link
      to="/strategy/$id"
      params={{ id: strategy.id }}
      className="surface hover:bg-main-700 rounded-16 p-16 transition-colors"
    >
      <div className="flex items-start justify-between gap-12 mb-12">
        <div className="flex items-center gap-12">
          {isTopThree ? (
            <div
              className={cn(
                'flex size-40 items-center justify-center rounded-full shrink-0',
                rank === 1 && 'bg-yellow-500/10',
                rank === 2 && 'bg-gray-400/10',
                rank === 3 && 'bg-orange-600/10',
              )}
            >
              <IconStar
                className={cn(
                  'size-20',
                  rank === 1 && 'text-yellow-500',
                  rank === 2 && 'text-gray-400',
                  rank === 3 && 'text-orange-600',
                )}
              />
            </div>
          ) : (
            <div className="bg-main-600 flex size-40 items-center justify-center rounded-full shrink-0">
              <span className="text-14 text-white/60 font-medium">{rank}</span>
            </div>
          )}

          <div className="flex flex-col gap-4">
            <span className="text-12 text-white/60">Rank #{rank}</span>
            <div className="flex items-center gap-8">
              <TokensOverlap size={20} tokens={[base, quote]} />
              <h3 className="text-16 font-medium">
                <PairName baseToken={base} quoteToken={quote} />
              </h3>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-4">
          <span className="text-12 text-white/60">ROI</span>
          <span className={cn('text-18 font-bold', getRoiColor(roi))}>
            {formatROI(roi)}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-12 text-12 flex-wrap">
        <span className="text-white/60">ID: {strategy.idDisplay}</span>
        <svg width="4" height="4" role="separator">
          <circle cx="2" cy="2" r="2" fill="currentcolor" />
        </svg>
        <StrategyStatusTag status={status} isExplorer={true} />
        <svg width="4" height="4" role="separator">
          <circle cx="2" cy="2" r="2" fill="currentcolor" />
        </svg>
        <span className="text-white/60">
          Trades:{' '}
          {prettifyNumber(tradeCount, { abbreviate: true, decimals: 0 })}
        </span>
      </div>
    </Link>
  );
};
