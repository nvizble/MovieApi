const search = async (req, res) => {
  const { filme } = req.query;
  const url = `https://api.themoviedb.org/3/search/movie?language=pt-br&query=${filme}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOGQ3Nzc3YmIzNzg5OTZiODZiYjUxM2NhYmQ2M2NhYiIsInN1YiI6IjY1NmY4ZWQxNjUxN2Q2MDBjYzQzNjBlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.N3lNfV9Q1cwdead1_8_gmOQhNUc7v9P2gKNHTewfHik",
    },
  };
  try {
    const search = await fetch(url, options);
    const searchJson = await search.json();
    const filmes = searchJson.results;
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

module.exports = search;
