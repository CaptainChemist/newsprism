import { useQuery } from '@apollo/client';
import { ArticleList } from '../components/articleList';
import { Layout } from '../components/layout';
import { NotifyError } from '../components/notifyError';
import { NotifyLoading } from '../components/notifyLoading';
import { SAVED_ARTICLES_QUERY } from '../utils/api/graphql/queries';

const SavedArticles = () => {
  const { loading, error, data } = useQuery(SAVED_ARTICLES_QUERY);

  if (loading) {
    return (
      <Layout>
        <NotifyLoading />
      </Layout>
    );
  }

  const { savedArticles } = data || {};

  if (error || !savedArticles) {
    return (
      <Layout>
        <NotifyError />
      </Layout>
    );
  }

  const articleList = savedArticles.map(({ content, feed }) => ({
    ...content,
    ...feed,
  }));

  return (
    <Layout>
      <ArticleList articleList={articleList} />
    </Layout>
  );
};

export default SavedArticles;
