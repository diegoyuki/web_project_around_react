import React from "react";
import './index.css';
import Header from './components/header/header.jsx';
import Main from './components/main/main.jsx';
import Footer from './components/footer/footer.jsx';

function App() {
  return (
    <div className="page__content">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
