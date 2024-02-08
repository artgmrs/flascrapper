const { DateTime } = require('luxon');

const formatDate = (dataHora) => {
  let dataLocal;
  
  let valoresArray = dataHora.split('<br>');
  let horasEMinutosArray = valoresArray[1].trim().split(':');

  const horas = +horasEMinutosArray[0];
  const minutos = +horasEMinutosArray[1];

  let hoje = DateTime.now();

  if (dataHora.includes('hoje')) {
    dataLocal = DateTime.now().setZone("America/Sao_Paulo").set({hour: horas, minute: minutos});
  } else if (dataHora.includes('amanhã')) {
    dataLocal = DateTime.now().setZone("America/Sao_Paulo").plus({days: 1}).set({hour: horas, minute: minutos});
  } else {
    let dataMesArray = valoresArray[0].slice(5).replace(',', '').trim().split('/'); 

    const mes = +dataMesArray[1];
    const dia = +dataMesArray[0];
    
    dataLocal = DateTime.fromObject({year: hoje.year, month:mes, day: dia, hour: horas, minute: minutos}, {zone: 'America/Sao_Paulo'});
  }

  dataLocal = dataLocal.set({second: 0, millisecond: 0});

  return dataLocal;
}

module.exports = {
  formatDate,
}