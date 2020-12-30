import { useMutation } from '@apollo/client';
import { useState } from 'react';
import {
  DELETE_BUNDLE_MUTATION,
  DELETE_FEED_MUTATION,
} from '../utils/api/graphql/mutations';
import { BUNDLES_QUERY, FEEDS_QUERY } from '../utils/api/graphql/queries';
import { BundleObject, FeedObject, ItemType } from '../utils/types';
import { useFetchUser } from '../utils/user';
import { Spin, Delete } from './svg';

export const ItemDelete = ({
  item,
  type,
}: {
  item: FeedObject | BundleObject;
  type: ItemType;
}) => {
  const isFeed = type === ItemType.FeedType;
  const __typename = isFeed ? 'Feed' : 'Bundle';
  const [modalVisibility, setVisibility] = useState(false);
  const [deleteItemMutation, { loading: deleteItemLoading }] = useMutation(
    isFeed ? DELETE_FEED_MUTATION : DELETE_BUNDLE_MUTATION,
  );
  const { user, loading } = useFetchUser();

  return (
    <>
      {modalVisibility ? (
        <div className="fixed z-20 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
              <div
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg font-medium">
                    Are you sure you want to delete this{' '}
                    {isFeed ? 'feed' : 'bundle'}?
                  </h3>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <span className="flex w-full rounded-md sm:ml-3 sm:w-auto">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        deleteItemMutation({
                          variables: {
                            data: {
                              id: item.id,
                            },
                          },
                          optimisticResponse: {
                            __typename: 'Mutation',
                            [`delete${__typename}`]: {
                              id: item.id,
                              __typename,
                            },
                          },
                          update: (
                            store,
                            { data: { deleteFeed, deleteBundle } },
                          ) => {
                            try {
                              const data = store.readQuery({
                                query: isFeed ? FEEDS_QUERY : BUNDLES_QUERY,
                              });
                              const currentItems =
                                data[isFeed ? 'feeds' : 'bundles'];
                              const deleteItem = isFeed
                                ? deleteFeed
                                : deleteBundle;

                              const updatedArray = currentItems.filter(
                                (o) => o.id !== deleteItem.id,
                              );
                              const newData = {
                                [isFeed ? 'feeds' : 'bundles']: updatedArray,
                              };
                              store.writeQuery({
                                query: isFeed ? FEEDS_QUERY : BUNDLES_QUERY,
                                data: newData,
                              });
                            } catch (e) {}
                          },
                        });
                        setVisibility(false);
                      }}
                      type="button"
                      className="font-bold py-2 px-6 rounded text-white bg-red-500 text-white w-full"
                    >
                      Delete
                    </button>
                  </span>
                  <span className="flex w-full rounded-md sm:ml-3 sm:w-auto">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setVisibility(false);
                      }}
                      type="button"
                      className="font-bold py-2 px-6 rounded bg-white text-gray-700 border-4 border-gray-300 w-full"
                    >
                      Cancel
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div
        onClick={(e) => {
          e.preventDefault();
          setVisibility(true);
        }}
        className="flex col-span-1 py-2 px-1 z-10"
      >
        {deleteItemLoading || loading || !user ? (
          <Spin className="h-6 w-6 text-gray-500 animate-spin" />
        ) : (
          <Delete className="h-6 w-6 text-red-500" />
        )}
      </div>
    </>
  );
};
