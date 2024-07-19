import React from 'react';
import './HomePage.css';
import { useEffect, useState } from 'react';
import axios from "axios";
import Sock from '../../components/Sock/Sock';
import { getAuthCookies } from '../../utils/utility';
// import карточки с носками

function HomePage() {
  const { accessToken } = getAuthCookies();
  
  const [presentSock, setPresentSock] = useState([]);

  const getAllSocks = () => {
    axios.get(
      `http://localhost:3000/api/all/socks`,
    )
    .then((data) => {
      const newData = data.data.socks.map((elem) => {
        return {
          id: elem.id,
          img: elem.img,
          pattern: elem.pattern,
          color: elem.color,
          price: elem.price,
          quantity: elem.quantity,
        }
      })
      setPresentSock(newData)
    })
  }

  useEffect(() => {
    getAllSocks();
  }, [])

  return (
    <div className="homepage">
      <main className="main">
        <div className="welcomeBanner">
          <p className="welcomeText">Самое время быть уникальным! Смоделируй свою любимую пару носков!</p>
          <a href="/createdesign" className="sockGeneratorLink">Генератор носков</a>
        </div>
        <div className="sockMenu">
          <div className="sockContainerHome">
        <Sock presentSock={presentSock} setPresentSock={setPresentSock}/>
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