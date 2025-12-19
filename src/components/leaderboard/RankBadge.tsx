import { FC } from 'react';
import { cn } from 'utils/helpers';
import IconStar from 'assets/icons/star-fill.svg?react';

interface RankBadgeProps {
  rank: number;
  size?: 'sm' | 'md';
}

export const RankBadge: FC<RankBadgeProps> = ({ rank, size = 'md' }) => {
  const isTopThree = rank <= 3;
  const isSmall = size === 'sm';

  if (isTopThree) {
    return (
      <div
        className={cn(
          'inline-flex items-center justify-center gap-6 rounded-full',
          isSmall ? 'size-40' : 'px-10 py-6 min-w-[60px]',
          rank === 1 && 'bg-yellow-500/10 text-yellow-500',
          rank === 2 && 'bg-gray-400/10 text-gray-400',
          rank === 3 && 'bg-orange-600/10 text-orange-600',
        )}
      >
        <IconStar className={isSmall ? 'size-20' : 'size-14'} />
        {!isSmall && <span className="text-14 font-bold">{rank}</span>}
      </div>
    );
  }

  // Show badge for all ranks (both small and medium sizes)
  return (
    <div
      className={cn(
        'bg-main-600 flex items-center justify-center rounded-full',
        isSmall ? 'size-40' : 'size-40',
      )}
    >
      <span
        className={cn(
          'text-white/60 font-medium',
          isSmall ? 'text-14' : 'text-14',
        )}
      >
        {rank}
      </span>
    </div>
  );
};
