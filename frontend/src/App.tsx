import React from 'react';
import './App.scss';
import { ClientForm } from './Components/ClientForm/ClientForm';
import { StorageProvider } from './storage/StorageContext';
import { Header } from './Components/Header';
import { HomePage } from './Components/Pages/HomePage';
import { BurgerMenu } from './Components/BurgerMenu/BurgerMenu';

import { AboutSchool } from './Components/Pages/AboutSchool/AboutSchool';
import { Teachers } from './Components/Pages/Teachers/Teachers';
import { ReviewsPage } from './Components/Pages/ReviewsPage/ReviewsPage';
import { Midia } from './Components/Midia/Midia';
import { Footer } from './Components/Footer/Footer';
import { useScrollEffect } from './helpers/useScrollEffect';
import { useAnimationEffect } from './helpers/useAnimationEffect';

export const App: React.FC = () => {
  useScrollEffect();
  useAnimationEffect();

  return (
    <div className="App">
      <StorageProvider>
        <ClientForm />

        <BurgerMenu />

        <header className="header">
          <Header />
        </header>

        <main className="main">
          <Midia />
          <section id="homePage">
            <HomePage />
          </section>
          <section id="aboutSchool">
            <AboutSchool />
          </section>
          <section id="teachers">
            <Teachers />
          </section>
          <section id="reviews">
            <ReviewsPage />
          </section>
        </main>

        <footer className="footer">
          <Footer />
        </footer>
      </StorageProvider>
    </div>
  );
};
