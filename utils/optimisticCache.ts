import * as _ from 'lodash';

export const optimisticCache = (isFeed, action, data, currentItem, meData) => {
  const __typename = isFeed ? 'Feed' : 'Bundle';
  const { id } = data;
  const { me } = meData;

  const response = {
    id,
    ...currentItem,
    [isFeed ? 'bundles' : 'feeds']: [],
    likes: [],
    tags: [
      ...currentItem.tags.filter((tag) => _.has(tag, 'id')),
      ..._.get(data, 'tags.create', []).map((tag) => ({
        __typename: isFeed ? 'FeedTag' : 'BundleTag',
        ...tag,
      })),
    ],
    ...(isFeed
      ? {}
      : {
          feeds: currentItem.feeds,
        }),
    author: me,
  };

  return {
    __typename: 'Mutation',
    [action + __typename]: {
      __typename,
      ...response,
    },
  };
};
