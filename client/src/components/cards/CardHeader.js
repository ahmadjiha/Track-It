import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCard } from "../../features/cards/cards";


const CardHeader = ({ card, list}) => {
  const dispatch = useDispatch();
  const [cardTitle, setCardTitle] = useState(card.title);

  const handleSetCardTitle = (event) => {
    // check: handling state (in-component)
    event.preventDefault();
    setCardTitle(event.target.value);
  }

  const handleUpdateCardTitle = (event) => {
    event.preventDefault();
    const id = card._id;
    const cardUpdates = { title: cardTitle }
    dispatch(updateCard({ id, cardUpdates }));
  }
  
  return (
    <header>
      <i className="card-icon icon .close-modal"></i>
      <textarea className="list-title" style={{ height: "45px" }} value={cardTitle} onChange={handleSetCardTitle} onBlur={handleUpdateCardTitle}/>
      <p>
        in list <a className="link">{list.title}</a>
        <i className="sub-icon sm-icon"></i>
      </p>
    </header>
  )
}

export default CardHeader;