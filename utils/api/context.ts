import { PrismaClient, User } from '@prisma/client';
import auth0 from '../auth0';
import { v4 as uuidv4 } from 'uuid';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // Ensure the prisma instance is re-used during hot-reloading
  // Otherwise, a new client will be created on every reload
  globalThis['prisma'] = globalThis['prisma'] || new PrismaClient();
  prisma = globalThis['prisma'];
  // Many thanks to kripod for this fix:
  // https://github.com/blitz-js/blitz/blob/canary/examples/tailwind/db/index.ts
}

export const context = async ({ req }) => {
  try {
    const { user: auth0User } = await auth0.getSession(req);

    let user = await prisma.user.findUnique({
      where: { auth0: auth0User.sub },
    });
    if (!user) {
      const { picture, nickname, sub } = auth0User;
      user = await prisma.user.create({
        data: {
          id: uuidv4(),
          auth0: sub,
          picture,
          nickname,
        },
      });
    }
    return { user, prisma };
  } catch (e) {
    return { user: {}, prisma };
  }
};

export interface Context {
  prisma: PrismaClient;
  user: User;
}
