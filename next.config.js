/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    REACT_APP_AUTH0_CLIENT_ID: process.env.REACT_APP_AUTH0_CLIENT_ID,
    REACT_APP_AUTH0_DOMAIN: process.env.REACT_APP_AUTH0_DOMAIN,
    REACT_APP_AUTH0_AUDIENCE: process.env.REACT_APP_AUTH0_AUDIENCE,
    REACT_APP_AUTH0_REDIRECT_URI: process.env.REACT_APP_AUTH0_REDIRECT_URI,
    REACT_APP_SERVER_BASE_URL: process.env.REACT_APP_SERVER_BASE_URL,
  },
};
