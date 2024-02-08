// import type { VercelRequest, VercelResponse } from '@vercel/node'
const { getNextGameAsync } = require('../src/services/scraperService.js');
const NodeCache = require("node-cache");
// import type { NextApiRequest, NextApiResponse } from "next";
const Cors = require("cors");

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
  origin: "*",
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req,
  res,
  fn
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

const myCache = new NodeCache({
  stdTTL: 86400,
});

export default async function handler(req, res) {
  // const { name = 'World' } = req.query
  // return res.json({
  //   message: `Hello ${name}!`,
  // })
  // Run the middleware
  await runMiddleware(req, res, cors);

  try {
    console.log('chegou')
    const key = req.url;
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
