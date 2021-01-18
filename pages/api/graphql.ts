import { ApolloServer } from 'apollo-server-micro';
import { makeExecutableSchema } from 'graphql-tools';
import Cors from 'micro-cors';
import { typeDefs } from '../../utils/api/typeDefs';
import { resolvers } from '../../utils/api/resolvers';
import { applyMiddleware } from 'graphql-middleware';
import { log } from '../../utils/api/log';
import { permissions } from '../../utils/api/permissions';
import { context } from '../../utils/api/context';

const cors = Cors();

const schema = applyMiddleware(
  makeExecutableSchema({ typeDefs, resolvers }),
  log,
  permissions,
);

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = new ApolloServer({
  schema,
  context,
}).createHandler({
  path: '/api/graphql',
});

export default cors((req, res) => {
  if (req.method === 'OPTIONS') {
    return res.status(200).send();
  }
  return handler(req, res);
});
