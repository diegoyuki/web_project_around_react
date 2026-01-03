import React, { useState } from "react";
import Popup from "./componentes/popup/popup.jsx";
import NewCard from "./componentes/form/newcard.jsx";
import EditProfile from "./componentes/form/editprofile.jsx";
import EditAvatar from "./componentes/form/editavatar.jsx";

export default function Main() {
  const [popup, setPopup] = useState(null);

  const newCardPopup = { title: "Nuevo lugar", children: <NewCard /> };
  const editProfilePopup = { title: "Editar Perfil", children: <EditProfile /> };
  const editAvatarPopup = { title: "Editar Avatar", children: <EditAvatar /> };

  function handleOpenPopup(popupData) {
    setPopup(popupData);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  return (
    <main className="main">
      <button
        aria-label="Add card"
        className="profile__add-button"
        type="button"
        onClick={() => handleOpenPopup(newCardPopup)}
      >
        Agregar tarjeta
      </button>

      <button
        aria-label="Edit profile"
        className="profile__edit-button"
        type="button"
        onClick={() => handleOpenPopup(editProfilePopup)}
      >
        Editar perfil
      </button>

      <button
        aria-label="Edit avatar"
        className="profile__avatar-edit-button"
        type="button"
        onClick={() => handleOpenPopup(editAvatarPopup)}
      >
        Editar avatar
      </button>

      {popup && (
        <Popup
          onClose={handleClosePopup}
          title={popup.title}
          className={popup ? "popup open" : "popup"}
        >
          {popup.children}
        </Popup>
      )}
    </main>
  );
}