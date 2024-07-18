import React from 'react';
import './HomePage.css';
// import карточки с носками

function HomePage() {
  return (
    <div className="homepage">
      <main className="main">
        <div className="welcomeBanner">
          <p className="welcomeText">Самое время быть уникальным! Смоделируй свою любимую пару носков!</p>
          <a href="/sock-generator" className="sockGeneratorLink">Генератор носков</a>
        </div>
        <div className="sockMenu">
          <div className="sockContainer">
            {/* карточки с носками*/}
          </div>
        </div>
      </main>
      <footer className="footer">
        <div className="footerContent">
          <p>г. Москва, Шоссе Энтузиастов 12 ст2</p>
          <p>info@enjoysocks.ru</p>
          <p>+7 999 666 36 36</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
