import React from "react";

const CardDueDate = () => {
  return (
    <li className="due-date-section">
      <h3>Due Date</h3>
      <div id="dueDateDisplay" className="overdue completed">
        <input
          id="dueDateCheckbox"
          type="checkbox"
          className="checkbox"
          checked=""
        />
        {card.dueDate}<span>(past due)</span>
      </div>
    </li>
  )
}

export default CardDueDate;