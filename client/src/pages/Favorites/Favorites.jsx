import { useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { getAuthCookies } from '../../utils/utility';
import axiosInstance from "../../axiosInstance";
import Sock from "../../components/Sock/Sock";


export default function Favorites() {
  const { accessToken } = getAuthCookies();
  const [presentSock, setPresentSock ] = useState([]);

  const getFavorites = () => {
    const decoded = jwtDecode(accessToken);
    const { user } = decoded;
    axios.get(
      `http://localhost:3000/api/all/favorites`,
      { params: { userId: user.id },
       withCredentials: true 
      },
    )
    .then((data) => {
      const newData = data.data.sox.map((elem) => {
        return {
          id: elem.id,
          img: elem.img,
          pattern: elem.pattern,
          color: elem.color,
          price: elem.price,
          quantity: elem.quantity,
        };
      });
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
       {presentSock.map((elem) => (
          <Sock
          key={elem.id}
            presentSock={presentSock}
            setPresentSock={setPresentSock}
          />
        ))}
    </div>
  );
}
