import React from 'react'
import { getAuthCookies } from "../../utils/utility.js";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import axiosInstance from '../../axiosInstance.js';
import { useLocation, useNavigate } from 'react-router-dom';
import './Sock.css'
import SvgSock from '../SvgSock/SvgSock.jsx';

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

  const addToFavorites = async (sockId) => {
    const decoded = jwtDecode(accessToken);
    const { user } = decoded;
    try {
        await axios.post(
          'http://localhost:3000/api/addsocks/favorites',
          {
            sockId: sockId,
            userId: user.id,
          }
        );
     
    } catch (error) {
      console.error(error);
    }
  };

  const deleteFavorite = async (sockId) => {
    const decoded = jwtDecode(accessToken);
    const { user } = decoded;
     try {
          await axios.delete(
      'http://localhost:3000/api/delete/favorites',
      { 
          sockId: sockId,
          userId: user.id,
      }
    );
  } catch (error) {
   console.error(error);
  }
  };

  const updateSockQuantity = async (sockId, action) => {
    console.log(sockId, action);
    const decoded = jwtDecode(refreshToken);
    const { user } = decoded;
    const sockDto = await axios.put(
        'http://localhost:3000/api/updateSockQuantity',
        {
            data: {
                sockId: sockId,
                userId: user.id,
                action: action,
            }
        }
    );
    console.log(sockDto);
    
    const updatedSock = presentSock.find(elem => elem.id === sockId);
    
    if (updatedSock) {
        if (action === 'increment') {
            updatedSock.quantity += 1;
        } else if (action === 'decrement') {
            updatedSock.quantity -= 1;
            if (updatedSock.quantity < 0) {
                updatedSock.quantity = 0; 
            }
        }
        
        setPresentSock([...presentSock]);
    }
};

  const clearBasket = async () => {
    const decoded = jwtDecode(refreshToken);
    const { user } = decoded;
    await axios.delete(
      'http://localhost:3000/api/clearBasket',
      { 
        params: {
          userId: user.id,
        },
      }
    );
    setPresentSock([]);
  };

  return (
    <div>
    {pathname !== "/basket" &&  <ul className='ulSock'>
      {presentSock.map((elem) => (
        <li 
          className='sockTable'
          style={{ listStyleType: "none" }}
          key={elem.id}
        >
          <div>
          <SvgSock color={elem.color} pattern={elem.pattern} img={elem.img}></SvgSock>
            {/* <img 
              className='oneSockImg'
              style={{ width: "150px", height: "180px" }} 
              src={elem.img} 
              alt="Нет картинки" 
            />
            <br />
            <p className='oneSockP'>{elem.color}</p>
            <p className='oneSockP'>{elem.pattern}</p> */}
            <p className='oneSockP'>{elem.price}</p>
            {/* {pathname !== "/basket" && <button onClick={() => addSockToBasket(elem.id)}>в корзину</button>} */}
            {/* {pathname === "/favorites" && <button onClick={() => deleteFavorite(elem.id)}>Удалить</button>} */}
            {/* {pathname !== "/favorites" && <button onClick={() => addToFavorites(elem.id)}>В избранное</button>} */}
            {/* {pathname === "/basket" && <button onClick={handleUpdate}>Изменить</button>} */}
            {/* {pathname === "/basket" && <button onClick={() => navigate(`/sock/${elem.id}`)}>Детали</button>} */}
              {/* <div className='flexStroke'>
              {pathname === "/basket" && <button className='basketBtn' onClick={deleteFullSock}>Удалить</button>}
              {pathname === "/basket" && <button className='basketBtn1' onClick={() => updateSockQuantity(elem.id, 'increment')}>+</button> }
                <p className='oneSockP'>{elem.quantity}</p>
                {pathname === "/basket" && <button className='basketBtn1' onClick={() => updateSockQuantity(elem.id, 'decrement')}>-</button> }
              </div> */}
          </div>
        </li>
      ))}
    </ul> }
    {pathname === "/basket" &&  <ul className='ulSock1'>
      {presentSock.map((elem) => (
        <li 
          className='sockTable'
          style={{ listStyleType: "none" }}
          key={elem.id}
        >
          <div>
          <SvgSock color={elem.color} pattern={elem.pattern} img={elem.img}></SvgSock>
            <p className='oneSockP'>{elem.price}</p>
              <div className='flexStroke'>
              {pathname === "/basket" && <button className='basketBtn' onClick={() => deleteSock(elem.id)}>Удалить</button>}
              {pathname === "/basket" && <button className='basketBtn1' onClick={() => updateSockQuantity(elem.id, 'increment')}>+</button> }
                <p className='oneSockP'>{elem.quantity}</p>
                {pathname === "/basket" && <button className='basketBtn1' onClick={() => updateSockQuantity(elem.id, 'decrement')}>-</button> }
              </div>
          </div>
        </li>
      ))}
    </ul> }
    {pathname === "/favorites" &&  <ul className='ulSock1'>
      {presentSock.map((elem) => (
        <li 
          className='sockTable'
          style={{ listStyleType: "none" }}
          key={elem.id}
        >
          <div>
          <SvgSock color={elem.color} pattern={elem.pattern} img={elem.img}></SvgSock>
            <p className='oneSockP'>{elem.price}</p>
              <div className='flexStroke'>
              {pathname === "/basket" && <button className='basketBtn' onClick={deleteFullSock}>Удалить</button>}
              {pathname === "/basket" && <button className='basketBtn1' onClick={() => updateSockQuantity(elem.id, 'increment')}>+</button> }
                <p className='oneSockP'>{elem.quantity}</p>
                {pathname === "/basket" && <button className='basketBtn1' onClick={() => updateSockQuantity(elem.id, 'decrement')}>-</button> }
              </div>
          </div>
        </li>
      ))}
    </ul> }
    {pathname === "/basket" && <button className='oformit' onClick={clearBasket}>Оформить</button> }
   </div>
  );
}