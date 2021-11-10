import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Profile() {
  return (
    <div>
      <Header title="Perfil" />
      <h1>Perfil</h1>
      <h2 data-testid="profile-email">
        { JSON.parse(localStorage.getItem('user')).email }
      </h2>
      <Link to="">
        <button type="button" data-testid="profile-done-btn">
          
        </button>
      </Link>
      <Link to="">
        <button type="button" data-testid="profile-done-btn">
          
        </button>
      </Link>
      <Footer />
    </div>
  );
}
