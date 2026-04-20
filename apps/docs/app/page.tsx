import React from 'react';
import { SidePanel } from '@/components';
import { ScenarioCard } from '@/components/features';
import { getPlots } from '@/lib/posts';
import { PLOT_SLUGS } from '@/plots';
import { Card } from '@repo/ui/index';

const MainPage = async () => {
  const allPlots = await getPlots([...PLOT_SLUGS]);

  return (
    <>
      <SidePanel title="시나리오 리스트" />
      <main className="h-full min-h-0 w-full overflow-y-auto focus:outline-hidden">
        <Card className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {allPlots.map(p => (
            <ScenarioCard key={p.slug} scenario={p} />
          ))}
        </Card>
      </main>
    </>
  );
};

export default MainPage;
