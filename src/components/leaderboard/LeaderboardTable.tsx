import { FC } from 'react';
import { cn, prettifyNumber } from 'utils/helpers';
import { TokensOverlap } from 'components/common/tokensOverlap';
import { Link } from 'libs/routing';
import style from './LeaderboardTable.module.css';
import {
  PairWithRankData,
  formatROIRange,
  formatAPR,
  getRoiColor,
} from './utils';
import { RankBadge } from './RankBadge';
import { useToken } from 'hooks/useTokens';

interface LeaderboardTableProps {
  pairs: PairWithRankData[];
}

export const LeaderboardTable: FC<LeaderboardTableProps> = ({ pairs }) => {
  return (
    <table className={cn(style.table, 'table')}>
      <thead>
        <tr>
          <th className="w-[80px]">Rank</th>
          <th>Token Pair</th>
          <th>ROI Range</th>
          <th>7d APR</th>
          <th>30d APR</th>
          <th>Trades</th>
          <th>TVL</th>
          <th>Strategies</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {pairs.map((item) => (
          <LeaderboardRow
            key={`${item.pair.baseTokenAddress}-${item.pair.quoteTokenAddress}`}
            pairData={item}
          />
        ))}
      </tbody>
    </table>
  );
};

interface LeaderboardRowProps {
  pairData: PairWithRankData;
}

const LeaderboardRow: FC<LeaderboardRowProps> = ({ pairData }) => {
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
    <tr className="h-[70px]" style={{ animationDelay: `${rank * 20}ms` }}>
      <td className="py-12 pl-24">
        <RankBadge rank={rank} />
      </td>
      <td className="py-12 px-8">
        <div className="flex items-center gap-8">
          <TokensOverlap size={24} tokens={[baseToken, quoteToken]} />
          <span className="text-14 text-white/80">
            {baseToken.symbol}/{quoteToken.symbol}
          </span>
        </div>
      </td>
      <td className="py-12 px-8">
        <span
          className={cn('text-14 font-medium', getRoiColor(pair.roiRange.max))}
        >
          {formatROIRange(pair.roiRange.min, pair.roiRange.max)}
        </span>
      </td>
      <td className="py-12 px-8">
        <span className="text-14 text-white/80">{formatAPR(pair.apr7d)}</span>
      </td>
      <td className="py-12 px-8">
        <span className="text-14 text-white/80">{formatAPR(pair.apr30d)}</span>
      </td>
      <td className="py-12 px-8">
        <span className="text-14 text-white/80">
          {prettifyNumber(pair.totalTrades, { abbreviate: true, decimals: 0 })}
        </span>
      </td>
      <td className="py-12 px-8">
        <span className="text-14 text-white/80">
          ${prettifyNumber(pair.tvl, { abbreviate: true, decimals: 2 })}
        </span>
      </td>
      <td className="py-12 px-8">
        <span className="text-14 text-white/80">{pair.strategyCount}</span>
      </td>
      <td className="py-12 pr-24">
        <Link
          className="btn-primary"
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
      </td>
    </tr>
  );
};
