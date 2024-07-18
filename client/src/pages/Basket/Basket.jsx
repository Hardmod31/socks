import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { getAuthCookies } from '../../utils/utility';
import Sock from '../../components/Sock/Sock';
import './Basket.css'

export default function Basket() {
  const { accessToken } = getAuthCookies();

  const [presentSock, setPresentSock] = useState([]);

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

  return (
    <div>
      <div className="homeSock">
        <Sock presentSock={presentSock} setPresentSock={setPresentSock} />
      </div>
    </div>
  );
};