import { useState } from "react";

export default function EditAvatar({ onUpdateAvatar }) {
  const [avatar, setAvatar] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(avatar);
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        className="form__input"
        placeholder="Enlace del avatar"
        type="url"
        required
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
      />
      <span className="form__input-error"></span>

      <button className="form__submit" type="submit">
        Guardar
      </button>
    </form>
  );
}

