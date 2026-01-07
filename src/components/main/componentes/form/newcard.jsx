import { useState } from "react";

export default function NewCard({ onAddCard }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onAddCard({ name, link });
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        className="form__input"
        placeholder="Título"
        minLength="2"
        maxLength="30"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <span className="form__input-error"></span>

      <input
        className="form__input"
        placeholder="Enlace de la imagen"
        type="url"
        required
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <span className="form__input-error"></span>

      <button className="form__submit" type="submit">
        Crear
      </button>
    </form>
  );
}
