import { FC } from 'react';
import { cn, prettifyNumber } from 'utils/helpers';
import { TokensOverlap } from 'components/common/tokensOverlap';
import { Link } from 'libs/routing';
import {
  PairWithRankData,
  formatROIRange,
  formatAPR,
  getRoiColor,
} from './utils';
import { RankBadge } from './RankBadge';
import { useToken } from 'hooks/useTokens';

interface LeaderboardListProps {
  pairs: PairWithRankData[];
}

export const LeaderboardList: FC<LeaderboardListProps> = ({ pairs }) => {
  return (
    <div className="grid gap-16">
      {pairs.map((item) => (
        <LeaderboardCard
          key={`${item.pair.baseTokenAddress}-${item.pair.quoteTokenAddress}`}
          pairData={item}
        />
      ))}
    </div>
  );
};

interface LeaderboardCardProps {
  pairData: PairWithRankData;
}

const LeaderboardCard: FC<LeaderboardCardProps> = ({ pairData }) => {
  const { pair, rank } = pairData;

  const { token: baseToken, isPending: baseLoading } = useToken(
    pair.baseTokenAddress,
  );
  const { token: quoteToken, isPending: quoteLoading } = useToken(
    pair.quoteTokenAddress,
  );

  if (baseLoading || quoteLoading || !baseToken || !quoteToken) {
    return null;
  }

  return (
    <div className="surface rounded-2xl p-16">
      <div className="flex items-start justify-between gap-12 mb-16">
        <div className="flex items-center gap-12">
          <RankBadge rank={rank} size="sm" />

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-8">
              <TokensOverlap size={24} tokens={[baseToken, quoteToken]} />
              <h3 className="text-16 font-medium text-white">
                {baseToken.symbol}/{quoteToken.symbol}
              </h3>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-4">
          <span className="text-12 text-white/60">ROI Range</span>
          <span
            className={cn('text-16 font-bold', getRoiColor(pair.roiRange.max))}
          >
            {formatROIRange(pair.roiRange.min, pair.roiRange.max)}
          </span>
        </div>
      </div>

      <hr className="border-main-700 mb-16" />

      <div className="grid grid-cols-2 gap-x-12 gap-y-16 text-14 mb-16">
        <div className="flex flex-col gap-4">
          <span className="text-12 text-white/60">7d APR</span>
          <span className="text-white/80 font-medium">
            {formatAPR(pair.apr7d)}
          </span>
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-12 text-white/60">30d APR</span>
          <span className="text-white/80 font-medium">
            {formatAPR(pair.apr30d)}
          </span>
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-12 text-white/60">Trades</span>
          <span className="text-white/80 font-medium">
            {prettifyNumber(pair.totalTrades, {
              abbreviate: true,
              decimals: 0,
            })}
          </span>
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-12 text-white/60">TVL</span>
          <span className="text-white/80 font-medium">
            ${prettifyNumber(pair.tvl, { abbreviate: true, decimals: 2 })}
          </span>
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-12 text-white/60">Strategies</span>
          <span className="text-white/80 font-medium">
            {pair.strategyCount}
          </span>
        </div>
      </div>

      <Link
        className="btn-primary w-full"
        to="/trade/disposable"
        search={{
          base: pair.baseTokenAddress,
          quote: pair.quoteTokenAddress,
          direction: 'sell',
          settings: 'limit',
        }}
      >
        Create Position
      </Link>
    </div>
  );
};
