import React, { useState } from "react";
import List from "./List";
import { useParams } from "react-router-dom";
import { createList } from "../features/lists/lists";
import { useSelector, useDispatch } from "react-redux";


const Lists = () => {
  const dispatch = useDispatch();
  const { id: boardId } = useParams();
  const lists = useSelector((state) => state.lists).filter(list => list.boardId === boardId);

  const [showNewListBox, setShowNewListBox] = useState(false);  
  const [newListTitle, setNewListTitle] = useState('');

  const newListClassName = showNewListBox ? "new-list selected" : "new-list";
  const listSaveButtonDisabled = newListTitle.length === 0;

  const handleToggleNewList = (event) => {
    event.preventDefault();
    setShowNewListBox(!showNewListBox);
  }

  const handleNewListTitle = (event) => {
    event.preventDefault();
    setNewListTitle(event.target.value);
  }

  const handleSaveNewList = async (event) => {
    event.preventDefault();
    
    const newList = {
      title: newListTitle,
      boardId: boardId
    };
    
    dispatch(createList({newList, callback: resetNewListBox}));
  }

  const resetNewListBox = () => {
    setShowNewListBox(false);
    setNewListTitle('');
  }

  return (
    <div id="list-container" className="list-container">
      
      <div id="existing-lists" className="existing-lists">
        {lists.map(list => (
          <List key={list._id} list={list}/>
        ))}
      </div>
      
      <div id="new-list" className={newListClassName}>
        <span onClick={handleToggleNewList}>Add a list...</span>
        <input type="text" placeholder="Add a list..." onChange={handleNewListTitle} value={newListTitle}/>
        <div>
          <input type="submit" className="button" value="Save" disabled={listSaveButtonDisabled} onClick={handleSaveNewList}/>
          <i className="x-icon icon" onClick={handleToggleNewList}></i>
        </div>
      </div>
    </div>
  )
}

export default Lists;