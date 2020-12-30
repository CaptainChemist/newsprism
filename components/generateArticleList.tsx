import { Feed } from '@prisma/client';
import { useEffect, useState } from 'react';
import * as _ from 'lodash';
import { NotifyLoading } from './notifyLoading';
import { NotifyError } from './notifyError';
import { ArticleList } from './articleList';
const Parser = require('rss-parser');
const parser = new Parser();
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { CORS_URL } = publicRuntimeConfig;

const CORS_PROXY = `${CORS_URL}?`;

export const GenerateArticleList = ({ feeds }: { feeds: Feed[] }) => {
  const [{ loading, error, data }, setGet] = useState({
    error: false,
    loading: false,
    data: [],
  });
  useEffect(() => {
    (async () => {
      try {
        setGet((o) => ({ ...o, error: false, loading: true }));
        const fetchedItems = _.reduce(
          await Promise.all(
            feeds.map(async (oneFeed) => {
              const { items } = await parser.parseURL(CORS_PROXY + oneFeed.url);
              return items.map((o) => ({ ...o, feed: oneFeed }));
            }),
          ),
          (sum, n) => [...sum, ...n],
        );
        setGet((o) => ({ ...o, data: fetchedItems, loading: false }));
      } catch (error) {
        setGet((o) => ({ ...o, error, loading: false }));
      }
    })();
  }, [feeds]);

  if (loading) {
    return <NotifyLoading />;
  }

  if (error) {
    return <NotifyError />;
  }

  return <ArticleList articleList={data} />;
};
