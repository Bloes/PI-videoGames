const { Router } = require("express");
const {getDetailHandler, getGamesHandler, createGameHandler, getPlatformsHandler, deleteGameHandler, updateGameHandler} = require("../handlers/gamesHandlers")
const { getGenresHandler, getAllGenresHandler, fetchAndSaveGenresHandler } = require("../handlers/genreHandlers")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/games", getGamesHandler);

router.get("/games/:id", getDetailHandler);

router.post("/create", createGameHandler);

router.get("/genres/:gameId", getGenresHandler)

router.get("/platforms/:gameId", getPlatformsHandler);

router.get("/genres",getAllGenresHandler );

router.get("/fetchandsave", fetchAndSaveGenresHandler);

router.delete("/games/:id", deleteGameHandler);

router.put("/games/:id", updateGameHandler);

module.exports = router;