import { useState } from "react";
import ImagePopup from "../ImagePopup/ImagePopup.jsx";

import likeInactive from "../../../../images/heartbutton.svg";
import likeActive from "../../../../images/heartactive.png";
import deleteIcon from "../../../../images/delete.svg";

export default function Card({ card, onImageClick, onDelete }) {
  const { name, link, isLiked } = card;
  const [liked, setLiked] = useState(isLiked);

  function handleLikeClick() {
    setLiked((prev) => !prev);
  }

  function handleDeleteClick() {
    onDelete(card); 
  }

  function handleImageClick() {
    onImageClick(card); 
  }

  return (
    <article className="gallery__item">
      <button
        className="card__delete-button"
        type="button"
        onClick={handleDeleteClick}
      >
        <img src={deleteIcon} alt="Eliminar tarjeta" />
      </button>

      <img
        className="gallery__image"
        src={link}
        alt={name}
        onClick={handleImageClick}
      />

      <div className="gallery__info">
        <h2 className="gallery__title">{name}</h2>

        <button
          className="gallery__button_like"
          type="button"
          onClick={handleLikeClick}
        >
          <img
            src={liked ? likeActive : likeInactive}
            alt="Like"
          />
        </button>
      </div>
    </article>
  );
}