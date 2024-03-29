import { FC, useState } from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { NextSeo } from 'next-seo';
import { useQuery } from 'urql';

import ArchiveLayout from '@/components/layouts/ArchiveLayout';
import VerticalLayout from '@/components/layouts/VerticalLayout';
import { GetArchivesDocument } from '@/gql/graphql';
import useArchiveWasPrevious from '@/hooks/useArchiveWasPrevious';
import pageRoutes from '@/lib/pageRoutes';
import { client, ssrCache } from '@/lib/urqlClient';
import { NextPageWithLayout } from '@/pages/_app';
import { extractTextFromContent } from '@/utilities/extractTextFromContext';

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const params = ctx?.params as { page?: number; limit?: number } | undefined;

  const { data } = await client
    .query(
      GetArchivesDocument,
      { limit: params?.limit, page: params?.page },
      { requestPolicy: 'network-only' },
    )
    .toPromise();

  return {
    props: {
      pageInfo: {
        limit: params?.limit ?? null,
        page: params?.page ?? null,
      },
      urqlState: ssrCache.extractData(),
    },
  };
}

const ArchiveOverviewPage: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  const searchParams = useSearchParams();
  const categorySearch = searchParams.get('category');
  const titleSearch = searchParams.get('title');
  const searchExists = categorySearch || titleSearch;

  const [{ data }] = useQuery({
    query: GetArchivesDocument,
    variables: {
      limit: props?.pageInfo?.limit,
      page: props?.pageInfo?.page,
      categories: categorySearch ? [categorySearch] : undefined,
      title: titleSearch ? titleSearch : undefined,
    },
  });

  const archives = data?.Archives?.docs;

  return (
    <div className="flex-1 pt-16 px-9 bg-[#EDF1FD]">
      <NextSeo title="Archive" />
      <h1 className="font-medium text-3xl text-dark-600 mb-7">Archives</h1>
      <div>
        {(archives?.length ?? 0) <= 0 && (
          <p>{`😔 No archives found${
            searchExists ? ' based on your search filters' : ''
          }.`}</p>
        )}
        {archives?.map((volume) => (
          <VolumeCard
            key={volume?.id}
            title={volume?.title}
            subtitle={
              extractTextFromContent(volume?.about)?.at(0)?.slice(1, 45) + '...'
            }
            volumeCoverUrl={volume?.archiveCover?.url}
            href={`${pageRoutes.archive}/${volume?.slug}`}
          />
        ))}
      </div>
    </div>
  );
};

ArchiveOverviewPage.getLayout = (page) => <ArchiveLayout>{page}</ArchiveLayout>;
export default ArchiveOverviewPage;

// =====================================================
// Subcomponents
// =====================================================
type VolumeCardType = {
  volumeCoverUrl?: string | null;
  title?: string | null;
  subtitle?: string | null;
  href: string;
};

const VolumeCard: FC<VolumeCardType> = (props) => {
  const { volumeCoverUrl, title, subtitle, href } = props;
  const { saveArchiveWasPrevious } = useArchiveWasPrevious();
  return (
    <Link
      href={href}
      className="group relative flex flex-col gap-y-4 max-w-[242px]"
      onClick={() => saveArchiveWasPrevious()}
    >
      <div className="-inset-3 bg-primary-200/10 absolute rounded-lg group-hover:opacity-100 opacity-0 transition" />

      <div className="relative rounded-md overflow-hidden bg-white aspect-[9/13]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={volumeCoverUrl ?? ''}
          alt={title ?? ''}
          className="object-cover object-center w-full h-full"
        />
      </div>

      <div className="relative">
        <h3 className="font-medium text-dark-500 mb-1">{title}</h3>
        <p className="font-medium text-dark-400">{subtitle}</p>
      </div>
    </Link>
  );
};
