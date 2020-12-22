export const resolvers = {
  Query: {
    hello: (parent, args, context) => 'hi!',
    feed: (parent, { data: { id } }, { prisma }) =>
      prisma.feed.findUnique({ where: { id } }),
    feeds: (parent, args, { prisma }) => prisma.feed.findMany(),
    bundle: (parent, { data: { id } }, { prisma }) =>
      prisma.bundle.findUnique({ where: { id } }),
    bundles: (parent, args, { prisma }) => prisma.bundle.findMany(),
  },
  Mutation: {
    createFeed: async (parent, { data }, { prisma, user }) => {
      const result = await prisma.feed.create({ data: { ...data } });
      return result;
    },
    createBundle: async (parent, { data }, { prisma, user }) => {
      const result = await prisma.bundle.create({ data: { ...data } });
      return result;
    },
  },
};
