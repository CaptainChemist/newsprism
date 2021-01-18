import { useLazyQuery } from '@apollo/client';
import { DocumentNode } from 'graphql';
import { Dispatch, SetStateAction, useState } from 'react';
import {
  ActionType,
  BadgeFieldName,
  BundleObject,
  FeedObject,
  SearchQueryName,
} from '../utils/types';
import { BadgeList } from './badgeList';
import { Search, Spin } from './svg';
import * as _ from 'lodash';

export const SearchItems = ({
  currentItem,
  setItem,
  queryName,
  query,
  fieldName,
}: {
  currentItem: FeedObject | BundleObject;
  setItem: Dispatch<SetStateAction<FeedObject | BundleObject>>;
  queryName: SearchQueryName;
  query: DocumentNode;
  fieldName: BadgeFieldName;
}) => {
  const [search, setSearch] = useState('');
  const [findItemsQuery, { loading, data, called }] = useLazyQuery(query, {
    fetchPolicy: 'network-only',
  });

  const fetchedItems = _.get(data, queryName);
  const filtFindItems = fetchedItems
    ? fetchedItems.filter(
        (oneItem) =>
          !currentItem[fieldName].map((o) => o.name).includes(oneItem.name),
      )
    : [];

  const matchCurrent = filtFindItems.filter((o) => o.name === search);
  const matchList = currentItem[fieldName].filter((o) => o.name === search);
  const filtFindItemsWithAdd =
    matchCurrent.length === 0 &&
    matchList.length === 0 &&
    queryName !== 'findFeeds'
      ? [...filtFindItems, { name: search }]
      : filtFindItems;

  const dummyNewItem = {
    ...currentItem,
    [fieldName]: filtFindItemsWithAdd,
  };

  return (
    <div>
      <div className="flex">
        {loading ? (
          <Spin className="h-6 w-6 text-gray-500 animate-spin" />
        ) : (
          <Search className="mt-3 mr-2 w-6 h-6 text-gray-500" />
        )}
        <input
          className="border-4 rounded w-full py-2 px-3"
          value={search}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              setItem((currState) => ({
                ...currState,
                [fieldName]: [
                  ...currState[fieldName],
                  { ...dummyNewItem.tags[0] },
                ],
              }));
              setSearch(() => '');
            }
          }}
          onChange={(e) => {
            e.persist();
            if (e.target.value !== search) {
              setSearch(() => e.target.value);
              findItemsQuery({
                variables: { data: { search: e.target.value } },
              });
            }
          }}
        />
      </div>
      <div className="grid grid-cols-3 gap-2 flex m-2">
        {search !== '' ? (
          <BadgeList
            fieldName={fieldName}
            action={ActionType.ADD}
            setItem={setItem}
            item={dummyNewItem}
            setSearch={setSearch}
          />
        ) : called ? (
          <p className="text-gray-400">No matches</p>
        ) : null}
      </div>
    </div>
  );
};
