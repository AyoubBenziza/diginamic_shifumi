const express = require("express");
const router = express.Router();
const gameController = require("../controller/gameController");

router.get("/", gameController.game);

router.post("/play/:action", gameController.play);

router.get("/score", gameController.getScore);

router.get("/score/:win/:lose/:tie", gameController.edit);

router.get("/restart", gameController.destroy);

module.exports = router;
