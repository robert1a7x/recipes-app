import React, { useState } from 'react';

export default function Login() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  function verifyLogin() {
    const VALID_EMAIL = /\S+@\S+\.\S+/;
    const MIN_LENGTH = 6;
    return !(password.length > MIN_LENGTH && VALID_EMAIL.test(email));
  }

  return (
    <form>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Digite seu email"
        data-testid="email-input"
        onChange={ (e) => setEmail(e.target.value) }
      />
      <input
        type="password"
        data-testid="password-input"
        placeholder="Digite sua senha"
        onChange={ (e) => setPassword(e.target.value) }
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ verifyLogin() }
      >
        Entrar
      </button>
    </form>
  );
}
