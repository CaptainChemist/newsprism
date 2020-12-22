import { gql } from '@apollo/client';
import { BUNDLE_FRAGMENT, FEED_FRAGMENT, SAVED_ARTICLE_FRAGMENT } from './fragments';

export const LIKE_BUNDLE_MUTATION = gql`
  mutation likeBundleMutation($data: LikeBundleInput) {
    likeBundle(data: $data) {
      ...BundleFragment
      feeds {
        ...FeedFragment
      }
    }
  }
  ${BUNDLE_FRAGMENT}
  ${FEED_FRAGMENT}
`;

export const LIKE_FEED_MUTATION = gql`
  mutation likeFeedMutation($data: LikeFeedInput) {
    likeFeed(data: $data) {
      ...FeedFragment
      bundles {
        ...BundleFragment
      }
    }
  }
  ${BUNDLE_FRAGMENT}
  ${FEED_FRAGMENT}
`;

export const CREATE_BUNDLE_MUTATION = gql`
  mutation createBundleMutation($data: BundleCreateInput) {
    createBundle(data: $data) {
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
export const UPDATE_BUNDLE_MUTATION = gql`
  mutation updateBundleMutation($data: BundleUpdateInput) {
    updateBundle(data: $data) {
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

export const CREATE_FEED_MUTATION = gql`
  mutation createFeedMutation($data: FeedCreateInput) {
    createFeed(data: $data) {
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

export const UPDATE_FEED_MUTATION = gql`
  mutation updateFeedMutation($data: FeedUpdateInput) {
    updateFeed(data: $data) {
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

export const CREATE_SAVED_ARTICLE_MUTATION = gql`
  mutation createSavedArticleMutation($data: SavedArticleCreateInput) {
    createSavedArticle(data: $data) {
      ...SavedArticleFragment
    }
  }
  ${SAVED_ARTICLE_FRAGMENT}
`;

export const DELETE_BUNDLE_MUTATION = gql`
  mutation deleteBundleMutation($data: BundleInput) {
    deleteBundle(data: $data) {
      id
    }
  }
`;

export const DELETE_FEED_MUTATION = gql`
  mutation deleteFeedMutation($data: FeedInput) {
    deleteFeed(data: $data) {
      id
    }
  }
`;

export const DELETE_SAVED_ARTICLE_MUTATION = gql`
  mutation deleteSavedArticleMutation($data: DeleteSavedArticleInput) {
    deleteSavedArticle(data: $data) {
      id
      url
    }
  }
`;
