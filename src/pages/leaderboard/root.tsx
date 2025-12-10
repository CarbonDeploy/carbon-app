import { LeaderboardSection } from 'components/leaderboard';
import { Page } from 'components/common/page';

export const LeaderboardPage = () => {
  return (
    <Page className="grid content-start gap-20 md:gap-32">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-24 md:text-32 font-weight-500 mb-8">
            Strategy Leaderboard
          </h1>
          <p className="text-14 md:text-16 text-white/60">
            Top performing strategies ranked by ROI
          </p>
        </div>
      </header>
      <LeaderboardSection />
    </Page>
  );
};
