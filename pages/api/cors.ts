import { NextApiRequest, NextApiResponse } from 'next';
import httpProxyMiddleware from 'next-http-proxy-middleware';

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Expires', '-1');
  res.setHeader('Cache-Control', 'no-store, must-revalidate');

  return httpProxyMiddleware(req, res, {
    target: req.url.replace('/api/cors?', ''),
    pathRewrite: {
      '^/api/cors': '',
    },
  });
};
