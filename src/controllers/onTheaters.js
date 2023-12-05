const fetch = require("node-fetch");

const emCartaz = async (req, res) => {
  const { pagina } = req.query;
  let paginaCartaz = pagina;
  if (!pagina) {
    paginaCartaz = 1;
  }
  const url = `https://api.themoviedb.org/3/movie/now_playing?language=pt-br&page=${paginaCartaz}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOGQ3Nzc3YmIzNzg5OTZiODZiYjUxM2NhYmQ2M2NhYiIsInN1YiI6IjY1NmY4ZWQxNjUxN2Q2MDBjYzQzNjBlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.N3lNfV9Q1cwdead1_8_gmOQhNUc7v9P2gKNHTewfHik",
    },
  };
  try {
    const emCartaz = await fetch(url, options);
    const emCartazJson = await emCartaz.json();
    const filmes = emCartazJson.results;
    const filmesFormatados = [];
    filmes.forEach((filme) => {
      const filmeFormatado = {
        id: filme.id,
        titulo: filme.title,
        imagem: filme.poster_path,
        descricao: filme.overview,
        lancamento: filme.release_date,
        nota: filme.vote_average,
      };
      filmesFormatados.push(filmeFormatado);
    });

    res.json(filmesFormatados);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = emCartaz;
