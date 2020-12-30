import {
  BUNDLES_QUERY,
  BUNDLE_QUERY,
  FEEDS_QUERY,
  FEED_QUERY,
  SAVED_ARTICLES_QUERY,
  SAVED_ARTICLE_QUERY,
} from './api/graphql/queries';
import * as _ from 'lodash';

export const updateCache = (isFeed, action) => (store, { data }) => {
  const item = data[`${action}${isFeed ? 'Feed' : 'Bundle'}`];

  try {
    store.writeQuery({
      query: isFeed ? FEED_QUERY : BUNDLE_QUERY,
      variables: { data: { id: _.get(item, 'id') } },
      data: { [isFeed ? 'feed' : 'bundle']: item },
    });
  } catch (e) {}

  try {
    const { feeds, bundles } = store.readQuery({
      query: isFeed ? FEEDS_QUERY : BUNDLES_QUERY,
    });
    const currentItems = isFeed ? feeds : bundles;

    store.writeQuery({
      query: isFeed ? FEEDS_QUERY : BUNDLES_QUERY,
      data: {
        [isFeed ? 'feeds' : 'bundles']: [
          ...currentItems.filter((o) => o.id !== item.id),
          item,
        ],
      },
    });
  } catch (e) {}
};

export const updateSavedArticleCache = (action) => (store, { data }) => {
  const item = data[`${action}SavedArticle`];

  try {
    store.writeQuery({
      query: SAVED_ARTICLE_QUERY,
      variables: { data: { url: _.get(item, 'url') } },
      data: { savedArticle: action === 'delete' ? null : item },
    });
  } catch (e) {}

  try {
    const { savedArticles } = store.readQuery({
      query: SAVED_ARTICLES_QUERY,
    });

    store.writeQuery({
      query: SAVED_ARTICLES_QUERY,
      data: {
        savedArticles:
          action === 'delete'
            ? savedArticles.filter((o) => o.id !== item.id)
            : [...savedArticles, item],
      },
    });
  } catch (e) {}
};
