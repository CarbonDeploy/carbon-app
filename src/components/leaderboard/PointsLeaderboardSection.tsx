import { FC, useMemo } from 'react';
import { PointsLeaderboardTable } from './PointsLeaderboardTable';
import { PointsLeaderboardList } from './PointsLeaderboardList';
import { usePointsLeaderboard } from 'libs/queries/extApi/userPoints';
import { NotFound } from 'components/common/NotFound';
import { CarbonLogoLoading } from 'components/common/CarbonLogoLoading';
import { useBreakpoints } from 'hooks/useBreakpoints';
import { UserPointsWithRank } from './PointsLeaderboardTable';

export const PointsLeaderboardSection: FC = () => {
  const {
    data: pointsData,
    status: pointsStatus,
    error: pointsError,
  } = usePointsLeaderboard();

  const { aboveBreakpoint } = useBreakpoints();

  const rankedUsers = useMemo(() => {
    if (!pointsData || !Array.isArray(pointsData)) return [];

    const sorted = [...pointsData]
      .filter((user) => user && user.points > 0)
      .sort((a, b) => b.points - a.points);

    return sorted.map((user, index) => ({
      user,
      rank: index + 1,
    })) as UserPointsWithRank[];
  }, [pointsData]);

  const isLoading = pointsStatus === 'pending';
  const hasError = !!pointsError;

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
        text="There was an error loading the points data. Please try again later."
        className="surface rounded-2xl"
      />
    );
  }

  if (rankedUsers.length === 0) {
    return (
      <NotFound
        variant="error"
        title="No users found"
        text="There are no users with points at the moment."
        className="surface rounded-2xl"
      />
    );
  }

  return (
    <div className="grid gap-16 md:gap-24">
      {aboveBreakpoint('lg') ? (
        <PointsLeaderboardTable users={rankedUsers} />
      ) : (
        <PointsLeaderboardList users={rankedUsers} />
      )}
    </div>
  );
};
