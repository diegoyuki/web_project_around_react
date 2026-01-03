import React, { useState } from "react";

export default function NewCard() {
  const [cardName, setCardName] = useState("");
  const [cardLink, setCardLink] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Card name:", cardName, "Card link:", cardLink);
  };

  return (
    <form className="popup__form" onSubmit={handleSubmit}>
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_card-name"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          placeholder="Title"
          required
          type="text"
        />
        <span className="popup__error" id="card-name-error"></span>
      </label>
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_url"
          value={cardLink}
          onChange={(e) => setCardLink(e.target.value)}
          placeholder="Image link"
          required
          type="url"
        />
        <span className="popup__error" id="card-link-error"></span>
      </label>
      <button className="button popup__button" type="submit">
        Guardar
      </button>
    </form>
  );
}
