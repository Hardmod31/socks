/* eslint-disable no-shadow */
/* eslint-disable linebreak-style */
/* eslint-disable react/button-has-type */
/* eslint-disable react/react-in-jsx-scope */
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import './LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();
  const [stateLogin, setStateLogin] = useState('');
  const [statePassword, setStatePassword] = useState('');
  const [error, setError] = useState('');

  const loginHandler = async () => {
    try {
      const result = await axios.post(
        'http://localhost:3000/auth/login',
        {
          email: stateLogin,
          password: statePassword,
        },
        { withCredentials: true }
      );

      if (result.status === 200) {
        navigate('/');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Неверный email или пароль');
      } else {
        setError('Произошла ошибка при авторизации');
      }
    }
  };

  return (
    <div className="logWindow">
      <h1 className="logTitle">Авторизация</h1>
      <div className="inputBlockLog">
        <input
          className="inputLog"
          value={stateLogin}
          onChange={(e) => setStateLogin(e.target.value)}
          placeholder="Введите ваш email"
        />
        <input
          className="inputLog"
          type="password"
          value={statePassword}
          onChange={(e) => setStatePassword(e.target.value)}
          placeholder="Введите пароль"
        />
      </div>
      {error && (
        <div className="errorMessage animated slideInDown">
          <span className="errorText">{error}</span>
        </div>
      )}
      <div className="buttonBlockLog">
        <button className="logBtn" onClick={loginHandler}>Выполнить вход</button>
        <button className="logBtn" onClick={() => navigate('/registration')}>К регистрации</button>
      </div>
    </div>
  );
}

export default LoginPage;
