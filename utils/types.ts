import { BundleTag, Feed, FeedTag, User } from '@prisma/client';

export enum ItemType {
  BundleType = 'BundleType',
  FeedType = 'FeedType',
}

export type FeedObject = {
  id?: string;
  name: string;
  url: string;
  tags: FeedTag[];
  bundles?: BundleObject[];
  author?: User;
  likes?: User[];
};

export type BundleObject = {
  id?: string;
  name: string;
  description: string;
  tags: BundleTag[];
  feeds: FeedObject[];
  author?: User;
  likes?: User[];
};

export type SelectedFeedState = {
  id: string;
  feeds: Feed[];
  editMode: boolean;
  newMode: boolean;
};
