import { useState } from 'react';
import { ItemList } from '../components/itemList';
import { Layout } from '../components/layout';
import { ItemType, SelectedFeedState } from '../utils/types';

const IndexPage = () => {
  const initialSelected: SelectedFeedState = {
    id: null,
    feeds: [],
    editMode: false,
    newMode: false,
  };
  const [selected, setSelected] = useState(initialSelected);

  return (
    <Layout>
      <h3 className="justify-start flex text-lg font-medium py-4">Home Page</h3>
      <ItemList
        selected={selected}
        setSelected={setSelected}
        useSelected={true}
        type={ItemType.BundleType}
      />
    </Layout>
  );
};

export default IndexPage;
