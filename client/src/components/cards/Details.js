import React from "react";
import Labels from "./Labels";
import CardDueDate from "./CardDueDate";
import DescriptionForm from "./DescriptionForm";

const Details = ({ card }) => {

  return (
    <li className="details-section">
      <ul className="modal-details-list">
        {card.labels && card.labels.length > 0 &&
          <Labels card={card} />
        }

        {card.dueDate && 
          <CardDueDate card={card} />
        }
      </ul>
      <DescriptionForm card={card}/>
    </li>
  )
}

export default Details;