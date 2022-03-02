import fs from 'fs';
import { extname, join } from 'path';
import { parseFrontMatter } from './parsers';

export type GraphNode = {
  slug: string;
  graphLabel: string;
  // more props...
};

export function loadRawGraphData(nodesPath: string): GraphNode[] {
  return fs
    .readdirSync(nodesPath, { withFileTypes: true })
    .filter((dirent) => dirent.isFile() && extname(dirent.name) === '.md')
    .map(({ name: slug }) => ({
      path: join(nodesPath, slug),
      slug
    }))
    .map(({ slug, path }) => {
      const fm = parseFrontMatter(path);
      const graphLabel = fm.data.graphLabel;
      if (!graphLabel) {
        throw new Error(
          `Missing required "graphLabel" property at "${path}" front-matter.`
        );
      }
      return { graphLabel, slug };
    });
}
