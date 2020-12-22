import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type Feed {
    id: String
    name: String
    url: String
  }
  type Bundle {
    id: String
    name: String
    description: String
  }
  input FeedInput {
    id: String
  }
  input BundleInput {
    id: String
  }

  input FeedCreateInput {
    id: String
    url: String
    name: String
  }
  input BundleCreateInput {
    id: String
    name: String
    description: String
  }

  type Query {
    hello: String
    feed(data: FeedInput): Feed
    bundle(data: BundleInput): Bundle
    feeds: [Feed]
    bundles: [Bundle]
  }
  type Mutation {
    createFeed(data: FeedCreateInput): Feed
    createBundle(data: BundleCreateInput): Bundle
  }
`;
