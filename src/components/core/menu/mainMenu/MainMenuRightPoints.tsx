import { FC } from 'react';
import { useWagmi } from 'libs/wagmi';
import { useUserPoints } from 'libs/queries/extApi/userPoints';
import { cn } from 'utils/helpers';

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
    <div
      className={cn(
        'font-title p-8 tab-focus rounded-lg',
        'flex items-center gap-4 text-14 sm:text-16',
      )}
      data-testid="user-points"
    >
      <span className="hidden sm:inline">Points:</span>
      <span className="font-medium">{formattedPoints}</span>
    </div>
  );
};
