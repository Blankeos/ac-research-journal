/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query allNewsSlugs {\n    allNews(page: 0, limit: 99999) {\n      docs {\n        slug\n      }\n    }\n  }\n": types.AllNewsSlugsDocument,
    "\n  query newsPageBySlug($slug: String) {\n    allNews(limit: 1, where: { slug: { equals: $slug } }) {\n      docs {\n        id\n        title\n        publishedDate\n        updatedAt\n        createdAt\n        readTime\n        content\n        tags {\n          id\n          name\n        }\n        author {\n          name\n          avatarImage {\n            url\n          }\n        }\n        featureImage {\n          url\n          alt\n        }\n      }\n    }\n  }\n": types.NewsPageBySlugDocument,
    "\n  query getAllNews($limit: Int!) {\n    allNews(limit: $limit, sort: \"publishedDate\") {\n      docs {\n        id\n        slug\n        publishedDate\n        createdAt\n        title\n        content\n        featureImage {\n          url\n          alt\n        }\n      }\n    }\n  }\n": types.GetAllNewsDocument,
    "query getVolumes($limit: Int = 10, $page: Int = 1, $categories: [JSON], $title: String) {\n  Volumes(\n    limit: $limit\n    page: $page\n    sort: \"publishedDate\"\n    where: {categories: {in: $categories}, title: {like: $title}}\n  ) {\n    docs {\n      id\n      title\n      volumeCover {\n        alt\n        url\n      }\n      slug\n      publishedDate\n    }\n  }\n}\n\nquery getVolumeCategories {\n  VolumeCategories(limit: 100000) {\n    docs {\n      id\n      name\n    }\n  }\n}\n\nquery getVolumeBySlug($slug: String) {\n  Volumes(limit: 1, where: {slug: {equals: $slug}}) {\n    docs {\n      id\n      slug\n      title\n      volumePdf {\n        url\n        alt\n      }\n      volumeCover {\n        alt\n        url\n      }\n      about\n      publishedDate\n    }\n  }\n}": types.GetVolumesDocument,
    "query getGuidelines($limit: Int = 99999) {\n  Guidelines(limit: $limit, sort: \"orderNumber\") {\n    docs {\n      id\n      title\n      orderNumber\n      slug\n      updatedAt\n    }\n  }\n}\n\nquery getGuideline($slug: String) {\n  Guidelines(limit: 1, where: {slug: {equals: $slug}}) {\n    docs {\n      id\n      title\n      orderNumber\n      slug\n      updatedAt\n      content\n    }\n  }\n}": types.GetGuidelinesDocument,
    "query getHomeNews($newsLimit: Int!) {\n  news: allNews(limit: $newsLimit, sort: \"publishedDate\") {\n    docs {\n      id\n      title\n      publishedDate\n      readTime\n      slug\n      featureImage {\n        alt\n        url\n      }\n    }\n  }\n}\n\nquery getFeaturedVolume {\n  featuredVolume: Volumes(limit: 1, sort: \"publishedDate\") {\n    docs {\n      id\n      title\n      about\n      slug\n      volumePdf {\n        url\n        alt\n      }\n      volumeCover {\n        alt\n        url\n      }\n      publishedDate\n    }\n  }\n}": types.GetHomeNewsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query allNewsSlugs {\n    allNews(page: 0, limit: 99999) {\n      docs {\n        slug\n      }\n    }\n  }\n"): (typeof documents)["\n  query allNewsSlugs {\n    allNews(page: 0, limit: 99999) {\n      docs {\n        slug\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query newsPageBySlug($slug: String) {\n    allNews(limit: 1, where: { slug: { equals: $slug } }) {\n      docs {\n        id\n        title\n        publishedDate\n        updatedAt\n        createdAt\n        readTime\n        content\n        tags {\n          id\n          name\n        }\n        author {\n          name\n          avatarImage {\n            url\n          }\n        }\n        featureImage {\n          url\n          alt\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query newsPageBySlug($slug: String) {\n    allNews(limit: 1, where: { slug: { equals: $slug } }) {\n      docs {\n        id\n        title\n        publishedDate\n        updatedAt\n        createdAt\n        readTime\n        content\n        tags {\n          id\n          name\n        }\n        author {\n          name\n          avatarImage {\n            url\n          }\n        }\n        featureImage {\n          url\n          alt\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getAllNews($limit: Int!) {\n    allNews(limit: $limit, sort: \"publishedDate\") {\n      docs {\n        id\n        slug\n        publishedDate\n        createdAt\n        title\n        content\n        featureImage {\n          url\n          alt\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getAllNews($limit: Int!) {\n    allNews(limit: $limit, sort: \"publishedDate\") {\n      docs {\n        id\n        slug\n        publishedDate\n        createdAt\n        title\n        content\n        featureImage {\n          url\n          alt\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getVolumes($limit: Int = 10, $page: Int = 1, $categories: [JSON], $title: String) {\n  Volumes(\n    limit: $limit\n    page: $page\n    sort: \"publishedDate\"\n    where: {categories: {in: $categories}, title: {like: $title}}\n  ) {\n    docs {\n      id\n      title\n      volumeCover {\n        alt\n        url\n      }\n      slug\n      publishedDate\n    }\n  }\n}\n\nquery getVolumeCategories {\n  VolumeCategories(limit: 100000) {\n    docs {\n      id\n      name\n    }\n  }\n}\n\nquery getVolumeBySlug($slug: String) {\n  Volumes(limit: 1, where: {slug: {equals: $slug}}) {\n    docs {\n      id\n      slug\n      title\n      volumePdf {\n        url\n        alt\n      }\n      volumeCover {\n        alt\n        url\n      }\n      about\n      publishedDate\n    }\n  }\n}"): (typeof documents)["query getVolumes($limit: Int = 10, $page: Int = 1, $categories: [JSON], $title: String) {\n  Volumes(\n    limit: $limit\n    page: $page\n    sort: \"publishedDate\"\n    where: {categories: {in: $categories}, title: {like: $title}}\n  ) {\n    docs {\n      id\n      title\n      volumeCover {\n        alt\n        url\n      }\n      slug\n      publishedDate\n    }\n  }\n}\n\nquery getVolumeCategories {\n  VolumeCategories(limit: 100000) {\n    docs {\n      id\n      name\n    }\n  }\n}\n\nquery getVolumeBySlug($slug: String) {\n  Volumes(limit: 1, where: {slug: {equals: $slug}}) {\n    docs {\n      id\n      slug\n      title\n      volumePdf {\n        url\n        alt\n      }\n      volumeCover {\n        alt\n        url\n      }\n      about\n      publishedDate\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getGuidelines($limit: Int = 99999) {\n  Guidelines(limit: $limit, sort: \"orderNumber\") {\n    docs {\n      id\n      title\n      orderNumber\n      slug\n      updatedAt\n    }\n  }\n}\n\nquery getGuideline($slug: String) {\n  Guidelines(limit: 1, where: {slug: {equals: $slug}}) {\n    docs {\n      id\n      title\n      orderNumber\n      slug\n      updatedAt\n      content\n    }\n  }\n}"): (typeof documents)["query getGuidelines($limit: Int = 99999) {\n  Guidelines(limit: $limit, sort: \"orderNumber\") {\n    docs {\n      id\n      title\n      orderNumber\n      slug\n      updatedAt\n    }\n  }\n}\n\nquery getGuideline($slug: String) {\n  Guidelines(limit: 1, where: {slug: {equals: $slug}}) {\n    docs {\n      id\n      title\n      orderNumber\n      slug\n      updatedAt\n      content\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getHomeNews($newsLimit: Int!) {\n  news: allNews(limit: $newsLimit, sort: \"publishedDate\") {\n    docs {\n      id\n      title\n      publishedDate\n      readTime\n      slug\n      featureImage {\n        alt\n        url\n      }\n    }\n  }\n}\n\nquery getFeaturedVolume {\n  featuredVolume: Volumes(limit: 1, sort: \"publishedDate\") {\n    docs {\n      id\n      title\n      about\n      slug\n      volumePdf {\n        url\n        alt\n      }\n      volumeCover {\n        alt\n        url\n      }\n      publishedDate\n    }\n  }\n}"): (typeof documents)["query getHomeNews($newsLimit: Int!) {\n  news: allNews(limit: $newsLimit, sort: \"publishedDate\") {\n    docs {\n      id\n      title\n      publishedDate\n      readTime\n      slug\n      featureImage {\n        alt\n        url\n      }\n    }\n  }\n}\n\nquery getFeaturedVolume {\n  featuredVolume: Volumes(limit: 1, sort: \"publishedDate\") {\n    docs {\n      id\n      title\n      about\n      slug\n      volumePdf {\n        url\n        alt\n      }\n      volumeCover {\n        alt\n        url\n      }\n      publishedDate\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;