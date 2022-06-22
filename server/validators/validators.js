const {check} = require('express-validator');

exports.validateBoard = [check("board.title").not().isEmpty()];

exports.validateList = [check("list.title").not().isEmpty(), check("boardId").not().isEmpty()];

exports.validateEditList = [check("title").not().isEmpty()];

exports.validateCard = [check("card.title").not().isEmpty(), check("listId").not().isEmpty()];