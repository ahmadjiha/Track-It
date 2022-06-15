const express = require ('express');
const router = express.Router();
const boardsController = require("../controllers/boardsController");
const listsController = require("../controllers/listsController");
const { validateBoard, validateList } = require("../validators/validators");


router.get('/boards',boardsController.getBoards );

router.get('/board/:id', boardsController.getBoard );

router.post('/boards', validateBoard, boardsController.createBoard );

router.post('/lists', validateList, listsController.createList );

module.exports = router;