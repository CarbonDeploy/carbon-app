import { Pathnames } from 'libs/routing';
import { isProduction } from 'utils/helpers';
import config from 'config';

export interface MenuItem {
  label: string;
  href: Pathnames;
  testid: string;
}

export const getMenuItems = (user?: string) => {
  const items = [
    {
      label: 'Swap',
      href: '/swap',
      testid: 'swap-page',
    },
    {
      label: 'Trade',
      href: '/trade',
      testid: 'trade-page',
    },
    {
      label: 'Explore',
      href: '/explore',
      testid: 'explore-page',
    },
    {
      label: 'Leaderboard',
      href: '/leaderboard',
      testid: 'leaderboard-page',
    },
  ];
  if (user) {
    items.splice(1, 0, {
      label: 'Portfolio',
      href: '/portfolio',
      testid: 'my-strategies-page',
    });
  }
  if (config.ui.showSimulator) {
    items.push({
      label: 'Simulate',
      href: '/simulate',
      testid: 'simulate-page',
    });
  }
  if (!isProduction) {
    items.push({
      label: 'Debug',
      href: '/debug',
      testid: 'debug-page',
    });
  }
  return items;
};

export const menuItems: MenuItem[] = [
  {
    label: 'Swap',
    href: '/swap',
    testid: 'swap-page',
  },
  {
    label: 'Portfolio',
    href: '/portfolio',
    testid: 'my-strategies-page',
  },
  {
    label: 'Trade',
    href: '/trade',
    testid: 'trade-page',
  },
  {
    label: 'Explore',
    href: '/explore',
    testid: 'explore-page',
  },
  {
    label: 'Leaderboard',
    href: '/leaderboard',
    testid: 'leaderboard-page',
  },
  ...(!config.ui.showSimulator
    ? []
    : [
        {
          label: 'Simulate',
          href: '/simulate',
          testid: 'simulate-page',
        } as MenuItem,
      ]),
  ...(isProduction
    ? []
    : [
        {
          label: 'Debug',
          href: '/debug',
          testid: 'debug-page',
        } as MenuItem,
      ]),
];
