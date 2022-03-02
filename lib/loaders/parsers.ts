import fs from 'fs';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

export type FrontMatter = {
  content: string;
  data: Record<string, any>;
};

export function parseFrontMatter(path: string): FrontMatter {
  const contents = fs.readFileSync(path, 'utf-8');
  const parsed = matter(contents);
  return parsed;
}

export function parseMarkdownToHtml(markdownSource: string): string {
  return remark().use(remarkHtml).processSync(markdownSource).toString().trim();
}
