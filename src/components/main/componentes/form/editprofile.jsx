import React, { useState } from "react";

export default function EditProfile() {
  const [userName, setUserName] = useState("");
  const [userBio, setUserBio] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Nombre:", userName, "Bio:", userBio);
  };

  return (
    <form className="popup__form" onSubmit={handleSubmit}>
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Nombre"
          required
          type="text"
        />
        <span className="popup__error" id="name-error"></span>
      </label>
      <label className="popup__field">
        <textarea
          className="popup__input popup__input_type_bio"
          value={userBio}
          onChange={(e) => setUserBio(e.target.value)}
          placeholder="Acerca de mí"
          required
        />
        <span className="popup__error" id="bio-error"></span>
      </label>
      <button className="button popup__button" type="submit">
        Guardar
      </button>
    </form>
  );
}
