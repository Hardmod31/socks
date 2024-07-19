import { useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { getAuthCookies } from '../../utils/utility';
import axiosInstance from "../../axiosInstance";
import Sock from "../../components/Sock/Sock";
import './Favorites.css';


export default function Favorites() {
  const { accessToken } = getAuthCookies();
  const [presentSock, setPresentSock ] = useState([]);

  const getFavorites = () => {
    const decoded = jwtDecode(accessToken);
    const { user } = decoded;
    axios.get(
      `http://localhost:3000/api/allFavorites`,
      { params: { userId: user.id },
       withCredentials: true 
      },
    )
    .then((data) => {
      const newData = data.data.sox.map((elem) => {
        return {
          id: elem.id,
          img: elem.Sock.img,
          pattern: elem.Sock.pattern,
          color: elem.Sock.color,
          price: elem.Sock.price,
          quantity: elem.Sock.quantity,
        }
      })
      setPresentSock(newData);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    getFavorites();
  }, [])

  return (
    <div>  
          <Sock
            presentSock={presentSock}
            setPresentSock={setPresentSock}
          />
    </div>
  );
}
