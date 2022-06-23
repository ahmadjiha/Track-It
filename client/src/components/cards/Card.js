import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

import { fetchCard } from "../../features/cards/cards";

import CardHeader from "./CardHeader";
import Details from "./Details";
import AddComment from "./AddComment"
import Activity from "./Activity";
import SideBar from "./SideBar";

const Card = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

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

  return (
    <div id="modal-container">
      <div className="screen"></div>
      <div id="modal">
        <Link to={"/boards/" + card.boardId}>
          <i className="x-icon icon close-modal"></i>
        </Link>
        <CardHeader card={card} list={list}/>
        <section className="modal-main">
          <ul className="modal-outer-list">
            <Details card={card}/>
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