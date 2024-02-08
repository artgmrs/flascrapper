// import type { VercelRequest, VercelResponse } from '@vercel/node'
const { getNextGameAsync } = require('../src/services/scraperService.js');
const NodeCache = require("node-cache");

const myCache = new NodeCache({
  stdTTL: 86400,
});

export default async function handler(req, res) {
  // const { name = 'World' } = req.query
  // return res.json({
  //   message: `Hello ${name}!`,
  // })
  try {
    console.log('chegou')
    const key = req.originalUrl;
    const cachedResponse = myCache.get(key);

    if (cachedResponse) {
      res.send(cachedResponse);
      return next();
    } else {
      const retorno = await getNextGameAsync();
      myCache.set(key, retorno);

      res.send(retorno);
    }
  } catch (error) {
    console.error('Some error ocurred.', error);
    res.status(500).json({ error: error.message });
  }
}
