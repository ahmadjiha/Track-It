const {check} = require('express-validator');

exports.validateBoard = [check("board.title").not().isEmpty()];

exports.validateList = [check("list.title").not().isEmpty() && check("list.boardId").not().isEmpty()];

exports.validateCard = [check("card.title").not().isEmpty() && check("card.listId").not().isEmpty()];