/* eslint-disable react/button-has-type */
import React, { useEffect, useLayoutEffect, useState } from "react";
import { getAuthCookies } from "../../utils/utility.js";
import { jwtDecode } from "jwt-decode";
import './Header.css';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';


function Header() {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const { accessToken } = getAuthCookies();
  const [userState, setUserState] = useState(null);

  const getUserData = (token) => {
    if (token) {
      const decoded = jwtDecode(token);
      const { user } = decoded;
      setUserState(user);
    }
  };

  useEffect(() => {
    getUserData(accessToken);
  }, []);

  const logout = async () => {
    const result = await axios.get(
      'http://localhost:3000/auth/logout',
      { withCredentials: true },
    );
    if (result.status === 200) {
      navigate('/login');
    }
  };

  return (
    <div className={'header'}>
      <div className="logo" onClick={()=>navigate('/homepage')}>Enjoy Socks</div>
      <nav className="header-nav">
        {/* { pathname === '/' && <button className="header-btn" onClick={() => navigate('/profile')}>Личный кабинет</button> } */}
        {/* { pathname === '/login' && <button className="header-btn" onClick={() => navigate('/createdesign')}>Создать носок</button> } */}
        { pathname === '/profile' && <button className="header-btn" onClick={logout}>Выйти из учётной записи</button> }
        {/* { pathname === '/profile' && <button className="header-btn" onClick={()=>navigate('/')}>Главная страница</button> }
        { pathname === '/login' && <button className="header-btn" onClick={()=>navigate('/')}>Главная страница</button> } */}
        {/* { pathname === '/registration' && <button className="header-btn" onClick={()=>navigate('/')}>Главная страница</button> } */}
        { pathname === '/homepage' && <button className="header-btn" onClick={()=>navigate('/favorites')}>Избранное</button> }
        { pathname === '/homepage' && <button className="header-btn" onClick={()=>navigate('/basket')}>Корзина</button> }
        { pathname === '/homepage' && <button className="header-btn" onClick={()=>navigate('/createdesign')}>Конструктор</button> }
        { pathname === '/profile' && <button className="header-btn logout" onClick={logout}>Выйти из учётной записи</button> }
        { pathname === '/favorites' && <button className="header-btn" onClick={()=>navigate('/basket')}>Корзина</button> }
        { pathname === '/favorites' && <button className="header-btn" onClick={()=>navigate('/createdesign')}>Конструктор</button> }
        {/* { pathname === '/favorites' && <button className="header-btn" onClick={()=>navigate('/homepage')}>Главная</button> } */}
        { pathname === '/favorites' && <button className="header-btn" onClick={logout}>Выйти</button> }
        { pathname === '/basket' && <button className="header-btn" onClick={()=>navigate('/favorites')}>Избранное</button> }
        { pathname === '/basket' && <button className="header-btn" onClick={()=>navigate('/createdesign')}>Конструктор</button> }
        {/* { pathname === '/basket' && <button className="header-btn" onClick={()=>navigate('/homepage')}>Главная</button> } */}
        { pathname === '/basket' && <button className="header-btn" onClick={logout}>Выйти</button> }
        { pathname === '/createdesign' && <button className="header-btn" onClick={()=>navigate('/favorites')}>Избранное</button> }
        { pathname === '/createdesign' && <button className="header-btn" onClick={()=>navigate('/basket')}>Корзина</button> }
        {/* { pathname === '/createdesign' && <button className="header-btn" onClick={()=>navigate('/homepage')}>Главная</button> } */}
        { pathname === '/createdesign' && <button className="header-btn" onClick={logout}>Выйти</button> }
      </nav>
    </div>
  );
}

export default Header;