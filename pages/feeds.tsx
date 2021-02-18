import { useState } from 'react';
import { GenerateArticleList } from '../components/generateArticleList';
import { ItemList } from '../components/itemList';
import { Layout } from '../components/layout';
import { NewEditItem } from '../components/newEditItem';
import { Minus, Plus } from '../components/svg';
import { ItemType, SelectedFeedState } from '../utils/types';
import { useFetchUser } from '../utils/user';

const FeedsPage = () => {
  const { user, loading } = useFetchUser();
  const initialSelected: SelectedFeedState = {
    id: null,
    feeds: [],
    editMode: false,
    newMode: false,
  };
  const [selected, setSelected] = useState(initialSelected);

  return (
    <Layout>
      <div className="grid grid-cols-2">
        <h3 className="grid-cols-1 justify-start flex text-lr font-medium py-4">
          Feeds Page
        </h3>
        {user ? (
          <div
            onClick={(e) => {
              e.persist();
              setSelected((currState) => ({
                ...currState,
                newMode: !currState.newMode,
                editMode: false,
              }));
            }}
            className="flex grid-cols-1 justify-end cursor-pointer"
          >
            {selected.newMode ? (
              <Minus
                className={`h-6 w-6 text-${
                  selected.newMode ? 'gray' : 'blue'
                }-500 mt-4`}
              />
            ) : (
              <Plus
                className={`h-6 w-6 text-${
                  selected.newMode ? 'gray' : 'blue'
                }-500 mt-4`}
              />
            )}
            <h3
              className={`grid-cols-1 justify-start flex text-lg font-medium py-4 text-${
                selected.newMode ? `gray` : `blue`
              }`}
            >
              New Feed
            </h3>
          </div>
        ) : null}
      </div>
      {(selected.editMode || selected.newMode) && user ? (
        <NewEditItem
          type={ItemType.FeedType}
          selected={selected}
          setSelected={setSelected}
        />
      ) : null}
      <ItemList
        type={ItemType.FeedType}
        useSelected={true}
        allowEdits={true}
        selected={selected}
        setSelected={setSelected}
      />
      {selected.feeds.length > 0 ? (
        <GenerateArticleList feeds={selected.feeds} />
      ) : (
        <h3>No Bundle Selected</h3>
      )}
    </Layout>
  );
};

export default FeedsPage;
