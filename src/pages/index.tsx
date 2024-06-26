import { useMemo, useState } from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { cardItems } from 'data/data';
import { Typewriter, useTypewriter } from 'react-simple-typewriter';
import { useQuery } from 'urql';

import Card from '@/components/Card';
import VerticalLayout from '@/components/layouts/VerticalLayout';
import NewsCard from '@/components/NewsCard';
import { Hero } from '@/components/pages/home/HeroNew';
import {
  GetFeaturedArchiveDocument,
  GetHomeNewsDocument,
  GetHomeNewsQueryVariables,
} from '@/gql/graphql';
import pageRoutes from '@/lib/pageRoutes';
import { client, ssrCache } from '@/lib/urqlClient';
import { NextPageWithLayout } from '@/pages/_app';
import { button, container } from '@/styles/variants';
import { extractTextFromContent } from '@/utilities/extractTextFromContext';
import { Icon } from '@iconify/react';

// =============================================================================
// Constants
// =============================================================================
const GET_HOME_NEWS_QUERY_VARIABLES: GetHomeNewsQueryVariables = {
  newsLimit: 3,
};

// =============================================================================
// Server-Side Calls
// =============================================================================

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  await client
    .query(GetHomeNewsDocument, GET_HOME_NEWS_QUERY_VARIABLES, {
      requestPolicy: 'network-only',
    })
    .toPromise();

  await client
    .query(GetFeaturedArchiveDocument, {}, { requestPolicy: 'network-only' })
    .toPromise();

  return {
    props: { urqlState: ssrCache.extractData() },
  };
}

// =============================================================================
// Main Component
// =============================================================================

const Home: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = () => {
  const [{ data: homeNewsData }] = useQuery({
    query: GetHomeNewsDocument,
    variables: GET_HOME_NEWS_QUERY_VARIABLES,
  });

  const [{ data: featuredArchiveData }] = useQuery({
    query: GetFeaturedArchiveDocument,
  });

  const featuredArchive = featuredArchiveData?.featuredArchive?.docs?.at(0);

  /** Contains the first "latest" news object. */
  const featuredNews = homeNewsData?.news?.docs?.at(0);

  /** Contains the rest of the news without the "featuredNews". */
  const news = homeNewsData?.news?.docs?.slice(1);

  return (
    <>
      <NextSeo title="Home" />

      {/* HERO */}
      <Hero />

      {/* Featured Section */}
      {featuredArchive && (
        <div className="overflow-hidden absolute h-max -bottom-[160px] md:-bottom-[120px] left-0 right-0 flex bg-white rounded-xl shadow-md max-w-6xl md:w-3/4 md:h-[260px] m-auto mx-4 md:mx-auto">
          <div className="flex-1 flex flex-col items-start justify-center gap-y-2 px-8 md:pl-10 py-8">
            <p className="text-secondary-900 text-[12px] bg-secondary-500 rounded-full px-4 py-1 truncate flex-shrink-0">
              💜 Newest Publication
            </p>
            <h2 className="text-dark-800 font-bold text-[18px] md:text-[22px] truncate flex-shrink-0">
              {featuredArchive.title}
            </h2>
            <p className="text-dark-800 text-[12px] line-clamp-4 w-full h-full">
              {extractTextFromContent(featuredArchive.about)}
            </p>
            <Link
              href={`${pageRoutes.archive}/${featuredArchive.slug}`}
              className="text-secondary-500 text-[13px] flex items-center gap-x-2"
            >
              Learn More <Icon icon="uil:arrow-right" className="text-[16px]" />
            </Link>
          </div>
          <div className="relative w-44 bg-primary-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="w-full h-full"
              src={featuredArchive.archiveCover?.url ?? ''}
              alt={featuredArchive.archiveCover?.alt ?? ''}
            />
          </div>
        </div>
      )}

      {/* 3 Cards */}
      <section className="bg-[#F7F7F7] flex flex-col gap-y-6 h-max pb-20 px-2">
        <h2 className="mt-60 mb-10 md:mb-0 md:mt-44 text-dark-900 text-[24px] md:text-[32px] text-center">
          <span className="text-secondary-500 font-semibold">
            Research Excellence
            <br />
          </span>{' '}
          bounded by the pillars of
          <br />
          <span className="text-primary-600 font-semibold">
            Assumption Education
          </span>
        </h2>
        <div className="max-w-6xl w-full mx-auto flex flex-wrap justify-center gap-y-10 md:gap-x-10">
          {cardItems.map((item) => (
            <Card
              key={item.title}
              icon={item.icon}
              title={item.title}
              desc={item.desc}
            />
          ))}
        </div>
      </section>

      {/* News Section */}
      <div className="h-max bg-[#E6E6FA] md:flex flex-col justify-center py-12 md:pb-32">
        <h2 className="text-center text-primary-600 text-[24px] md:text-[32px] font-semibold mb-8">
          See The Latest Stories
        </h2>
        {(!homeNewsData || homeNewsData?.news?.docs?.length === 0) && (
          <p className="text-center">😭 No news stories found.</p>
        )}
        <div className="flex flex-col gap-y-6 md:flex-row w-[90%] md:w-3/4 md:gap-x-8 max-w-6xl mx-auto">
          {/* Featured News Card */}
          {featuredNews && (
            <Link
              href={`${pageRoutes.news}/${featuredNews?.slug}`}
              className="block overflow-hidden rounded-tl-xl rounded-tr-xl rounded-bl-xl group min-w-[350px] min-h-[350px] h-1"
            >
              <div className="relative w-full h-full">
                {/* Featured News Card: Read and Title */}
                <div className="top-0 absolute p-6 w-full flex flex-col gap-y-1">
                  <p className="text-primary-200 text-xs z-10 relative">
                    {featuredNews?.readTime} minute read
                  </p>
                  <h2 className="text-white text-2xl z-10 line-clamp-5">
                    {featuredNews?.title}
                  </h2>
                </div>

                {/* Featured News Card: Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={featuredNews?.featureImage?.url ?? ''}
                    alt={featuredNews?.featureImage?.alt ?? ''}
                    className="object-cover bg-secondary-300 w-full h-full"
                  />
                </div>

                {/* Featured News Card: Footer with CTA */}
                <footer className="absolute bottom-0 right-0 z-10">
                  <div className="bg-primary-100 rounded-tl-xl pl-3 pt-3">
                    <button
                      className={button({
                        class: [
                          'flex gap-x-1 items-center',
                          'bg-primary-600 text-white text-[12px] md:text-[14px]',
                          'rounded-md',
                        ],
                      })}
                    >
                      <span>Learn More</span>
                      <span className="h-5 w-5 grid place-items-center">
                        <Icon
                          icon="uil:arrow-right"
                          className="md:block text-[20px] text-secondary-500 flex-shrink-0 text-2xl group-hover:translate-x-1 transition"
                        />
                      </span>
                    </button>
                  </div>
                </footer>

                {/*  Featured News Card: Overlay on top */}
                <div className="after:absolute after:top-0 after:left-0 after:w-full after:h-[80%] after:md:h-80 after:bg-gradient-to-b after:from-[#01011D] after:to-transparent" />
              </div>
            </Link>
          )}

          <div className="flex flex-col gap-y-6 md:gap-y-8">
            {news?.map((news, index) => {
              let bgColor: string;
              let btnColor: string;
              if (index === 1) {
                bgColor = '#ABACDB';
                btnColor = '#040593';
              } else {
                bgColor = '#E8DCAD';
                btnColor = '#B99608';
              }

              return (
                <NewsCard
                  href={`${pageRoutes.news}/${news?.slug}`}
                  key={news?.id}
                  img={news?.featureImage?.url ?? ''}
                  text={news?.title ?? ''}
                  date={news?.publishedDate ?? ''}
                  btnColor={btnColor}
                  bgColor={bgColor}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

Home.getLayout = (page) => (
  <VerticalLayout navPosition="fixed" navVariant="inverted">
    {page}
  </VerticalLayout>
);
export default Home;
