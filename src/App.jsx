import { useState, useEffect } from "react";
import Header from "./components/header/header";
import Main from "./components/main/Main";
import Footer from "./components/footer/footer";
import CurrentUserContext from "./contexts/CurrentUserContext";
import api from "./utils/api";

function App() {

  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch(console.log);

    api.getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch(console.log);

  }, []);

  function handleUpdateUser(data) {
    api.updateUserInfo(data)
      .then((newData) => {
        setCurrentUser(newData);
      })
      .catch(console.log);
  }

  function handleUpdateAvatar(data) {
    api.updateAvatar(data)
      .then((newUser) => {
        setCurrentUser(newUser);
      })
      .catch(console.log);
  }

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
      .catch(console.log);
  }

  function handleCardDelete(card) {

    api.deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((c) => c._id !== card._id)
        );
      })
      .catch(console.log);
  }

  function handleAddPlaceSubmit({ name, link }) {

    api.addCard({ name, link })
      .then((newCard) => {

        setCards((prevCards) => [newCard, ...prevCards]);

      })
      .catch(console.log);
  }

  if (!currentUser) {
    return null;
  }

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleUpdateUser,
        handleUpdateAvatar
      }}
    >
      <div className="page">
        <Header />
        <Main
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;