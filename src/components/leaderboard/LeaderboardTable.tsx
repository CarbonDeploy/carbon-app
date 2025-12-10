import { FC, useId } from 'react';
import { AnyStrategyWithFiat } from 'components/strategies/common/types';
import { cn, prettifyNumber } from 'utils/helpers';
import { Link } from 'libs/routing';
import { ReactComponent as IconStar } from 'assets/icons/star-fill.svg';
import { ReactComponent as IconDashboard } from 'assets/icons/dashboard.svg';
import { PairLogoName } from 'components/common/DisplayPair';
import { StrategyStatusTag } from 'components/strategies/overview/strategyBlock/StrategyBlockHeader';
import style from './LeaderboardTable.module.css';
import { StrategyWithROIData, formatROI, getRoiColor } from './utils';

interface LeaderboardTableProps {
  strategiesWithROI: StrategyWithROIData[];
}

export const LeaderboardTable: FC<LeaderboardTableProps> = ({
  strategiesWithROI,
}) => {
  return (
    <table className={cn(style.table, 'table')}>
      <thead>
        <tr>
          <th className="w-[80px]">Rank</th>
          <th>ID</th>
          <th>Token Pair</th>
          <th>Status</th>
          <th>Trades</th>
          <th>ROI</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {strategiesWithROI.map((item) => (
          <LeaderboardRow
            key={item.strategy.id}
            strategy={item.strategy}
            roi={item.roi}
            rank={item.rank}
          />
        ))}
      </tbody>
    </table>
  );
};

interface LeaderboardRowProps {
  strategy: AnyStrategyWithFiat;
  roi: number;
  rank: number;
}

const LeaderboardRow: FC<LeaderboardRowProps> = ({ strategy, roi, rank }) => {
  const id = useId();
  const { base, quote, status, tradeCount } = strategy;

  return (
    <tr
      key={id}
      id={id}
      className="h-[70px]"
      style={{ animationDelay: `${rank * 20}ms` }}
    >
      <td className="py-12 pl-24">
        <RankBadge rank={rank} />
      </td>
      <td className="py-12 px-8">
        <span className="text-14 text-white/80">{strategy.idDisplay}</span>
      </td>
      <td className="py-12 px-8">
        <div className="flex items-center gap-8">
          <PairLogoName pair={{ baseToken: base, quoteToken: quote }} />
        </div>
      </td>
      <td className="py-12 px-8">
        <StrategyStatusTag status={status} isExplorer={true} />
      </td>
      <td className="py-12 px-8">
        <span className="text-14 text-white/80">
          {prettifyNumber(tradeCount, { abbreviate: true, decimals: 0 })}
        </span>
      </td>
      <td className="py-12 px-8">
        <span className={cn('text-16 font-medium', getRoiColor(roi))}>
          {formatROI(roi)}
        </span>
      </td>
      <td className="py-12 pr-24">
        <Link
          to="/strategy/$id"
          params={{ id: strategy.id }}
          className="size-38 rounded-sm btn-on-surface grid place-items-center p-0"
        >
          <IconDashboard className="size-16" />
        </Link>
      </td>
    </tr>
  );
};

interface RankBadgeProps {
  rank: number;
}

const RankBadge: FC<RankBadgeProps> = ({ rank }) => {
  const isTopThree = rank <= 3;

  if (isTopThree) {
    return (
      <div
        className={cn(
          'inline-flex items-center justify-center gap-6 rounded-full px-10 py-6 min-w-[60px]',
          rank === 1 && 'bg-yellow-500/10 text-yellow-500',
          rank === 2 && 'bg-gray-400/10 text-gray-400',
          rank === 3 && 'bg-orange-600/10 text-orange-600',
        )}
      >
        <IconStar className="size-14" />
        <span className="text-14 font-bold">{rank}</span>
      </div>
    );
  }

  return <span className="text-14 text-white/60 font-medium">#{rank}</span>;
};
