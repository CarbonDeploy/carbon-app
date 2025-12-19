import { FC } from 'react';
import { Link } from '@tanstack/react-router';
import { useWagmi } from 'libs/wagmi';
import { useUserPoints } from 'libs/queries/extApi/userPoints';
import { PointsAnimation } from './MainMenuRightPointsAnimated';

export const MainMenuRightPoints: FC = () => {
  const { user } = useWagmi();
  const { data, isLoading, isError } = useUserPoints(user);

  // Only show when wallet is connected
  if (!user) {
    return null;
  }

  // Show 0 if loading, error, no data, or points is undefined/null/0
  const formattedPoints = isLoading
    ? '...'
    : isError || !data || typeof data.points !== 'number'
      ? '0'
      : Math.floor(data.points).toString();

  return (
    <PointsAnimation
      as={Link}
      to="/leaderboard/users"
      borderRadius="1.75rem"
      className="bg-black text-white text-16 flex items-center gap-8 px-16 py-8 glass-shadow cursor-pointer"
      borderClassName="btn-on-background brightness-150 opacity-100"
      containerClassName="h-auto w-auto"
      data-testid="user-points"
    >
      <span className="hidden sm:inline">Points:</span>
      <span>{formattedPoints}</span>
    </PointsAnimation>
  );
};
