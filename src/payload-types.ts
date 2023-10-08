/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    news: News;
    'news-tags': NewsTag;
    volumes: Volume;
    media: Media;
    users: User;
  };
  globals: {};
}
export interface News {
  id: string;
  featureImage?: string | Media;
  title: string;
  author?: string | User;
  publishedDate?: string;
  tags?: string[] | NewsTag[];
  content?: {
    [k: string]: unknown;
  }[];
  readTime?: number;
  status?: 'draft' | 'published';
  slug?: string;
  updatedAt: string;
  createdAt: string;
}
export interface Media {
  id: string;
  alt?: string;
  updatedAt: string;
  createdAt: string;
  url?: string;
  filename?: string;
  mimeType?: string;
  filesize?: number;
  width?: number;
  height?: number;
  sizes?: {
    thumbnail?: {
      url?: string;
      width?: number;
      height?: number;
      mimeType?: string;
      filesize?: number;
      filename?: string;
    };
    sixteenByNineMedium?: {
      url?: string;
      width?: number;
      height?: number;
      mimeType?: string;
      filesize?: number;
      filename?: string;
    };
  };
}
export interface User {
  id: string;
  name?: string;
  role: 'admin' | 'user';
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string;
  resetPasswordExpiration?: string;
  salt?: string;
  hash?: string;
  _verified?: boolean;
  _verificationToken?: string;
  loginAttempts?: number;
  lockUntil?: string;
  password?: string;
}
export interface NewsTag {
  id: string;
  name?: string;
}
export interface Volume {
  id: string;
  volumeCover?: string | Media;
  title: string;
  about?: {
    [k: string]: unknown;
  }[];
  publishedDate?: string;
  volumePdf?: string | Media;
  slug?: string;
  updatedAt: string;
  createdAt: string;
}
