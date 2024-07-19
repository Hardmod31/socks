import React, { useEffect, useState, useRef } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { getAuthCookies } from '../../utils/utility';
import Sock from '../../components/Sock/Sock';
import './Basket.css';

export default function Basket() {
  const { accessToken } = getAuthCookies();

  const [presentSock, setPresentSock] = useState([]);
  const [showImage, setShowImage] = useState(false);
  const audioRef = useRef(null);

  const getAllSocks = () => {
    const decoded = jwtDecode(accessToken);
    const { user } = decoded;
    axios.get(
      `http://localhost:3000/api/all/basket`,
      { 
        params: { userId: user.id },
        withCredentials: true
      },
    )
    .then((data) => {
      const newData = data.data.baskets.map((elem) => {
        return {
          id: elem.id,
          img: elem.Sock.img,
          pattern: elem.Sock.pattern,
          color: elem.Sock.color,
          price: elem.Sock.price,
          quantity: elem.Sock.quantity,
        }
      })
      setPresentSock(newData)
    })
  }

  useEffect(() => {
    getAllSocks();
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      audioRef.current.play();
      setShowImage(true);
    }, 20000);

    return () => clearTimeout(timer);
  }, []);

  const openLink = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div>
      <div className="homeSock">
        <Sock presentSock={presentSock} setPresentSock={setPresentSock} />
      </div>
      <div className='images'>
        {showImage && (
          <div className='images1' onClick={() => openLink('https://elbrus-clicker.web.app/')}>
            <img className='images1' src="../../../public/msg.png" alt="fskn" />
          </div>
        )}
        {showImage && (
          <div className='images2' onClick={() => openLink('https://t.me/elbrus_clicker_bot')}>
            <img className='images2' src="../../../public/telegram.png" alt="fskn" />
          </div>
        )}
        <audio ref={audioRef} src="../../../public/bond.mp3" preload="auto"></audio>
      </div>
    </div>
  );
};