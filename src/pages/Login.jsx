import React, { useState } from 'react';
import isEmail from 'email-format-check';
import { useHistory } from 'react-router';
import { FaUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';

import '../style/Login.css';

export default function Login() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const history = useHistory();

  function verifyLogin() {
    const MIN_LENGTH = 6;
    return !(password.length > MIN_LENGTH && isEmail(email));
  }

  async function saveIntoLocalStorage() {
    await localStorage.setItem('mealsToken', 1);
    await localStorage.setItem('cocktailsToken', 1);
    await localStorage.setItem('user', JSON.stringify({ email }));
  }

  return (
    <form className="container-login-form">
      <div className="card-login">
        <h1>Login</h1>
        <div className="input-group">
          <input
            className="input-button"
            type="email"
            placeholder="Digite seu email"
            data-testid="email-input"
            onChange={ (e) => setEmail(e.target.value) }
          />
          <FaUser />
        </div>
        <div className="input-group">
          <input
            className="input-button"
            type="password"
            data-testid="password-input"
            placeholder="Digite sua senha"
            onChange={ (e) => setPassword(e.target.value) }
          />
          <RiLockPasswordFill />
        </div>
        <button
          className="input-button"
          type="button"
          data-testid="login-submit-btn"
          disabled={ verifyLogin() }
          onClick={ async () => {
            await saveIntoLocalStorage();
            history.push('/comidas');
          } }
        >
          Entrar
        </button>
      </div>
    </form>
  );
}
