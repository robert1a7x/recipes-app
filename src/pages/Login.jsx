import React from 'react';

export default function Login() {
  return (
    <form>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Digite seu email"
        data-testid="email-input"
      />
      <input
        type="password"
        data-testid="password-input"
        placeholder="Digite sua senha"
      />
      <button
        type="button"
        data-testid="login-submit-btn"
      >
        Entrar
      </button>
    </form>
  );
}
