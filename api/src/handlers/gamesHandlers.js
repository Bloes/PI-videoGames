const {
  createGameDB,
  getGamesById,
  getAllGames,
  getGamesByName,
  getPlatformsByGameId,
  deleteGameDB,
  updateGameDB,
} = require("../controllers/videogames");

const getGamesHandler = async (req, res) => {
  const { name, page, sortBy, order, origin } = req.query;

  try {
    let games;
    if (name) {
      if (typeof name !== "string") {
        res.status(400).json({ error: "Invalid name parameter" });
      } else {
        games = await getGamesByName(name);
      }
    } else {
      const pageNumber = parseInt(page, 10) || 1; // paginado tienen este formato las api "https://api.rawg.io/api/platforms?key=0c5bfcd038404665a9f60cb7177d7f2f&page=2",
      games = await getAllGames(pageNumber);
    }

    // origen para ver si es de la api o db
    if (origin) {
      games = games.filter((game) => {
        if (origin === "API") {
          return !game.created;
        } else if (origin === "DB") {
          return game.created;
        }
      });
    }

    // Sort de rating para despues retornarme un ligero orden entre los juegos
    if (sortBy === "rating" && (order === "ASC" || order === "DESC")) {
      games = sortGamesByRating(games, order);
    } else if (
      sortBy === "alphabetical" &&
      (order === "ASC" || order === "DESC")
    ) {
      games.sort((a, b) => {
        if (order === "ASC") {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
    }

    res.status(200).json(games);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getDetailHandler = async (req, res) => {
  const { id } = req.params;
  const source = isNaN(id) ? "bdd" : "api"; //aca puedo saber si es que estoy en la api o no
  console.log(id, source);
  try {
    const response = await getGamesById(id, source);

    // darle a las plataformas el formato de array
    if (response.platforms && Array.isArray(response.platforms)) {
      response.platforms = response.platforms.map(
        (platform) => platform.platform || platform
      );
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createGameHandler = async (req, res) => {
  const { name, description, platforms, image, releaseDate, rating, genres } =
    req.body;
  try {
    const newGame = await createGameDB(
      name,
      description,
      platforms,
      image,
      releaseDate,
      rating,
      genres
    );
    const associatedGenres = await newGame.getGenres();
    const response = newGame.toJSON();
    response.genres = associatedGenres;
    res.status(201).json(response); // creado con exito
  } catch (error) {
    if (error.message === "A game with this name already exists") {
      res.status(409).json({ error: error.message }); // conflicto
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const getPlatformsHandler = async (req, res) => {
  const { gameId } = req.params;
  try {
    const response = await getPlatformsByGameId(gameId);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteGameHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await deleteGameDB(id); // si encuentro lo destruyo
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateGameHandler = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const updatedGame = await updateGameDB(id, updatedData);
    const associatedGenres = await updatedGame.getGenres();
    const response = updatedGame.toJSON();
    response.genres = associatedGenres;
    res.status(200).json(response);
  } catch (error) {
    if (error.message.startsWith("Game with id")) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = {
  getDetailHandler,
  getGamesHandler,
  createGameHandler,
  getPlatformsHandler,
  deleteGameHandler,
  updateGameHandler,
};