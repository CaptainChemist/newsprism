require('dotenv').config();

const { AUTH0_BASE_URL } = process.env;

module.exports = {
  publicRuntimeConfig: {
    BACKEND_URL: `${AUTH0_BASE_URL}/api/graphql`,
    CORS_URL: `${AUTH0_BASE_URL}/api/cors`,
  },
};
