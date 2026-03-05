import { useState, useEffect } from "react";
import Header from "./components/header/header";
import Main from "./components/main/main";
import Footer from "./components/footer/footer";
import CurrentUserContext from "./contexts/CurrentUserContext";
import api from "./utils/api";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    api.getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch(console.log);
  }, []);

  function handleUpdateUser(data) {
    api.updateUserInfo(data) // ← CORREGIDO
      .then((newData) => {
        setCurrentUser(newData);
      })
      .catch(console.log);
  }

  if (!currentUser) {
    return null; // evita render mientras carga
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser, handleUpdateUser }}>
      <div className="page">
        <Header />
        <Main />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;