import { Context } from './context';
import { verifyOwnership } from './verifyOwnership';

const createFieldResolver = (modelName, parName) => ({
  [parName]: async ({ id }, args, { prisma }: Context) => {
    const modelResponse = await prisma[modelName].findUnique({
      where: { id },
      select: { [parName]: true },
    });
    return modelResponse[parName];
  },
});

export const resolvers = {
  Feed: {
    ...createFieldResolver('feed', 'author'),
    ...createFieldResolver('feed', 'tags'),
    ...createFieldResolver('feed', 'bundles'),
    ...createFieldResolver('feed', 'likes'),
  },
  Bundle: {
    ...createFieldResolver('bundle', 'author'),
    ...createFieldResolver('bundle', 'tags'),
    ...createFieldResolver('bundle', 'feeds'),
    ...createFieldResolver('bundle', 'likes'),
  },
  BundleTag: {
    ...createFieldResolver('bundleTag', 'bundles'),
  },
  FeedTag: {
    ...createFieldResolver('feedTag', 'feeds'),
  },
  SavedArticle: {
    ...createFieldResolver('savedArticle', 'author'),
    ...createFieldResolver('savedArticle', 'feed'),
  },
  User: {
    ...createFieldResolver('user', 'bundles'),
    ...createFieldResolver('user', 'feeds'),
    ...createFieldResolver('user', 'feedLikes'),
    ...createFieldResolver('user', 'bundleLikes'),
  },
  Query: {
    hello: (parent, args, context: Context) => 'hi!',
    feed: (parent, { data: { id } }, { prisma }: Context) =>
      prisma.feed.findUnique({ where: { id } }),
    feeds: (parent, args, { prisma }: Context) => prisma.feed.findMany(),
    bundle: (parent, { data: { id } }, { prisma }: Context) =>
      prisma.bundle.findUnique({ where: { id } }),
    bundles: (parent, args, { prisma }: Context) => prisma.bundle.findMany(),
    findFeedTags: (parent, { data }, { prisma }: Context) =>
      prisma.feedTag.findMany({
        where: { name: { contains: data.search, mode: 'insensitive' } },
      }),
    findBundleTags: (parent, { data }, { prisma }: Context) =>
      prisma.bundleTag.findMany({
        where: { name: { contains: data.search, mode: 'insensitive' } },
      }),
    findFeeds: (parent, { data }, { prisma }: Context) =>
      prisma.feed.findMany({
        where: { name: { contains: data.search, mode: 'insensitive' } },
      }),
    savedArticle: (
      parent,
      { data: { url } },
      { prisma, user: { id: authorId } }: Context,
    ) =>
      prisma.savedArticle.findUnique({
        where: { id: `${authorId}-${url}` },
      }),
    savedArticles: (
      parent,
      args,
      { prisma, user: { id: authorId } }: Context,
    ) =>
      prisma.savedArticle.findMany({
        where: { authorId: authorId ? authorId : null },
      }),
    me: (parent, args, { prisma, user: { id } }: Context) =>
      prisma.user.findUnique({ where: { id } }),
  },
  Mutation: {
    createFeed: (parent, { data }, { prisma, user }: Context) =>
      prisma.feed.create({
        data: { ...data, author: { connect: { id: user.id } } },
      }),
    createBundle: (parent, { data }, { prisma, user }: Context) =>
      prisma.bundle.create({
        data: { ...data, author: { connect: { id: user.id } } },
      }),
    likeBundle: (parent, { data }, { prisma, user }: Context) => {
      const { bundleId, likeState } = data;
      const connectState = likeState ? 'connect' : 'disconnect';
      return prisma.bundle.update({
        where: { id: bundleId },
        data: { likes: { [connectState]: { id: user.id } } },
      });
    },
    likeFeed: (parent, { data }, { prisma, user }: Context) => {
      const { feedId, likeState } = data;
      const connectState = likeState ? 'connect' : 'disconnect';
      return prisma.feed.update({
        where: { id: feedId },
        data: { likes: { [connectState]: { id: user.id } } },
      });
    },
    updateFeed: async (
      parent,
      { data: { id, ...feedUpdate } },
      { prisma, user }: Context,
    ) => {
      const feed = await prisma.feed.findUnique({
        where: { id },
        include: { author: true },
      });
      await verifyOwnership(feed, user);
      return prisma.feed.update({ where: { id }, data: { ...feedUpdate } });
    },
    updateBundle: async (
      parent,
      { data: { id, ...bundleUpdate } },
      { prisma, user }: Context,
    ) => {
      const bundle = await prisma.bundle.findUnique({
        where: { id },
        include: { author: true },
      });
      await verifyOwnership(bundle, user);
      return prisma.bundle.update({ where: { id }, data: { ...bundleUpdate } });
    },
    createSavedArticle: async (parent, { data }, { prisma, user }: Context) =>
      prisma.savedArticle.create({
        data: {
          ...data,
          id: `${user.id}-${data.url}`,
          author: { connect: { id: user.id } },
        },
      }),
    deleteBundle: async (
      parent,
      { data: { id } },
      { prisma, user }: Context,
    ) => {
      const bundle = await prisma.bundle.findUnique({
        where: { id },
        include: { author: true },
      });
      await verifyOwnership(bundle, user);
      await prisma.bundle.delete({ where: { id: bundle.id } });
      return bundle;
    },
    deleteFeed: async (parent, { data: { id } }, { prisma, user }: Context) => {
      const feed = await prisma.feed.findUnique({
        where: { id },
        include: { author: true },
      });
      await verifyOwnership(feed, user);
      await prisma.feed.delete({ where: { id: feed.id } });
      return feed;
    },
    deleteSavedArticle: async (
      parent,
      { data: { id } },
      { prisma, user }: Context,
    ) => {
      const savedArticle = await prisma.savedArticle.findUnique({
        where: { id },
        include: { author: true },
      });
      await verifyOwnership(savedArticle, user);
      await prisma.savedArticle.delete({ where: { id: savedArticle.id } });
      return savedArticle;
    },
  },
};
