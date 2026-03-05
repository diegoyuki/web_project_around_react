import { useState, useEffect, useContext } from "react";
import Popup from "./componentes/popup/popup.jsx";
import ImagePopup from "./componentes/ImagePopup/ImagePopup.jsx";
import NewCard from "./componentes/form/newcard.jsx";
import EditProfile from "./componentes/form/editprofile.jsx";
import EditAvatar from "./componentes/form/editavatar.jsx";
import ConfirmDelete from "./componentes/form/confirmdelete.jsx";
import Card from "./componentes/card/card.jsx";
import User from "./componentes/user/user.jsx";
import api from "../../utils/api.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

export default function Main() {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

  const [cards, setCards] = useState([]);
  const [popup, setPopup] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  // =============================
  // Cargar tarjetas
  // =============================
  useEffect(() => {
    api.getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => console.log(err));
  }, []);

  function closeAllPopups() {
    setPopup(null);
    setSelectedCard(null);
  }

  // =============================
  // Agregar tarjeta
  // =============================
  function handleAddCard({ name, link }) {
    api.addCard({ name, link })
      .then((newCard) => {
        setCards((prevCards) => [newCard, ...prevCards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  // =============================
  // LIKE / UNLIKE
  // =============================
  function handleCardLike(card) {
    const isLiked = card.likes.some(
      (user) => user._id === currentUser._id
    );

    const request = isLiked
      ? api.unlikeCard(card._id)
      : api.likeCard(card._id);

    request
      .then((newCard) => {
        setCards((state) =>
          state.map((c) =>
            c._id === card._id ? newCard : c
          )
        );
      })
      .catch((err) => console.log(err));
  }

  // =============================
  // ELIMINAR TARJETA
  // =============================
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((c) => c._id !== card._id)
        );
      })
      .catch((err) => console.log(err));
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
                onUpdateUser={(data) => {
                  handleUpdateUser(data);
                  closeAllPopups();
                }}
              />
            ),
          })
        }
        onEditAvatar={() =>
          setPopup({
            title: "Editar avatar",
            children: <EditAvatar />,
          })
        }
        onAddPlace={() =>
          setPopup({
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
            onImageClick={setSelectedCard}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
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