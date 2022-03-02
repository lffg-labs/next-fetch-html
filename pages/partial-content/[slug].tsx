import type { GetStaticPaths, GetStaticProps } from 'next';
import { NODES_PATH } from '../../lib/constants';
import { loadRawGraphData } from '../../lib/loaders/graph';
import { loadPageData } from '../../lib/loaders/page';

export default function PartialContent(props: Props) {
  return (
    <div id="html-data" dangerouslySetInnerHTML={{ __html: props.html }} />
  );
}

export const getStaticProps: GetStaticProps<Props, Params> = (context) => {
  const slug = context.params?.slug ?? '';
  const { html } = loadPageData(slug, NODES_PATH);
  return {
    props: { html }
  };
};

export const getStaticPaths: GetStaticPaths<Params> = () => {
  const nodes = loadRawGraphData(NODES_PATH);

  return {
    paths: nodes.map(({ slug }) => ({ params: { slug } })),
    fallback: false
  };
};

type Params = {
  slug: string;
};

type Props = {
  html: string;
};
