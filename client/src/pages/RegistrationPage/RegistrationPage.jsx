/* eslint-disable comma-dangle */
/* eslint-disable no-shadow */
/* eslint-disable linebreak-style */
/* eslint-disable react/button-has-type */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RegistrationPage.css'; 

function RegistrationPage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const isEmailValid = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const registrationHandler = async () => {
    if (!isEmailValid(email)) {
      setError('Неверный формат email');
      return;
    }
    if (password.length < 8) {
      setError('Пароль должен быть не менее 8 символов');
      return;
    }
    setError('');
    try {
      const result = await axios.post(
        'http://localhost:3000/auth/registration',
        { username: userName, email, password },
        { withCredentials: true }
      );

      if (result.status === 200) {
        navigate('/homepage');
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setError('Такой email уже существует');
      } else {
        setError('Произошла ошибка при регистрации');
      }
    }
  };

  return (
    <div className="regWindow">
      <h1 className="regTitle">Регистрация</h1>
      <div className="inputBlockReg">
        <input className="regInput" placeholder="Ваше имя" value={userName} onChange={(e) => setUserName(e.target.value)} />
        <input className="regInput" placeholder="Ваш E-mail" value={email} type="email" onChange={(e) => setEmail(e.target.value)} />
        <input className="regInput" type="password" placeholder="Введите пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      {error && <div className="errorMessage animated slideInDown">{error}</div>}
      <div className="buttonBlockReg">
        <button className="regBtn" onClick={registrationHandler}>Зарегистрировать</button>
        <button className="regBtn" onClick={() => navigate('/login')}>К авторизации</button>
      </div>
    </div>
  );
}

export default RegistrationPage;
