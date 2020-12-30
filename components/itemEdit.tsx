import { Dispatch, SetStateAction } from 'react';
import {
  BundleObject,
  FeedObject,
  ItemType,
  SelectedFeedState,
} from '../utils/types';
import { EditPencil } from './svg';

export const ItemEdit = ({
  item,
  type,
  selected,
  setSelected,
}: {
  item: FeedObject | BundleObject;
  type: ItemType;
  selected?: SelectedFeedState;
  setSelected?: Dispatch<SetStateAction<SelectedFeedState>>;
}) => {
  const isFeed = type === ItemType.FeedType;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setSelected((currState) => ({
          id: item.id,
          feeds: isFeed ? [item] : item['feeds'],
          editMode:
            !selected.editMode || currState.id !== item.id ? true : false,
          newMode: false,
        }));
      }}
      className="flex py-2 mx-1 z-10"
    >
      <EditPencil
        className={`
            h-6 w-6 ${
              item.id === selected.id && selected.editMode
                ? `text-${isFeed ? 'green' : 'purple'}-400`
                : 'text-gray-500'
            } inline-block align-middle
            `}
      />
    </div>
  );
};
