import { redirect } from '@tanstack/react-router';

export const LeaderboardPage = () => {
  // Redirect to default tab (leaderboard)
  throw redirect({
    to: '/leaderboard/leaderboard',
    replace: true,
  } as any);
};
