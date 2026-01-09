import { useState } from "react";

export default function EditAvatar({ onUpdateAvatar }) {
  const [avatar, setAvatar] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(avatar);
  }

  return (
    <form className="edit-avatar-form" onSubmit={handleSubmit}>
      <input
        className="form-validator__input"
        placeholder="Enlace del avatar"
        type="url"
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
        required
      />

      <button className="edit-avatar-form__submit" type="submit">
        Guardar
      </button>
    </form>
  );
}

