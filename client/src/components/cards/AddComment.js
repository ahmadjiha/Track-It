import { createDraftSafeSelector } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createComment } from "../../features/comments/comments";

const AddComment = ({ card }) => {
  const [newCommentText, setNewCommentText] = useState("");
  const dispatch = useDispatch();

  const disableAddCommentSaveButton = newCommentText.length === 0 ? true : false;

  const handleNewCommentTextChange = (event) => {
    event.preventDefault();
    setNewCommentText(event.target.value);
  }
  
  const handleAddComment =  (event) => {
    event.preventDefault();
    if (newCommentText !== 0) {
      dispatch(createComment({ cardId: card._id, comment: { text: newCommentText }, callback: resetCommentForm }));
    }
  }

  const resetCommentForm = () => {
    setNewCommentText("");
  }
  
  return (
    <li className="comment-section">
      <h2 className="comment-icon icon">Add Comment</h2>
      <div>
        <div className="member-container">
          <div className="card-member">TP</div>
        </div>
        <div className="comment">
          <label>
            <textarea
              required=""
              rows="1"
              placeholder="Write a comment..."
              onChange={handleNewCommentTextChange}
            >{newCommentText}</textarea>
            <div>
              <a className="light-button card-icon sm-icon"></a>
              <a className="light-button smiley-icon sm-icon"></a>
              <a className="light-button email-icon sm-icon"></a>
              <a className="light-button attachment-icon sm-icon"></a>
            </div>
            <div>
              <input
                type="submit"
                className="button not-implemented"
                disabled={disableAddCommentSaveButton}
                value="Save"
                onClick={handleAddComment}
              />
            </div>
          </label>
        </div>
      </div>
    </li>
  )
}

export default AddComment;