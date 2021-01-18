import { Dispatch, SetStateAction } from 'react';
import {
  ActionType,
  BadgeFieldName,
  BundleObject,
  FeedObject,
} from '../utils/types';
import { OneBadge } from './oneBadge';

export const BadgeList = ({
  fieldName,
  action,
  setItem,
  item,
  setSearch,
}: {
  fieldName: BadgeFieldName;
  action: ActionType;
  item: FeedObject | BundleObject;
  setItem?: Dispatch<SetStateAction<FeedObject | BundleObject>>;
  setSearch?: Dispatch<SetStateAction<String>>;
}) => {
  return item[fieldName] && item[fieldName].length > 0 ? (
    <>
      {item[fieldName].map((oneBadge) => (
        <OneBadge
          key={`${item['id']}-${oneBadge.name}}`}
          fieldName={fieldName}
          item={oneBadge}
          action={action}
          setItem={setItem}
          currentItem={item}
          setSearch={setSearch}
        />
      ))}
    </>
  ) : (
    <p className="text-gray-400">None found</p>
  );
};
