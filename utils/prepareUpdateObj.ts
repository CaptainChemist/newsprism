import { v4 as uuidv4 } from 'uuid';
import * as _ from 'lodash';

const genNestedItems = (currentItem) => {
  const tags =
    'tags' in currentItem
      ? {
          tags: {
            connect: currentItem.tags
              .map(({ id }) => ({ id }))
              .filter(({ id }) => id !== undefined),

            create: currentItem.tags
              .filter(({ id }) => id === undefined)
              .map((o) => ({ ...o, id: uuidv4() })),
          },
        }
      : {};

  const feeds =
    'feeds' in currentItem
      ? {
          feeds: {
            connect: currentItem.feeds
              .map(({ id }) => ({ id }))
              .filter(({ id }) => id !== undefined),
          },
        }
      : {};

  const { __typename, likes, author, bundles, ...cleanedItem } = currentItem;

  return { ...cleanedItem, ...tags, ...feeds };
};

const cleanOps = (currentData, items) => {
  items.map((oneItem) => {
    ['connect', 'disconnect', 'create'].map((operation) => {
      if (operation in currentData[oneItem]) {
        currentData[oneItem][operation].length === 0
          ? delete currentData[oneItem][operation]
          : null;
      }
    });

    if (_.isEmpty(currentData[oneItem])) {
      delete currentData[oneItem];
    }
  });

  return currentData;
};

export const prepareNewUpdateObj = (
  queriedItem,
  currentItem,
  isFeed,
  isEditing,
) => {
  const currentData = genNestedItems(currentItem);

  if (!isEditing) {
    return { ...currentData, id: uuidv4() };
  }

  const queriedData = genNestedItems(queriedItem);

  const disconnectedTags = _.differenceWith(
    queriedData.tags.connect,
    currentData.tags.connect,
    _.isEqual,
  );
  const connectedTags = _.differenceWith(
    currentData.tags.connect,
    queriedData.tags.connect,
    _.isEqual,
  );

  if (!isFeed) {
    const disconnectedFeeds = _.differenceWith(
      queriedData.feeds.connect,
      currentData.feeds.connect,
      _.isEqual,
    );
    const connectedFeeds = _.differenceWith(
      currentData.feeds.connect,
      queriedData.feeds.connect,
      _.isEqual,
    );

    return cleanOps(
      {
        ...currentData,
        tags: {
          connect: connectedTags,
          disconnect: disconnectedTags,
          create: _.get(currentData, 'tags.create', []),
        },
        feeds: {
          connect: connectedFeeds,
          disconnect: disconnectedFeeds,
        },
      },
      ['tags', 'feeds'],
    );
  } else {
    return cleanOps(
      {
        ...currentData,
        tags: {
          connect: connectedTags,
          disconnect: disconnectedTags,
          create: _.get(currentData, 'tags.create', []),
        },
      },
      ['tags'],
    );
  }
};
