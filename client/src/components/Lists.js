import React, { useState } from "react";
import List from "./List";
import { useParams } from "react-router-dom";
import { createList } from "../features/lists/lists";
import { useDispatch } from "react-redux";


const Lists = ({ lists }) => {
  const dispatch = useDispatch();
  const [showNewListBox, setShowNewListBox] = useState(false);  
  const [newListTitle, setNewListTitle] = useState('');
  const { id: boardId } = useParams();
  const newListDivVisible = showNewListBox ? "new-list selected" : "new-list";

  const listSaveButtonDisabled = newListTitle.length === 0;

  const handleClickNewList = (event) => {
    event.preventDefault();
    setShowNewListBox(true);
  }
  
  const handleCloseNewList = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setShowNewListBox(false);
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
    
    await dispatch(createList(newList));
    resetNewListBox();
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
      
      <div id="new-list" className={newListDivVisible} onClick={handleClickNewList} >
        <span>Add a list...</span>
        <input type="text" placeholder="Add a list..." onChange={handleNewListTitle} value={newListTitle}/>
        <div>
          <input type="submit" className="button" value="Save" disabled={listSaveButtonDisabled} onClick={handleSaveNewList}/>
          <i className="x-icon icon" onClick={handleCloseNewList}></i>
        </div>
      </div>
    </div>
  )
}

export default Lists;