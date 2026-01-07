import { useState } from "react";
import ImagePopup from "../ImagePopup/ImagePopup.jsx";

import likeInactive from "../../../../images/heartbutton.svg";
import likeActive from "../../../../images/heartactive.png";
import deleteIcon from "../../../../images/delete.svg";

export default function Card(props) {
  const { card, onImageClick, onDelete } = props;
  const { name, link, isLiked, _id } = card;

  const [liked, setLiked] = useState(isLiked);

  function handleLikeClick() {
    setLiked((prev) => !prev);
  }

  function handleDeleteClick() {
  onDelete(card);
}

  const imageComponent = {
    title: null,
    children: <ImagePopup card={card} />,
  };

  return (
    <article className="gallery__item">
      {/* PAPELERA */}
      <button
        className="card__delete-button"
        type="button"
        onClick={handleDeleteClick}
      >
        <img src={deleteIcon} alt="Eliminar tarjeta" />
      </button>

      {/* IMAGEN */}
      <img
        className="gallery__image"
        src={link}
        alt={name}
        onClick={() => onImageClick(imageComponent)}
      />

      <div className="gallery__info">
        <h2 className="gallery__title">{name}</h2>

        {/* LIKE */}
        <button
          className="gallery__button_like"
          type="button"
          aria-label="Like"
          onClick={handleLikeClick}
        >
          <img
            src={liked ? likeActive : likeInactive}
            alt={liked ? "Quitar me gusta" : "Me gusta"}
          />
        </button>
      </div>
    </article>
  );
}
