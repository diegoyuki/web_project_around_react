import React, { useState } from "react";

export default function EditAvatar() {
  const [avatarUrl, setAvatarUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Avatar URL:", avatarUrl);
  };

  return (
    <form className="popup__form" onSubmit={handleSubmit}>
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_url"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
          placeholder="URL de la imagen"
          required
          type="url"
        />
        <span className="popup__error" id="avatar-error"></span>
      </label>
      <button className="button popup__button" type="submit">
        Guardar
      </button>
    </form>
  );
}
