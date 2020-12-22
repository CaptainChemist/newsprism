import { gql } from '@apollo/client';
import {
  AUTHOR_FRAGMENT,
  BUNDLE_FRAGMENT,
  BUNDLE_TAG_FRAGMENT,
  FEED_FRAGMENT,
  FEED_TAG_FRAGMENT,
  SAVED_ARTICLE_FRAGMENT,
} from './fragments';

export const BUNDLES_QUERY = gql`
  query {
    bundles {
      ...BundleFragment
      feeds {
        ...FeedFragment
      }
    }
  }
  ${BUNDLE_FRAGMENT}
  ${FEED_FRAGMENT}
`;

export const FEEDS_QUERY = gql`
  query {
    feeds {
      ...FeedFragment
      bundles {
        ...BundleFragment
      }
    }
  }
  ${FEED_FRAGMENT}
  ${BUNDLE_FRAGMENT}
`;

export const FIND_FEEDS_QUERY = gql`
  query findFeedsQuery($data: FindFeedsInput) {
    findFeeds(data: $data) {
      ...FeedFragment
      bundles {
        ...BundleFragment
      }
    }
  }
  ${FEED_FRAGMENT}
  ${BUNDLE_FRAGMENT}
`;

export const FEED_QUERY = gql`
  query feedQuery($data: FeedInput) {
    feed(data: $data) {
      ...FeedFragment
      bundles {
        ...BundleFragment
        feeds {
          ...FeedFragment
        }
      }
    }
  }
  ${FEED_FRAGMENT}
  ${BUNDLE_FRAGMENT}
`;

export const BUNDLE_QUERY = gql`
  query bundleQuery($data: BundleInput) {
    bundle(data: $data) {
      ...BundleFragment
      feeds {
        ...FeedFragment
        bundles {
          ...BundleFragment
        }
      }
    }
  }
  ${FEED_FRAGMENT}
  ${BUNDLE_FRAGMENT}
`;

export const FIND_FEED_TAGS_QUERY = gql`
  query findFeedTagsQuery($data: FindFeedTagsInput) {
    findFeedTags(data: $data) {
      ...FeedTagFragment
    }
  }
  ${FEED_TAG_FRAGMENT}
`;

export const FIND_BUNDLE_TAGS_QUERY = gql`
  query findBundleTagsQuery($data: FindBundleTagsInput) {
    findBundleTags(data: $data) {
      ...BundleTagFragment
    }
  }
  ${BUNDLE_TAG_FRAGMENT}
`;

export const SAVED_ARTICLES_QUERY = gql`
  query savedArticlesQuery {
    savedArticles {
      ...SavedArticleFragment
    }
  }
  ${SAVED_ARTICLE_FRAGMENT}
`;

export const SAVED_ARTICLE_QUERY = gql`
  query savedArticleQuery($data: SavedArticleInput) {
    savedArticle(data: $data) {
      ...SavedArticleFragment
    }
  }
  ${SAVED_ARTICLE_FRAGMENT}
`;

export const ME_QUERY = gql`
  query meQuery {
    me {
      ...AuthorFragment
    }
  }
  ${AUTHOR_FRAGMENT}
`;
