const {check} = require('express-validator');

exports.validateBoard = [check("board.title").not().isEmpty()];

exports.validateList = [check("list.title").not().isEmpty(), check("boardId").not().isEmpty()];

exports.validateEditList = [check("title").not().isEmpty()];

exports.validateCard = [check("card.title").not().isEmpty(), check("listId").not().isEmpty()];

exports.validateUpdateCard = [check("card").custom((card) => {
  if (card.title !== undefined && card.title === "") {
    return false;
  }

  const { title, listId, position, description, archived, dueDate, completed, labels, ...others} = card;

  if (Object.keys(others).length !== 0) {
    return false;
  }

  const props = ["title", "listId", "position", "description", "archived", "dueDate", "completed", "labels"];

  if (!props.some(prop => card[prop] !== undefined)) {
    return false;
  }

  return true;
})];