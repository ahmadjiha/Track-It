import React from "react";
import { useHistory } from "react-router-dom";

const TopNav = () => {
  const navigate = useHistory();
  const handleAllBoardsClick = event => {
    event.preventDefault();
    navigate.push("/");
  }

  return (
    <nav>
      <ul>
          <li className="boards trello-icon icon" onClick={handleAllBoardsClick}>
            <span>Boards</span>
          </li>
        <li className="search-container">
          <div className="search search-icon icon"></div>
          <div className="active-search">
            <div>
              <input type="text" />
            </div>
            <i className="x-icon icon"></i>
            <i className="goto-icon icon"></i>
          </div>
        </li>
      </ul>
      <h1>Track-It</h1>
      <ul className="user-info">
        <li className="create-icon icon"></li>
        <li className="split-button-1">AJ</li>
        <li className="split-button-2">Ahmad Jiha</li>
        <li className="info-icon icon"></li>
        <li className="notifications-icon icon"></li>
      </ul>
    </nav>
  );
}


export default TopNav;
