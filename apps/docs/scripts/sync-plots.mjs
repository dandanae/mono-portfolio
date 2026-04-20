import fs from 'fs';
import path from 'path';

const PLOTS_PATH = path.join(process.cwd(), 'plots');
const OUTPUT_FILE = path.join(process.cwd(), 'plots/index.ts');

const EXCLUDE = ['types.ts', 'index.ts'];

function generate() {
  const folders = fs
    .readdirSync(PLOTS_PATH, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && !EXCLUDE.includes(dirent.name))
    .map(dirent => dirent.name);

  const content = `// This file is auto-generated. Do not edit manually.
export const PLOT_SLUGS = ${JSON.stringify(folders, null, 2)} as const;

export type PlotSlug = (typeof PLOT_SLUGS)[number];
`;

  fs.writeFileSync(OUTPUT_FILE, content);
  console.log(`✅ Successfully generated ${folders.length} plot slugs.`);
}

generate();
