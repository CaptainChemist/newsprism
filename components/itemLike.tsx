import { useMutation, useQuery } from '@apollo/client';
import * as _ from 'lodash';
import {
  LIKE_BUNDLE_MUTATION,
  LIKE_FEED_MUTATION,
} from '../utils/api/graphql/mutations';
import { ME_QUERY } from '../utils/api/graphql/queries';
import { BundleObject, FeedObject, ItemType } from '../utils/types';
import { useFetchUser } from '../utils/user';
import { HeartOutline } from './svg';

export const ItemLike = ({
  item,
  type,
}: {
  item: FeedObject | BundleObject;
  type: ItemType;
}) => {
  const isFeed = type === ItemType.FeedType;

  const [likeItemMutation, { loading: likeItemLoading }] = useMutation(
    isFeed ? LIKE_FEED_MUTATION : LIKE_BUNDLE_MUTATION,
  );
  const { data: meData, loading: userLoadingQuery } = useQuery(ME_QUERY);

  const { user, loading: fetchUserLoading } = useFetchUser();
  const likeMatches = item.likes.filter(
    (oneLike) => oneLike.auth0 === (user ? user.sub : ''),
  );
  const hasMatch = likeMatches.length > 0 ? true : false;

  const loading = fetchUserLoading || likeItemLoading || userLoadingQuery;
  const me = _.get(meData, 'me');
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        if (user && !loading) {
          const idObj = isFeed ? { feedId: item.id } : { bundleId: item.id };
          likeItemMutation({
            variables: {
              data: {
                ...idObj,
                likeState: hasMatch ? false : true,
              },
            },
            optimisticResponse: () => {
              const likes = item.likes.filter((item) =>
                item.id === me ? me.id : '',
              );
              return {
                __typename: 'Mutation',
                [`like${isFeed ? 'Feed' : 'Bundle'}`]: {
                  ...item,
                  ...(hasMatch
                    ? {
                        likes,
                      }
                    : {
                        likes: [...likes, me],
                      }),
                },
              };
            },
          });
        }
      }}
      className="flex py-2 mx-1 z-10"
    >
      <p>{item.likes.length} </p>
      <HeartOutline
        className={`
      h-6 w-6 ${
        hasMatch ? `text-red-500` : `text-gray-500`
      } inline-block align-middle`}
      />
    </div>
  );
};
