import { rule, shield } from 'graphql-shield';
import * as _ from 'lodash';

const rules = {
  isAuthenticated: rule()((_parent, _args, context) => {
    return _.isEmpty(context.user) ? false : true;
  }),
};

export const permissions = shield({
  Query: {
    savedArticle: rules.isAuthenticated,
    savedArticles: rules.isAuthenticated,
  },
  Mutation: {
    createFeed: rules.isAuthenticated,
    createBundle: rules.isAuthenticated,
    likeFeed: rules.isAuthenticated,
    updateFeed: rules.isAuthenticated,
    updateBundle: rules.isAuthenticated,
    createSavedArticle: rules.isAuthenticated,
    deleteBundle: rules.isAuthenticated,
    deleteFeed: rules.isAuthenticated,
    deleteSavedArticle: rules.isAuthenticated,
  },
});
