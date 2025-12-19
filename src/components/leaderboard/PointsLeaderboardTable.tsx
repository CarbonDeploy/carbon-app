import { FC } from 'react';
import { cn, prettifyNumber } from 'utils/helpers';
import { useNavigate } from 'libs/routing';
import style from './LeaderboardTable.module.css';
import { UserPointsResponse } from 'libs/queries/extApi/userPoints';
import { RankBadge } from './RankBadge';

export interface UserPointsWithRank {
  user: UserPointsResponse;
  rank: number;
}

interface PointsLeaderboardTableProps {
  users: UserPointsWithRank[];
}

export const PointsLeaderboardTable: FC<PointsLeaderboardTableProps> = ({
  users,
}) => {
  return (
    <table className={cn(style.table, 'table')}>
      <thead>
        <tr>
          <th className="w-[80px]">Rank</th>
          <th>Wallet Address</th>
          <th>Total Strategies Volume</th>
          <th>Points</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {users.map((item) => (
          <PointsLeaderboardRow key={item.user.walletAddress} userData={item} />
        ))}
      </tbody>
    </table>
  );
};

interface PointsLeaderboardRowProps {
  userData: UserPointsWithRank;
}

const PointsLeaderboardRow: FC<PointsLeaderboardRowProps> = ({ userData }) => {
  const { user, rank } = userData;
  const navigate = useNavigate();

  const handleViewStrategies = () => {
    navigate({
      to: '/explore',
      search: { search: user.walletAddress },
    });
  };

  return (
    <tr className="h-[70px]" style={{ animationDelay: `${rank * 20}ms` }}>
      <td className="py-12 pl-24">
        <RankBadge rank={rank} />
      </td>
      <td className="py-12 px-8">
        <span className="text-14 text-white/80 font-mono">
          {user.walletAddress}
        </span>
      </td>
      <td className="py-12 px-8">
        <span className="text-14 text-white/80 font-medium">
          ${prettifyNumber(user.totalVolume, { decimals: 2, abbreviate: true })}
        </span>
      </td>
      <td className="py-12 px-8">
        <span className="text-14 text-white/80 font-medium">
          {prettifyNumber(user.points, { decimals: 2, abbreviate: false })}
        </span>
      </td>
      <td className="py-12 pr-24">
        <button
          className="btn-primary"
          onClick={handleViewStrategies}
          type="button"
        >
          View Strategies
        </button>
      </td>
    </tr>
  );
};
