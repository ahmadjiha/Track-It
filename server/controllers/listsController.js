const List = require("../models/List");
const Board = require("../models/Board");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const getLists = (req, res, next) => {
  List.find({}, "title _id createdAt updatedAt boardId").then((lists) => {
    res.json(lists);
  });
};

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

exports.getLists = getLists;
exports.createList = createList;