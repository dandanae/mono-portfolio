import type { PlotData, PlotInfo, PlotMetadata, PlotPost } from '@/plots/types';

/** 전역 기본값  */
const DEFAULT_METADATA: PlotMetadata = {
  href: '',
  title: '',
  writer: '',
  summary: '',
  line: '',
  image: { src: '', alt: '', width: 0, height: 0 },
};

export const getPlot = async (slug: string): Promise<PlotData> => {
  try {
    const [contentModule, metadataModule] = await Promise.all([
      import(`../plots/${slug}/Content`).catch(() => ({ default: null })),
      import(`../plots/${slug}/metadata`).catch(() => ({
        metadata: DEFAULT_METADATA,
        infos: [] as PlotInfo[],
      })),
    ]);

    return {
      Content: contentModule.default,
      metadata: { ...DEFAULT_METADATA, ...metadataModule.metadata, slug },
      infos: metadataModule.infos || [],
    };
  } catch (error) {
    console.error(`[getScenario] Critical error loading ${slug}:`, error);
    return {
      Content: null,
      metadata: { ...DEFAULT_METADATA, title: 'Error' },
      infos: [],
    };
  }
};

export const getPlots = async (slugs: string[]): Promise<PlotPost[]> => {
  const posts = await Promise.all(
    slugs.map(async slug => {
      const { metadata } = await getPlot(slug);
      return { ...metadata, slug };
    }),
  );

  return posts.sort((a, b) => a.title.localeCompare(b.title, 'ko'));
};
