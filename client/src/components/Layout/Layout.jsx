import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import { getAuthCookies } from '../../utils/utility';
import './Layout.css';

function Layout() {
  const { accessToken } = getAuthCookies();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  }, [accessToken]);

  return (
    <div className="layoutStyled">
      <Header />
      <div className="wrapper">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
