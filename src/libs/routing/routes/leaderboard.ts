import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './root';
import { LeaderboardPage } from 'pages/leaderboard/root';

export const leaderboardPage = createRoute({
  getParentRoute: () => rootRoute,
  path: '/leaderboard',
  component: LeaderboardPage,
});
