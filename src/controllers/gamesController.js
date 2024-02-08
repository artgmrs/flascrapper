const express = require('express');
const router = express.Router();
const NodeCache = require("node-cache");

const { getNextGameAsync } = require('../services/scraperService.js')

const myCache = new NodeCache({
  stdTTL: 86400,
});


router.get('/next-game', async (req, res, next) => {
  try {
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
})

module.exports = router;