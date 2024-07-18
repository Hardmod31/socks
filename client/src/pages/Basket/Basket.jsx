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
      const newData = data.data.baskets.map((basket) => {
        return {
          id: basket.Sock.id,
          img: basket.Sock.img,
          pattern: basket.Sock.pattern,
          color: basket.Sock.color,
          price: basket.Sock.price,
          quantity: basket.Sock.quantity,
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