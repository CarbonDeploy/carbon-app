import { Outlet } from 'libs/routing';
import { LeaderboardTabs } from 'components/leaderboard/LeaderboardTabs';
import { Page } from 'components/common/page';

export const LeaderboardLayout = () => {
  return (
    <Page className="gap-16 md:gap-24">
      <header className="flex flex-col gap-8">
        <h1 className="text-24 md:text-32 font-medium text-white">
          Leaderboard
        </h1>
        <p className="text-14 md:text-16 text-white/60">
          Top performing users and trading pairs on DNAX
        </p>
      </header>
      <LeaderboardTabs url="/leaderboard" />
      <Outlet />
    </Page>
  );
};
