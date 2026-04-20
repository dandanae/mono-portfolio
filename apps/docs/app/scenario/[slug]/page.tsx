import { notFound } from 'next/navigation';
import React from 'react';
import { ScenarioInfo, ScenarioPercent, ScrollMain, SidePanel } from '@/components';
import Title from '@/components/features/plot/Title';
import { getPlot } from '@/lib/posts';
import { PLOT_SLUGS } from '@/plots/index';
import { PlotInfo } from '@/plots/types';
import { Card } from '@repo/ui';

export async function generateStaticParams() {
  return PLOT_SLUGS.map(slug => ({
    slug: slug,
  }));
}

const ScenarioPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  if (!PLOT_SLUGS.includes(slug as any)) {
    notFound();
  }

  const { Content, metadata, infos } = await getPlot(slug);

  return (
    <>
      <SidePanel title={metadata.title}>
        <ScenarioPercent className="absolute top-4 right-4" />
        <ScenarioInfo infos={infos as PlotInfo[]} metadata={metadata} />
      </SidePanel>
      <ScrollMain className="no-scroll h-full min-h-0 w-full overflow-y-auto focus:outline-hidden">
        <Card>
          <Title title={metadata.title} writer={metadata.writer} line={metadata.line} />
          {Content && <Content />}
        </Card>
      </ScrollMain>
    </>
  );
};

export default ScenarioPage;
