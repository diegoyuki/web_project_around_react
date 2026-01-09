import React, { useState } from "react";
import Popup from "./componentes/popup/popup.jsx";
import ImagePopup from "./componentes/ImagePopup/ImagePopup.jsx";
import NewCard from "./componentes/form/newcard.jsx";
import EditProfile from "./componentes/form/editprofile.jsx";
import EditAvatar from "./componentes/form/editavatar.jsx";
import ConfirmDelete from "./componentes/form/confirmdelete.jsx";
import Card from "./componentes/card/card.jsx";
import User from "./componentes/user/user.jsx";
import avatarImage from "../../images/userimage.jpg";

const initialCards = [
  {
    _id: "1",
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
    isLiked: false,
  },
  {
    _id: "2",
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
    isLiked: false,
  },
  {
    _id: "3",
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
    isLiked: false,
  },
  {
    _id: "4",
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
    isLiked: false,
  },
  {
    _id: "5",
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
    isLiked: false,
  },
  {
    _id: "6",
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
    isLiked: false,
  },
];

export default function Main() {
  const [cards, setCards] = useState(initialCards);
  const [popup, setPopup] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({
    name: "Jacques Cousteau",
    about: "Explorador",
    avatar: avatarImage,
  });

  function closeAllPopups() {
    setPopup(null);
    setSelectedCard(null);
  }

  /* PERFIL */
  function handleUpdateUser({ name, about }) {
    setCurrentUser((prev) => ({ ...prev, name, about }));
    closeAllPopups();
  }

  function handleUpdateAvatar(avatar) {
    setCurrentUser((prev) => ({ ...prev, avatar }));
    closeAllPopups();
  }

  /* TARJETAS */
  function handleAddCard({ name, link }) {
    setCards([{ _id: Date.now().toString(), name, link, isLiked: false }, ...cards]);
    closeAllPopups();
  }

  function handleDeleteClick(card) {
    setPopup({
      title: "¿Estás seguro?",
      children: (
        <ConfirmDelete
          onConfirm={() => {
            setCards((prev) => prev.filter((c) => c._id !== card._id));
            closeAllPopups();
          }}
        />
      ),
    });
  }

  return (
    <main className="main">
      <User
        name={currentUser.name}
        about={currentUser.about}
        avatar={currentUser.avatar}
        onEditProfile={() =>
          setPopup({
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
          setPopup({
            title: "Editar avatar",
            children: <EditAvatar onUpdateAvatar={handleUpdateAvatar} />,
          })
        }
        onAddPlace={() =>
          setPopup({
            title: "Nuevo lugar",
            children: <NewCard onAddCard={handleAddCard} />,
          })
        }
      />

      <ul className="gallery">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onImageClick={setSelectedCard}
            onDelete={handleDeleteClick}
          />
        ))}
      </ul>

      {popup && (
        <Popup title={popup.title} onClose={closeAllPopups}>
          {popup.children}
        </Popup>
      )}

      {selectedCard && (
        <ImagePopup
    card={selectedCard}
    onClose={closeAllPopups}
  />
      )}
    </main>
  );
}