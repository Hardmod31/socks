/* eslint-disable react/button-has-type */
import React, { useEffect, useLayoutEffect, useState } from "react";
import { getAuthCookies } from "../../utils/utility.js";
import { jwtDecode } from "jwt-decode";
import './Header.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';


function Header() {
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
      <div className="logo">Носки, носочки</div>
      <nav className="header-nav">
        { pathname === '/' && <button className="header-btn" onClick={() => navigate('/profile')}>Личный кабинет</button> }
        { pathname === '/login' && <button className="header-btn" onClick={() => navigate('/createdesign')}>Создать носок</button> }
        { pathname === '/profile' && <button className="header-btn" onClick={logout}>Выйти из учётной записи</button> }
        { pathname === '/profile' && <button className="header-btn" onClick={()=>navigate('/')}>Главная страница</button> }
        { pathname === '/login' && <button className="header-btn" onClick={()=>navigate('/')}>Главная страница</button> }
        { pathname === '/registration' && <button className="header-btn" onClick={()=>navigate('/')}>Главная страница</button> }
        { pathname === '/homepage' && <button className="header-btn" onClick={()=>navigate('/favorites')}>избранное</button> }
        { pathname === '/homepage' && <button className="header-btn" onClick={()=>navigate('/basket')}>корзина</button> }
        { pathname === '/homepage' && <button className="header-btn" onClick={()=>navigate('/createdesign')}>конструктор</button> }
        { pathname === '/favorites' && <button className="header-btn" onClick={()=>navigate('/basket')}>корзина</button> }
        { pathname === '/favorites' && <button className="header-btn" onClick={()=>navigate('/createdesign')}>конструктор</button> }
        { pathname === '/favorites' && <button className="header-btn" onClick={()=>navigate('/homepage')}>главная</button> }
        { pathname === '/basket' && <button className="header-btn" onClick={()=>navigate('/favorites')}>избранное</button> }
        { pathname === '/basket' && <button className="header-btn" onClick={()=>navigate('/createdesign')}>конструктор</button> }
        { pathname === '/basket' && <button className="header-btn" onClick={()=>navigate('/homepage')}>главная</button> }
        { pathname === '/createdesign' && <button className="header-btn" onClick={()=>navigate('/favorites')}>избранное</button> }
        { pathname === '/createdesign' && <button className="header-btn" onClick={()=>navigate('/basket')}>корзина</button> }
        { pathname === '/createdesign' && <button className="header-btn" onClick={()=>navigate('/homepage')}>главная</button> }
      </nav>
    </div>
  );
}

export default Header;