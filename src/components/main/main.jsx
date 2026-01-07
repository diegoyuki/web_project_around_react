import React, { useState } from "react";
import Popup from "./componentes/popup/popup.jsx";
import NewCard from "./componentes/form/newcard.jsx";
import EditProfile from "./componentes/form/editprofile.jsx";
import EditAvatar from "./componentes/form/editavatar.jsx";
import ConfirmDelete from "./componentes/form/confirmdelete.jsx";
import Card from "./componentes/card/card.jsx";
import User from "./componentes/user/user.jsx";
import avatarImage from "../../images/userimage.jpg";


const initialCards = [
  {
    isLiked: false,
    _id: "1",
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    isLiked: false,
    _id: "2",
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    isLiked: false,
    _id: "3",
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    isLiked: false,
    _id: "4",
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    isLiked: false,
    _id: "5",
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    isLiked: false,
    _id: "6",
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

export default function Main() {
  const [cards, setCards] = useState(initialCards);
  const [popup, setPopup] = useState(null);

  const [currentUser, setCurrentUser] = useState({
    name: "Jacques Cousteau",
    about: "Explorador",
    avatar: avatarImage,
  });

  function handleOpenPopup(popupData) {
    setPopup(popupData);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  /* 👤 PERFIL */
  function handleUpdateUser({ name, about }) {
    setCurrentUser((prev) => ({
      ...prev,
      name,
      about,
    }));
    handleClosePopup();
  }

  function handleUpdateAvatar(avatar) {
    setCurrentUser((prev) => ({
      ...prev,
      avatar,
    }));
    handleClosePopup();
  }

  /* 🖼️ TARJETAS */
  function handleAddCard({ name, link }) {
    const newCard = {
      _id: Date.now().toString(),
      name,
      link,
      isLiked: false,
    };
    setCards([newCard, ...cards]);
    handleClosePopup();
  }

  function handleDeleteClick(card) {
    setPopup({
      title: "¿Estás seguro?",
      children: (
        <ConfirmDelete
          onConfirm={() => handleConfirmDelete(card._id)}
        />
      ),
    });
  }

  function handleConfirmDelete(cardId) {
    setCards((prev) => prev.filter((c) => c._id !== cardId));
    handleClosePopup();
  }

  return (
    <main className="main">
      <User
        name={currentUser.name}
        about={currentUser.about}
        avatar={currentUser.avatar}
        onEditProfile={() =>
          handleOpenPopup({
            title: "Editar perfil",
            children: (
              <EditProfile
                currentUser={currentUser}
                onUpdateUser={handleUpdateUser}
              />
            ),
          })
        }
        onEditAvatar={() =>
          handleOpenPopup({
            title: "Editar avatar",
            children: (
              <EditAvatar onUpdateAvatar={handleUpdateAvatar} />
            ),
          })
        }
        onAddPlace={() =>
          handleOpenPopup({
            title: "Nuevo lugar",
            children: (
              <NewCard onAddCard={handleAddCard} />
            ),
          })
        }
      />

      <ul className="gallery">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onImageClick={handleOpenPopup}
            onDelete={handleDeleteClick}
          />
        ))}
      </ul>

      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}