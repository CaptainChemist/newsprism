import { useState } from 'react';
import { ItemList } from '../components/itemList';
import { Layout } from '../components/layout';
import { ItemType, SelectedFeedState } from '../utils/types';

const FeedsPage = () => {
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
      </div>
      <ItemList
        type={ItemType.FeedType}
        useSelected={true}
        allowEdits={true}
        selected={selected}
        setSelected={setSelected}
      />
    </Layout>
  );
};

export default FeedsPage;
