import React from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import axiosInstance from '../../axiosInstance';
import { getAuthCookies } from '../../utils/utility';
import { jwtDecode } from 'jwt-decode';
import './SockPage.css'

export default function SockPage({user, socks, addToFavorites}) {
  const { accessToken } = getAuthCookies();
  const params = useParams();
  const [userState, setUserState] = useState({});
  const [sockInfo, setSockInfo] = useState({});

  const getUserData = (token) => {
    if (token) {
      const decoded = jwtDecode(token);
      const { user } = decoded;
      setUserState({ ...userState, id: user.id });
    }
  };

  const getSockInfo = () => {
    axios.get(`http://localhost:3000/api/one/sock/${params.id}`)
      .then((data) => {
        setSockInfo(data.data.item);
      });
  };

  useEffect(() => {
    getSockInfo();
    getUserData(accessToken);
  }, []);

  return (
    <div className='parentSock'>
     <div className='sockContainer'>
        <img className='oneSockImg' src={sockInfo.img} alt="" />
        <p className='descSock'>{sockInfo.pattern}</p>
        <p className='descSock'>{sockInfo.price}</p>
        <p className='descSock'>{sockInfo.quantity}</p>
        <p className='descSock'>{sockInfo.color}</p>
      </div>
    </div>
  );
}