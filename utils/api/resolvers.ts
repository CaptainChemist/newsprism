const createFieldResolver = (modelName, parName) => ({
  [parName]: async ({ id }, args, { prisma }) => {
    const modelResponse = await prisma[modelName].findUnique({
      where: { id },
      include: { [parName]: true },
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
  Query: {
    hello: (parent, args, context) => 'hi!',
    feed: (parent, { data: { id } }, { prisma }) =>
      prisma.feed.findUnique({ where: { id } }),
    feeds: (parent, args, { prisma }) => prisma.feed.findMany(),
    bundle: (parent, { data: { id } }, { prisma }) =>
      prisma.bundle.findUnique({ where: { id } }),
    bundles: (parent, args, { prisma }) => prisma.bundle.findMany(),
    findFeedTags: (parent, { data }, { prisma }) =>
      prisma.feedTag.findMany({ where: { name: { contains: data.search } } }),
    findBundleTags: (parent, { data }, { prisma }) =>
      prisma.bundleTag.findMany({ where: { name: { contains: data.search } } }),
    findFeeds: (parent, { data }, { prisma }) =>
      prisma.feed.findMany({ where: { name: { contains: data.search } } }),
  },
  Mutation: {
    createFeed: async (parent, { data }, { prisma, user }) => {
      const author = { author: { connect: { id: user.id } } };
      const result = await prisma.feed.create({ data: { ...data, ...author } });
      return result;
    },
    createBundle: async (parent, { data }, { prisma, user }) => {
      const author = { author: { connect: { id: user.id } } };
      const result = await prisma.bundle.create({
        data: { ...data, ...author },
      });
      return result;
    },
    likeBundle: (parent, { data }, { prisma, user }) => {
      const { bundleId, likeState } = data;
      const connectState = likeState ? 'connect' : 'disconnect';
      return prisma.bundle.update({
        where: { id: bundleId },
        data: { likes: { [connectState]: { id: user.id } } },
      });
    },
    likeFeed: (parent, { data }, { prisma, user }) => {
      const { feedId, likeState } = data;
      const connectState = likeState ? 'connect' : 'disconnect';
      return prisma.feed.update({
        where: { id: feedId },
        data: { likes: { [connectState]: { id: user.id } } },
      });
    },
  },
};
