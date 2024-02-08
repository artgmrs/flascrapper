const { getNextGameAsync } = require('../src/services/scraperService.js');
const NodeCache = require("node-cache");
const Cors = require("cors");

const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
  origin: "*",
});

function runMiddleware(req, res, fn) {
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
  await runMiddleware(req, res, cors);

  try {
    const key = req.url;
    const cachedResponse = myCache.get(key);

    if (cachedResponse) {
      res.send(cachedResponse);
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
