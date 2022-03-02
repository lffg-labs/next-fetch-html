import { join } from 'path';
import { parseFrontMatter, parseMarkdownToHtml } from './parsers';

export type PageData = {
  slug: string;
  title: string;
  html: string;
};

export function loadPageData(slug: string, nodesPath: string): PageData {
  const path = join(nodesPath, slug);
  const fm = parseFrontMatter(path);

  return {
    slug,
    title: fm.data.title,
    html: parseMarkdownToHtml(fm.content)
  };
}
