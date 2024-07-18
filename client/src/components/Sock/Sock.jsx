import React from 'react'
import { getAuthCookies } from "../../utils/utility.js";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import './Sock.css'

export default function Sock({presentSock, setPresentSock}) {
  const { refreshToken } = getAuthCookies();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const addSockToBasket = async (sockId) => {
    const decoded = jwtDecode(refreshToken);
    const { user } = decoded;
    console.log(presentSock);
    await axios.post(
      'http://localhost:3000/api/addsocks/basket',
      { 
        data: {
          sockId: sockId,
          userId: user.id,
        }
      }
    );
  };

  const handleUpdate = () => {
    const sockId = presentSock.find(elem => elem.id).id;
    navigate(`/updatesock/${sockId}`)
  }

  const deleteSock = async (sockId) => {
    const decoded = jwtDecode(refreshToken);
    const { user } = decoded;
    await axios.delete(
      'http://localhost:3000/api/deleteSock',
      { 
        params: {
          sockId: sockId,
          userId: user.id,
        },
      }
    );
    setPresentSock(presentSock.filter(elem => elem.id !== sockId));
  };

  const deleteFullSock = async () => {
    const decoded = jwtDecode(refreshToken);
    const { user } = decoded;
    const sock_id = presentSock.find(elem => elem.id).id;

    await axios.delete(
      'http://localhost:3000/api/destroyFullSock',
      { 
        params: {
          sockId: sock_id,
          user_id: user.id,
        },
      }
    );
  };

  return (
    <ul className='ulSock'>
      {presentSock.map((elem) => (
        <li 
          className='sockTable'
          style={{ listStyleType: "none" }}
          key={elem.id}
        >
          <div>
            <img 
              className='oneSockImg'
              style={{ width: "150px", height: "180px" }} 
              src={elem.img} 
              alt="Нет картинки" 
            />
            <br />
            <p className='oneSockP'>{elem.color}</p>
            <p className='oneSockP'>{elem.pattern}</p>
            <p className='oneSockP'>{elem.descryppricetion}</p>
            <p className='oneSockP'>{elem.quantity}</p>
            {pathname !== "/basket" && <button onClick={() => addSockToBasket(elem.id)}>в корзину</button>}
            {pathname === "/basket" && <button onClick={() => deleteSock(elem.id)}>delete</button>}
            {pathname !== "/basket" && <button onClick={handleUpdate}>Изменить</button>}
            {pathname !== "/basket" && <button onClick={deleteFullSock}>Удалить</button>}
            {pathname !== "/basket" && <button onClick={() => navigate(`/sock/${elem.id}`)}>Детали</button>}
          </div>
        </li>
      ))}
    </ul>
  );
}