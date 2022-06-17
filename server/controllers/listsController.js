const List = require("../models/list");
const Board = require("../models/board");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const createList = async (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      const list = await List.create(req.body.list);
      const currentBoard = await Board.findById(list.boardId);
      currentBoard.lists = currentBoard.lists.concat(list._id);
      await currentBoard.save();
  
      res.json({
        title: list.title,
        _id: list._id,
        createdAt: list.createdAt,
        updatedAt: list.updatedAt,
        boardId: list.boardId,
      });
    } catch (err) {
      next(new HttpError("Creating list failed, please try again", 500))
    }
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

const editList = async(req, res, next) => {
  const errors = validationResult(req); 
  if (errors.isEmpty()) {
    try {
      const list = await List.findById(req.params.id);
      
      console.log(list);

      if (!list) {
        return next(new HttpError("Invalid ID", 404))
      }

      list.title = req.body.list.title;
      list.updatedAt = new Date();

      await list.save();

      res.json({
        title: list.title,
        _id: list._id,
        createdAt: list.createdAt,
        updatedAt: list.updatedAt,
        boardId: list.boardId,
      });
    } catch (err) {
      next(new HttpError("Updating list failed, please try again", 500))
    }
  } else {
    return next(new HttpError("Unprocessable Entity", 422));
  }
}

exports.createList = createList;
exports.editList = editList;