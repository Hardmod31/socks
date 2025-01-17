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

  const addSockToBasket = async () => {
    const decoded = jwtDecode(refreshToken);
    const { user } = decoded;
    await axios.post(
      'http://localhost:3000/api/addsock/sock',
      { 
        data: {
          sockId: presentSock.find(elem => elem.id).id,
          userId: user.id,
        }
      }
    );
  };

  const handleUpdate = () => {
    const sock_id = presentSock.find(elem => elem.id).id;
    navigate(`/updateSock/${sock_id}`)
  }

  const deleteSock = async () => {
    const decoded = jwtDecode(refreshToken);
    const { user } = decoded;
    const sock_id = presentSock.find(elem => elem.id).id;
    await axios.delete(
      'http://localhost:3000/api/deleteSock',
      { 
        params: {
          sockId: sock_id,
          userId: user.id,
        },
      }
    );
    setPresentSock(presentSock.filter(elem => elem.id !== sock_id));
  };

  const deleteFullSock = async () => {
    const decoded = jwtDecode(refreshToken);
    const { user } = decoded;
    const sock_id = presentSock.find(elem => {
      return elem.id}).id;

    await axios.delete(
      'http://localhost:3000/api/destroyFullSock',
      { 
        params: {
          sockId: sock_id,
          userId: user.id,
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
              src={`https://lh6.googleusercontent.com/proxy/u5cZeD-DWmPLjjfoMmK5aiV0CUVms4bNrohuUV41v7EwSuogQkDxln3k2AWAEH36yIJRErj04TdTYdL_NkFeotN87BYSluVe`} 
              alt="Нет картинки" 
            />
            <br />
            <p className='oneSockP'>{elem.name}</p>
            <p className='oneSockP'>{elem.descryption}</p>
            {pathname !== "/basket" && <button onClick={addSockToBasket}>в корзину</button>}
            {pathname === "/basket" && <button onClick={deleteSock}>delete</button>}
            {pathname !== "/basket" && <button onClick={handleUpdate}>Изменить</button>}
            {pathname !== "/basket" && <button onClick={deleteFullSock}>Удалить</button>}
            {pathname !== "/basket" && <button onClick={() => navigate(`/sock/${elem.id}`)}>Детали</button>}
          </div>
        </li>
      ))}
    </ul>
  );
}