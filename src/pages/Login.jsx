import React, { useState } from 'react';
import isEmail from 'email-format-check';
import { useHistory } from 'react-router';

import '../css/Login.css';

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
    <div className="container">
      <form className="login">
        <h1 className="login-title">Login</h1>
        <input
          type="email"
          placeholder="Digite seu email"
          className="input"
          data-testid="email-input"
          onChange={ (e) => setEmail(e.target.value) }
        />
        <input
          type="password"
          className="input"
          data-testid="password-input"
          placeholder="Digite sua senha"
          onChange={ (e) => setPassword(e.target.value) }
        />
        <button
          type="button"
          className="input-submit"
          data-testid="login-submit-btn"
          disabled={ verifyLogin() }
          onClick={ async () => {
            await saveIntoLocalStorage();
            history.push('/comidas');
          } }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
