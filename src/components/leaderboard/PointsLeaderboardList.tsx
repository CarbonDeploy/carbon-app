import { FC } from 'react';
import { prettifyNumber } from 'utils/helpers';
import { useNavigate } from 'libs/routing';
import { UserPointsWithRank } from './PointsLeaderboardTable';
import { RankBadge } from './RankBadge';

interface PointsLeaderboardListProps {
  users: UserPointsWithRank[];
}

export const PointsLeaderboardList: FC<PointsLeaderboardListProps> = ({
  users,
}) => {
  return (
    <div className="grid gap-16">
      {users.map((item) => (
        <PointsLeaderboardCard key={item.user.walletAddress} userData={item} />
      ))}
    </div>
  );
};

interface PointsLeaderboardCardProps {
  userData: UserPointsWithRank;
}

const PointsLeaderboardCard: FC<PointsLeaderboardCardProps> = ({
  userData,
}) => {
  const { user, rank } = userData;
  const navigate = useNavigate();

  const handleViewStrategies = () => {
    navigate({
      to: '/explore',
      search: { search: user.walletAddress },
    });
  };

  return (
    <div className="surface rounded-2xl p-16">
      <div className="flex items-start justify-between gap-12 mb-16">
        <div className="flex items-center gap-12">
          <RankBadge rank={rank} size="sm" />

          <div className="flex flex-col gap-4">
            <h3 className="text-16 font-medium text-white font-mono break-all">
              {user.walletAddress}
            </h3>
          </div>
        </div>
      </div>

      <hr className="border-main-700 mb-16" />

      <div className="grid grid-cols-2 gap-x-12 gap-y-16 text-14 mb-16">
        <div className="flex flex-col gap-4">
          <span className="text-12 text-white/60">Total Strategies Volume</span>
          <span className="text-white/80 font-medium">
            $
            {prettifyNumber(user.totalVolume, {
              decimals: 2,
              abbreviate: true,
            })}
          </span>
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-12 text-white/60">Points</span>
          <span className="text-white/80 font-medium">
            {prettifyNumber(user.points, { decimals: 2, abbreviate: false })}
          </span>
        </div>
      </div>

      <button
        className="btn-primary w-full"
        onClick={handleViewStrategies}
        type="button"
      >
        View Strategies
      </button>
    </div>
  );
};
