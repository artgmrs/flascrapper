const cheerio = require('cheerio');

// local imports
const url = process.env['URL_SCRAPE'];
const { formatDate } = require('../utils/dateUtils.js');
const { createAxiosInstance } = require('../utils/axiosUtils.js');

const getNextGameAsync = async () => {
  const axiosInstance = createAxiosInstance();

  const { data: html } = await axiosInstance.get(url, {
    headers: {
      Accept: 'application/json',
    },
  });
  
  const $ = cheerio.load(html);

  const dataHora = $('a.match__lg > div > div.match__lg_card--info > div.match__lg_card--datetime').html().trim();
  const dataHoraFormatada = formatDate(dataHora);
  let nomeMandante = $('a.match__lg > div > div.match__lg_card--at-name').html();
  let nomeVisitante = $('a.match__lg > div > div.match__lg_card--ht-name').html();
  let imagemMandante = $('a.match__lg > div > div.match__lg_card--at-logo > img').attr("src");
  let imagemVisitante = $('a.match__lg > div > div.match__lg_card--ht-logo > img').attr("src");
  let mandante = nomeMandante.toLowerCase() !== 'flamengo';

  const result = {  
    mandante: mandante,
    nomeRival: mandante ? nomeMandante : nomeVisitante,
    imagemRival: mandante ? imagemMandante : imagemVisitante,
    dataHoraJogo: dataHoraFormatada,
    campeonato: $('a.match__lg > div > div.match__lg_card--league').html(),
  };

  return result;
}

module.exports = {
  getNextGameAsync,
}