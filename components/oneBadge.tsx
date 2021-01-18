import { Bundle, BundleTag, FeedTag } from '@prisma/client';
import { Dispatch, SetStateAction } from 'react';
import {
  ActionType,
  BadgeFieldName,
  BundleObject,
  FeedObject,
} from '../utils/types';
import { Minus, Plus } from './svg';

export const OneBadge = ({
  item,
  action,
  currentItem,
  fieldName,
  setItem,
  setSearch,
}: {
  item: FeedTag | BundleTag | FeedObject;
  action: ActionType;
  currentItem?: FeedObject | BundleObject;
  fieldName: BadgeFieldName;
  setItem?: Dispatch<SetStateAction<FeedObject | BundleObject>>;
  setSearch?: Dispatch<SetStateAction<String>>;
}) => {
  const color =
    fieldName === BadgeFieldName.tags
      ? 'blue'
      : fieldName === BadgeFieldName.feeds
      ? 'green'
      : 'purple';

  return (
    <div className="inline-block align-middle">
      <span
        className={`flex justify-center text-sm py-2 px-2 rounded-lg bg-${color}-200`}
      >
        {action === ActionType.ADD ? (
          <div
            onClick={() => {
              setItem((currState) => ({
                ...currState,
                [fieldName]: [...currState[fieldName], { ...item }],
              }));
              setSearch('');
            }}
          >
            <Plus className="h-4 w-4 text-gray-500" />
          </div>
        ) : null}
        {action === ActionType.CREATE ? (
          <div
            onClick={() => {
              setItem((currState) => ({
                ...currState,
                [fieldName]: currState[fieldName].filter(
                  (o) => item.name !== o.name,
                ),
              }));
            }}
          >
            <Minus className="h-4 w-4 text-gray-500" />
          </div>
        ) : null}
        <p className={`text-xs text-${color}-600 text-center`}>{item.name}</p>
      </span>
    </div>
  );
};
