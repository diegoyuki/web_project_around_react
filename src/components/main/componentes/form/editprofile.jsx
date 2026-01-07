import { useState } from "react";

export default function EditProfile({ currentUser, onUpdateUser }) {
  const [name, setName] = useState(currentUser.name);
  const [about, setAbout] = useState(currentUser.about);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({ name, about });
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        className="form__input"
        minLength="2"
        maxLength="40"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <span className="form__input-error"></span>

      <input
        className="form__input"
        minLength="2"
        maxLength="200"
        required
        value={about}
        onChange={(e) => setAbout(e.target.value)}
      />
      <span className="form__input-error"></span>

      <button className="form__submit" type="submit">
        Guardar
      </button>
    </form>
  );
}
