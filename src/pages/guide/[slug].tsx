import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useQuery } from 'urql';

import GuideLayout from '@/components/layouts/GuideLayout';
import VerticalLayout from '@/components/layouts/VerticalLayout';
import { RichText } from '@/components/RichText';
import { GetGuidelineDocument, GetGuidelinesDocument } from '@/gql/graphql';
import { client, ssrCache } from '@/lib/urqlClient';
import { cn } from '@/lib/utils';
import { NextPageWithLayout } from '@/pages/_app';
import { formatDate } from '@/utilities/formatDate';

// =============================================================================
// Server-Side Calls from the Page.
// =============================================================================
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { slug } = ctx.params as { slug: string };

  const { data: guidelinesData } = await client
    .query(
      GetGuidelinesDocument,
      { limit: 0 },
      { requestPolicy: 'network-only' },
    )
    .toPromise();

  const { data: guidelineData } = await client
    .query(
      GetGuidelineDocument,
      { slug: slug },
      { requestPolicy: 'network-only' },
    )
    .toPromise();

  return {
    props: {
      slug,
      urqlState: ssrCache.extractData(),
    },
  };
}

const GuidelinesPage: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  const { slug } = props;

  const [{ data: guidelineData }] = useQuery({
    query: GetGuidelineDocument,
    variables: {
      slug: slug,
    },
  });

  const guideline = guidelineData?.Guidelines?.docs?.at(0);

  return (
    <>
      <div className={cn('flex flex-col flex-1 mt-16', 'md:mt-0')}>
        <h1 className="text-3xl font-bold mb-3">{guideline?.title}</h1>
        <span className="text-dark-200 text-sm">
          Last Updated: {formatDate(guideline?.updatedAt)}
        </span>

        <div className="h-10" />

        <RichText content={guideline?.content} />
      </div>
    </>
  );
};

GuidelinesPage.getLayout = (page) => (
  <VerticalLayout>
    <GuideLayout>{page}</GuideLayout>
  </VerticalLayout>
);
export default GuidelinesPage;
