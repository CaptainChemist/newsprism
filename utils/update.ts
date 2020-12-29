import {
  BUNDLES_QUERY,
  BUNDLE_QUERY,
  FEEDS_QUERY,
  FEED_QUERY,
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
