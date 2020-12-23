import { useMutation } from '@apollo/client';
import { useState } from 'react';
import {
  CREATE_BUNDLE_MUTATION,
  CREATE_FEED_MUTATION,
} from '../utils/api/graphql/mutations';
import {
  ActionType,
  BadgeFieldName,
  BundleObject,
  FeedObject,
  ItemType,
  NewItemState,
} from '../utils/types';
import { BadgeList } from './badgeList';
import { GenerateInputField } from './generateInputField';
import { ErrorSign, WaitingClock } from './svg';

export const NewEditItem = ({ type }: { type: ItemType }) => {
  const isFeed = type === ItemType.FeedType;
  const initialFeed: FeedObject = { name: '', url: '', tags: [] };
  const initialBundle: BundleObject = {
    name: '',
    description: '',
    tags: [],
    feeds: [],
  };
  const initialState: NewItemState = isFeed ? initialFeed : initialBundle;

  const [currentItem, setItem] = useState<NewItemState>(initialState);
  const inputFields = isFeed ? ['name', 'url'] : ['name', 'description'];

  const [
    createItemMutation,
    { loading: createLoading, error: createError },
  ] = useMutation(isFeed ? CREATE_FEED_MUTATION : CREATE_BUNDLE_MUTATION);

  if (createLoading) {
    return <WaitingClock className="my-20 h-10 w-10 text-gray-500 m-auto" />;
  }
  if (createError) {
    return <ErrorSign className="my-20 h-10 w-10 text-gray-500 m-auto" />;
  }

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="grid grid-cols-12 gap-4 rounded-md border-4 my-4 py-2 px-4">
          <h3 className="col-span-12 text-lg font-medium py-2">
            {isFeed ? 'New Feed' : 'New Bundle'}
          </h3>

          <div className="col-span-6">
            {inputFields.map((name) => (
              <GenerateInputField
                key={`${type}-${name}`}
                currentItem={currentItem}
                name={name}
                changeHandler={setItem}
              />
            ))}
            <div className={`py-4 ${isFeed ? null : 'pt-28'}`}>
              <input
                className={`py-4 ${`bg-${
                  isFeed ? 'green' : 'purple'
                }-400`} hover:bg-${
                  isFeed ? 'green' : 'purple'
                }-700 text-white font-bold px-12 rounded`}
                type="submit"
              />
            </div>
          </div>
          <div className="col-span-6">
            <div className="py-2">
              <label className="block py-2">Tags:</label>
              <div className="grid grid-cols-3 gap-2">
                <BadgeList
                  fieldName={BadgeFieldName.tags}
                  action={ActionType.CREATE}
                  setItem={setItem}
                  item={currentItem}
                />
              </div>
            </div>
            <div className="py-2">
              <label className="block py-2">Add New Tag:</label>
            </div>
            {isFeed ? null : (
              <>
                <div className="py-2">
                  <label className="block py-2">Feeds:</label>
                  <div className="grid grid-cols-3 gap-2">
                    <BadgeList
                      fieldName={BadgeFieldName.feeds}
                      action={ActionType.CREATE}
                      setItem={setItem}
                      item={currentItem}
                    />
                  </div>
                </div>
                <div className="py-2">
                  <label className="block py-2">Add New Feed:</label>
                </div>
              </>
            )}
          </div>
        </div>
      </form>
    </>
  );
};
