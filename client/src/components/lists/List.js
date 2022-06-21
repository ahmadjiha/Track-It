import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CardTile from "../cards/CardTile";
import { editListTitle } from "../../features/lists/lists";
import { createCard } from "../../features/cards/cards";

const List = ({ list }) => {
  const dispatch = useDispatch();
  const [editedListTitle, setEditedListTitle] = useState(list.title);
  const [editTitleVisible, setEditTitleVisible] = useState(false);
  const [showNewCardForm, setshowNewCardForm] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState("");

  const listWrapperClassName = showNewCardForm ? "list-wrapper add-dropdown-active" : "list-wrapper";
  const newCardDivClassName = showNewCardForm ? "add-dropdown add-bottom active-card" : "add-dropdown add-bottom"

  // const disableAddCardSubmitButton = newCardTitle.length === 0 ? true : false;

  const allCards = useSelector(state => state.cards);
  const cards = allCards.filter(card => card.listId === list._id);

  console.log(allCards);
  console.log(cards);

  const toggleNewCardFormVisible = () => {
    setshowNewCardForm(!showNewCardForm);
    setEditedListTitle("");
  }

  const handleAddCardClick = (event) => {
    event.preventDefault();
    toggleNewCardFormVisible();
  }

  const handleNewCardTitleChange = (event) => {
    event.preventDefault();
    setNewCardTitle(event.target.value);
  }

  const handleAddCard = (event) => {
    event.preventDefault();
    if (newCardTitle.length !== 0) {
      dispatch(createCard({ listId: list._id, card: { title: newCardTitle }, callback: toggleNewCardFormVisible }));
    }
  }

  const handleTitleClick = (event) => {
    event.preventDefault();
    setEditTitleVisible(true);
  }

  const handleEditListTitle = (event) => {
    event.preventDefault();
    setEditedListTitle(event.target.value);
  }

  const handleTitleChange = (event) => {
    event.preventDefault();
    const updatedList = {
      _id: list._id,
      title: editedListTitle,
      boardId: list.boardId
    }

    dispatch(editListTitle({ updatedList, callback:  () => setEditTitleVisible(false)}))
  }

  return (
    
    <div className={listWrapperClassName}>
      <div className="list-background">
        <div className="list">
          <a className="more-icon sm-icon" href=""></a>
          <div>
            { editTitleVisible ? 
              <input
                type="text"
                className="list-title"
                value={editedListTitle}
                onChange={handleEditListTitle}
                onBlur={handleTitleChange}
                autoFocus
              />
              :
              <p onClick={handleTitleClick} className="list-title">{list.title}</p>
            }

          </div>
          <div className="add-dropdown add-top">
            <div className="card"></div>
            <a className="button">Add</a>
            <i className="x-icon icon"></i>
            <div className="add-options">
              <span>...</span>
            </div>
          </div>
          <div id="cards-container" data-id="list-1-cards">
            {cards.map(card => (
              <CardTile key={card._id} card={card} />
            ))}

          </div>
          <div className={newCardDivClassName}>
            <div className="card">
              <div className="card-info"></div>
              <textarea name="add-card" onChange={handleNewCardTitleChange}></textarea>
              <div className="members"></div>
            </div>
            <a className="button" onClick={handleAddCard}>Add</a>
            <i className="x-icon icon" onClick={toggleNewCardFormVisible}></i>
            <div className="add-options">
              <span>...</span>
            </div>
          </div>
          <div className="add-card-toggle" data-position="bottom" onClick={handleAddCardClick}>
            Add a card...
          </div>
        </div>
      </div>
    </div>
  )
}



/*
            <div className="card-background">
              <div className="card ">
                <i className="edit-toggle edit-icon sm-icon"></i>
                <div className="cover-image"></div>
                <div className="card-info">
                  <p>Another list with stuff</p>
                </div>
                <div className="card-icons">
                  <i className="clock-icon sm-icon overdue ">Aug 3</i>
                  <i className="description-icon sm-icon"></i>
                </div>
              </div>
            </div>
            <div className="card-background">
              <div className="card ">
                <i className="edit-toggle edit-icon sm-icon"></i>
                <div className="cover-image"></div>
                <div className="card-info">
                  <p>
                    Use the + in the top menu to make your first board
                    now.
                  </p>
                </div>
                <div className="card-icons"></div>
              </div>
            </div>
*/

export default List;