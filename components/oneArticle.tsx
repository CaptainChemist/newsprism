import { useMutation, useQuery } from '@apollo/client';
import { Feed } from '@prisma/client';
import * as _ from 'lodash';
import stripHTML from 'string-strip-html';
import {
  CREATE_SAVED_ARTICLE_MUTATION,
  DELETE_SAVED_ARTICLE_MUTATION,
} from '../utils/api/graphql/mutations';
import { ME_QUERY, SAVED_ARTICLE_QUERY } from '../utils/api/graphql/queries';
import { useFetchUser } from '../utils/user';
import { HeartOutline, SingleArrowRight } from './svg';
import { updateSavedArticleCache } from '../utils/update';

export const OneArticle = ({ article, feed }: { article; feed: Feed }) => {
  const cleanedContent = stripHTML(article.content);

  const variables = { data: { url: article.link } };
  const {
    loading: savedArticleLoading,
    error,
    data,
  } = useQuery(SAVED_ARTICLE_QUERY, { variables });

  const { user, loading: userLoading } = useFetchUser();
  const { data: meData, loading: userLoadingQuery } = useQuery(ME_QUERY);
  const [
    createSavedArticleMutation,
    { loading: createSavedArticleLoading },
  ] = useMutation(CREATE_SAVED_ARTICLE_MUTATION);
  const [
    deleteSavedArticleMutation,
    { loading: deleteSavedArticleLoading },
  ] = useMutation(DELETE_SAVED_ARTICLE_MUTATION);

  const loading =
    createSavedArticleLoading ||
    deleteSavedArticleLoading ||
    savedArticleLoading ||
    userLoading ||
    userLoadingQuery;

  const savedArticle = _.get(data, 'savedArticle');
  return (
    <div className="grid grid-cols-12 rounded-lg py-4 px-4 border-4 border-gray-300">
      <div
        onClick={(e) => {
          e.stopPropagation();
          if (user && !loading) {
            if (savedArticle) {
              const deleteSavedArticle = { data: { id: savedArticle.id } };
              deleteSavedArticleMutation({
                variables: deleteSavedArticle,
                update: updateSavedArticleCache('delete'),
                optimisticResponse: () => {
                  return {
                    __typename: 'Mutation',
                    ['deleteSavedArticle']: {
                      ...deleteSavedArticle.data,
                      __typename: 'SavedArticle',
                    },
                  };
                },
              });
            } else {
              const newSavedArticle = {
                data: {
                  url: article.link,
                  content: article,
                  feed: {
                    connect: {
                      id: feed.id,
                    },
                  },
                },
              };
              createSavedArticleMutation({
                variables: newSavedArticle,
                update: updateSavedArticleCache('create'),
                optimisticResponse: () => {
                  const user = _.get(meData, 'me');

                  return {
                    __typename: 'Mutation',
                    ['createSavedArticle']: {
                      id: `${user.id}-${newSavedArticle.data.url}`,
                      ...newSavedArticle.data,
                      user,
                      feed,
                      __typename: 'SavedArticle',
                    },
                  };
                },
              });
            }
          }
        }}
        className="col-span-1 flex items-center justify-center z-10 cursor-pointer"
      >
        <HeartOutline
          className={`h-8 w-8 ${
            !_.isNull(savedArticle) ? 'text-red-500' : 'text-gray-500'
          } inline-block align-middle`}
        />
      </div>
      <div className="col-span-10">
        <h4 className="font-bold">{article.title}</h4>
        {article.creator ? (
          <p className="col-span-6">{article.creator}</p>
        ) : null}
        <p className="">{cleanedContent.result}</p>
      </div>
      <div className="col-span-1 flex items-center justify-end">
        <a target="_blank" href={article.link}>
          <SingleArrowRight className="h-8 w-8 text-blue-500 inline-block align-middle" />
        </a>
      </div>
    </div>
  );
};
