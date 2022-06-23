import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCard } from "../../features/cards/cards";

const DescriptionForm = ({ card }) => {
  const dispatch = useDispatch();
  const [description, setDescription] = useState(card.description);
  const [editFormActive, setEditFormActive] = useState(false);

  const toggleDescriptionEdit = () => {
    setEditFormActive(!editFormActive);
  }

  const handleEditClick = event => {
    event.preventDefault();
    setEditFormActive(true);
  }

  const handleXButtonClick = event => {
    event.preventDefault();
    setDescription(card.description);
    toggleDescriptionEdit();
  }

  const handleEditDescription = event => {
    event.preventDefault();
    setDescription(event.target.value);
  }

  const handleUpdateDescription = event => {
    event.preventDefault();
    const id = card._id
    const cardUpdates = { description }
    dispatch(updateCard({ id, cardUpdates, callback: toggleDescriptionEdit }));
  }

  return (
    <form className="description">
      <p>Description</p>
      <span id="description-edit" className="link" onClick={handleEditClick}>
        Edit
      </span>
      {editFormActive ? 
        <>
          <textarea className="textarea-toggle" rows="1" autoFocus value={description} onChange={handleEditDescription}/>
          <div>
            <div className="button" value="Save" onClick={handleUpdateDescription}>
              Save
            </div>
            <i className="x-icon icon" onClick={handleXButtonClick}></i>
          </div>
        </> 
      :
        <>
          <p className="textarea-overlay">
            {card.description}
          </p>
          {/* still need to implement the below */}
          <p id="description-edit-options" className="hidden">
            You have unsaved edits on this field.{" "}
            <span className="link">View edits</span> -{" "}
            <span className="link">Discard</span>
          </p>
        </>
      }

    </form>
  )
}

export default DescriptionForm;