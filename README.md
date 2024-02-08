# Flascrapper
Função Serverless que executa na Vercel e realiza um 'scrappe' de um site para obter dados sobre o próximo jogo do flamengo.

O retorno vem do seguinte modelo: 
```json
{
    "mandante": false,
    "nomeRival": "Cruzeiro",
    "imagemRival": "https://www.example.com/images/teams/cruzeiro.png",
    "dataHoraJogo": "2023-10-19T19:00:00.000-03:00",
    "campeonato": "Campeonato Brasileiro"
}
```

# Para rodar o projeto
1. Configurar a variável `URL_SCRAPE` em um arquivo .env. Esta é a URL do site alvo.
2. `npm start`
