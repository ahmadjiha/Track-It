import React from "react";


const CommentTile = ({ comment }) => {
  const calculateTimePostInMinutes = () => {
    if (!comment) return 0;

    const timeLapsed = Date.now() - new Date(comment.createdAt)

    return Math.floor((timeLapsed) / 1000 / 60);
  }

  const timeLapsedInMinutes = calculateTimePostInMinutes();

  return (
      <li className="activity-comment">
      <div className="member-container">
        <div className="card-member">VR</div>
      </div>
      <h3>Victor Reyes</h3>
      <div className="comment static-comment">
        <span>{comment.text}</span>
      </div>
      <small>
        {timeLapsedInMinutes === 0 ? "Just now" : `${timeLapsedInMinutes} minutes ago`}  - <span className="link">Edit</span> -{" "}
        <span className="link">Delete</span>
      </small>
      <div className="comment">
        <label>
          <textarea required="" rows="1">
            {comment.text}
          </textarea>
          <div>
            <a className="light-button card-icon sm-icon"></a>
            <a className="light-button smiley-icon sm-icon"></a>
            <a className="light-button email-icon sm-icon"></a>
          </div>
          <div>
            <p>You haven&apos;t typed anything!</p>
            <input
              type="submit"
              className="button not-implemented"
              value="Save"
            />
            <i className="x-icon icon"></i>
          </div>
        </label>
      </div>
    </li>
  );
}
 
export default CommentTile;