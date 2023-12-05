const movieById = async (req, res) => {
  const { id } = req.params;
  const url = `https://api.themoviedb.org/3/movie/${id}?language=pt-br`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOGQ3Nzc3YmIzNzg5OTZiODZiYjUxM2NhYmQ2M2NhYiIsInN1YiI6IjY1NmY4ZWQxNjUxN2Q2MDBjYzQzNjBlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.N3lNfV9Q1cwdead1_8_gmOQhNUc7v9P2gKNHTewfHik",
    },
  };
  try {
    const filme = await fetch(url, options);
    const filmeJson = await filme.json();
    const generos = filmeJson.genres;
    const generosFormatados = [];
    generos.forEach((genero) => {
      const generoFormatado = genero.name;
      generosFormatados.push(generoFormatado);
    });
    console.log(generosFormatados);
    const filmeFormatado = {
      adulto: filmeJson.adult,
      id: filmeJson.id,
      titulo: filmeJson.title,
      imagem: filmeJson.poster_path,
      descricao: filmeJson.overview,
      lancamento: filmeJson.release_date,
      nota: filmeJson.vote_average,
      generos: generosFormatados,
    };
    res.json(filmeFormatado);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = movieById;
