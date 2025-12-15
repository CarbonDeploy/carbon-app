import { LeaderboardSection } from 'components/leaderboard';
import { Page } from 'components/common/page';

export const LeaderboardPage = () => {
  return (
    <Page className="grid content-start gap-16 md:gap-24">
      <header className="flex flex-col gap-8">
        <h1 className="text-24 md:text-32 font-medium text-white">
          Trading Pairs Leaderboard
        </h1>
        <p className="text-14 md:text-16 text-white/60">
          Top performing trading pairs ranked by Return on TVL
        </p>
      </header>
      <LeaderboardSection />
    </Page>
  );
};
