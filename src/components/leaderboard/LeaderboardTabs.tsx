import { Link, useMatchRoute } from 'libs/routing';
import { ReactNode } from 'react';
import IconPairs from 'assets/icons/pairs.svg?react';
import IconWallet from 'assets/icons/wallet.svg?react';

export interface LeaderboardTab {
  label: string;
  href: 'users' | 'pairs';
  icon?: ReactNode;
  testid: string;
}

const tabs: LeaderboardTab[] = [
  {
    label: 'Pairs',
    href: 'pairs',
    icon: <IconPairs className="hidden md:block size-24" />,
    testid: 'pairs-tab',
  },
  {
    label: 'Users',
    href: 'users',
    icon: <IconWallet className="hidden md:block size-24" />,
    testid: 'users-tab',
  },
];

interface Props {
  url: '/leaderboard';
}

export const LeaderboardTabs = ({ url }: Props) => {
  const match = useMatchRoute();

  return (
    <nav
      aria-label="leaderboard tabs"
      className="tab-list text-16 sm:text-20 flex sm:place-self-start sm:gap-8 md:gap-16 grid-area-[tabs] rounded-2xl"
      data-testid="leaderboard-tabs"
    >
      {tabs.map(({ label, href, icon, testid }) => {
        const active = match({
          to: `${url}/${href}`,
          fuzzy: false,
        });

        return (
          <Link
            from={url}
            to={href}
            key={href}
            className="grow sm:grow-0 px-8 py-4 font-title font-normal text-white/60 flex gap-8 items-center justify-center sm:px-16 sm:py-8 aria-page:tab-focus tab-anchor"
            resetScroll={false}
            aria-current={active ? 'page' : 'false'}
            data-testid={testid}
          >
            {icon}
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
