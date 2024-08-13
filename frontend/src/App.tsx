import React from 'react';
import './App.scss';
import { Header } from './Components/Header';
import { Footer } from './Components/Footer/Footer';
import { Outlet } from 'react-router-dom';

export const App: React.FC = () => {
  return (
    <div className="App">
      <header className="header">
        <Header />
      </header>

      <main className="main">
        <Outlet />
      </main>

      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
};
