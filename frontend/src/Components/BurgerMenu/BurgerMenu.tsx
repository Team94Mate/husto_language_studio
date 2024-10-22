import { useContext, useRef } from 'react';
import './BurgerMenu.scss';
import classNames from 'classnames';
import { StorageContext } from '../../storage/StorageContext';

export const BurgerMenu = () => {
  const { setPageHeight } = useContext(StorageContext);
  const { showBurger, setBurger } = useContext(StorageContext);

  const burgerMenuRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={burgerMenuRef}
      className={classNames('burgerMenu', {
        'burgerMenu--turnOnBurger': showBurger,
      })}
    >
      <div className="burgerMenu__back">
        <img
          className="burgerMenu__arrow"
          src="images/Chevron.svg"
          alt="arrow back"
        />
        <div
          className="burgerMenu__back-text"
          onClick={() => {
            setBurger(false);
            setPageHeight(100);
          }}
        >
          Back
        </div>
      </div>

      <h1 className="burgerMenu__husto">HUSTO</h1>
      <nav className="header__nav burgerMenu__nav">
        <a
          className="header__link burgerMenu__link"
          href="#homePage"
          onClick={() => {
            setBurger(false);
          }}
        >
          Головна
        </a>
        <a
          className="header__link burgerMenu__link"
          href="#aboutSchool"
          onClick={() => {
            setBurger(false);
          }}
        >
          Про нас
        </a>
        <a
          className="header__link burgerMenu__link"
          href="#for-who"
          onClick={() => {
            setBurger(false);
          }}
        >
          Для кого
        </a>
        <a
          className="header__link burgerMenu__link"
          href="#teachers"
          onClick={() => {
            setBurger(false);
          }}
        >
          Вчителі
        </a>
        <a
          className="header__link burgerMenu__link"
          href="#types-of-learning"
          onClick={() => {
            setBurger(false);
          }}
        >
          Види навчання{' '}
        </a>
        <a
          className="header__link burgerMenu__link"
          href="#reviews"
          onClick={() => {
            setBurger(false);
          }}
        >
          Відгуки
        </a>
      </nav>

      <div className="burgerMenu__indicator"></div>
    </div>
  );
};
