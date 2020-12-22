import { gql } from '@apollo/client';

export const FEED_TAG_FRAGMENT = gql`
  fragment FeedTagFragment on FeedTag {
    id
    name
  }
`;

export const BUNDLE_TAG_FRAGMENT = gql`
  fragment BundleTagFragment on BundleTag {
    id
    name
  }
`;

export const AUTHOR_FRAGMENT = gql`
  fragment AuthorFragment on User {
    id
    auth0
    picture
    nickname
  }
`;

export const LIKE_FRAGMENT = gql`
  fragment LikeFragment on Like {
    id
    name
  }
`;

export const FEED_FRAGMENT = gql`
  fragment FeedFragment on Feed {
    id
    name
    url
    likes {
      ...AuthorFragment
    }
    tags {
      ...FeedTagFragment
    }
    author {
      ...AuthorFragment
    }
  }
  ${FEED_TAG_FRAGMENT}
  ${AUTHOR_FRAGMENT}
`;

export const BUNDLE_FRAGMENT = gql`
  fragment BundleFragment on Bundle {
    id
    name
    description
    tags {
      ...BundleTagFragment
    }
    author {
      ...AuthorFragment
    }
    likes {
      ...AuthorFragment
    }
  }
  ${BUNDLE_TAG_FRAGMENT}
  ${AUTHOR_FRAGMENT}
`;

export const SAVED_ARTICLE_FRAGMENT = gql`
  fragment SavedArticleFragment on SavedArticle {
    id
    contents
    url
    author {
      ...AuthorFragment
    }
    feed {
      ...FeedFragment
    }
  }
  ${AUTHOR_FRAGMENT}
  ${FEED_FRAGMENT}
`;
