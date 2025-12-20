import { createRoute, redirect } from '@tanstack/react-router';
import { rootRoute } from './root';
import { LeaderboardLayout } from 'pages/leaderboard/layout';
import { LeaderboardUsersPage } from 'pages/leaderboard/users';
import { LeaderboardPairsPage } from 'pages/leaderboard/pairs';

export const leaderboardLayout = createRoute({
  getParentRoute: () => rootRoute,
  path: '/leaderboard',
  component: LeaderboardLayout,
  beforeLoad: ({ location }) => {
    // Redirect exact /leaderboard path to default tab
    const ends = ['/leaderboard', '/leaderboard/'];
    for (const end of ends) {
      if (location.pathname.endsWith(end)) {
        throw redirect({
          to: '/leaderboard/users',
          replace: true,
        } as any);
      }
    }
  },
});

export const leaderboardPointsPage = createRoute({
  getParentRoute: () => leaderboardLayout,
  path: 'users',
  component: LeaderboardUsersPage,
});

export const leaderboardPairsPage = createRoute({
  getParentRoute: () => leaderboardLayout,
  path: 'pairs',
  component: LeaderboardPairsPage,
});
