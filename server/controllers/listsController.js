const List = require("../models/list");
const Board = require("../models/board");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const createList = async (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      const { boardId, list } = req.body;
      
      const currentBoard = await Board.find({ _id: boardId });
      
      if (currentBoard.length === 0) {
        next(new HttpError("Invalid Board Id", 404))
      }

      const newList = await List.create(list);
      currentBoard.lists = currentBoard.lists.concat(newList._id);
      await currentBoard.save();
  
      res.json({
        title: newList.title,
        _id: newList._id,
        createdAt: newList.createdAt,
        updatedAt: newList.updatedAt,
        boardId: newList.boardId,
      });
    } catch (err) {
      next(new HttpError("Creating list failed, please try again", 500))
    }
  } else {
    next(new HttpError("Unprocessable Entity", 422));
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

      list.title = req.body.title;
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