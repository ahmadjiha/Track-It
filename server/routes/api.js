const express = require ('express');
const router = express.Router();
const boardsController = require("../controllers/boardsController");
const listsController = require("../controllers/listsController");
const cardsController = require('../controllers/cardsController');
const commentsController = require('../controllers/commentsController');
const { validateBoard, validateList, validateEditList, validateCard, validateComment } = require("../validators/validators");

// Boards
router.get('/boards',boardsController.getBoards );
router.get('/boards/:id', boardsController.getBoard );
router.post('/boards', validateBoard, boardsController.createBoard );

// Lists
router.post('/lists', validateList, listsController.createList );
router.put('/lists/:id', validateEditList, listsController.editList );

// Cards
router.post('/cards', validateCard, cardsController.createCard );
router.get('/cards/:id', cardsController.getCard );

// Comments
router.post('/comments', validateComment, commentsController.createComment );

module.exports = router;