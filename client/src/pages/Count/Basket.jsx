import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { getAuthCookies } from '../../utils/utility';
import Sock from '../../components/Sock/Sock';

export default function Basket() {
  const { refreshToken } = getAuthCookies();

  const [presentSock, setPresentSock] = useState([]);

  const getAllSocks = () => {
    const decoded = jwtDecode(refreshToken);
    const { user } = decoded;
    axios.get(
      `http://localhost:3000/api/all/basket`,
      { 
        params: { userId: userId },
        withCredentials: true
      },
    )
    .then((data) => {
      const newData = data.data.baskets.map((elem) => {
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
    <div>
      <div className="homeSock">
        <Sock presentSock={presentSock} setPresentSock={setPresentSock} />
      </div>
    </div>
  );
};
