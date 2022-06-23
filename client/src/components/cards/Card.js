import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchCard } from "../../features/cards/cards";
import AddComment from "./AddComment"
import Activity from "./Activity";
import CardDueDate from "./CardDueDate";
import Labels from "./Labels";
import SideBar from "./SideBar";
import DescriptionForm from "./DescriptionForm";
import { updateCard } from "../../features/cards/cards";

const Card = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [cardTitle, setCardTitle] = useState("");

  useEffect(() => {
    dispatch(fetchCard({id}));
  }, [dispatch, id]);
  
  const cards = useSelector(state => state.cards);
  const card = cards.find(card => card._id === id);

  const lists = useSelector(state => state.lists);

  if (!card) {
    return
  }


  const list = lists.find(list => list._id === card.listId);

  const handleSetCardTitle = (event) => {
    // check: handling state (in-component)
    event.preventDefault();
    setCardTitle(event.target.value);
  }

  const handleUpdateCardTitle = (event) => {
    event.preventDefault();
    const cardUpdates = { title: cardTitle }
    dispatch(updateCard({ id, cardUpdates }));
  }

  return (
    <div id="modal-container">
      <div className="screen"></div>
      <div id="modal">
        <Link to={"/boards/" + card.boardId}>
          <i className="x-icon icon close-modal"></i>
        </Link>
        <header>
          <i className="card-icon icon .close-modal"></i>
          <textarea className="list-title" style={{ height: "45px" }} defaultValue={card.title} onChange={handleSetCardTitle} onBlur={handleUpdateCardTitle}/>
          <p>
            in list <a className="link">{list.title}</a>
            <i className="sub-icon sm-icon"></i>
          </p>
        </header>
        <section className="modal-main">
          <ul className="modal-outer-list">
            <li className="details-section">
              <ul className="modal-details-list">
                {card.labels.length > 0 &&
                  <Labels card={card} />
                }
                {card.dueDate && 
                  <CardDueDate card={card} />
                }
              </ul>
              <DescriptionForm card={card}/>
            </li>
            <AddComment card={card} />
            <Activity card={card}/>
          </ul>
        </section>
        <SideBar />
      </div>
    </div>
  );
};

export default Card;