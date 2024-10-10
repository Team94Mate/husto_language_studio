import './Header.scss';
import { useContext } from 'react';
import { StorageContext } from '../../storage/StorageContext';
import classNames from 'classnames';
import { scrollToElement } from '../../helpers/useScroolToElement';

export const Header = () => {
  const { showForm, setShowForm } = useContext(StorageContext);

  return (
    <>
      <div className="header__container">
        <div className="header__icon-box">
          <img
            className="header__image"
            src="images/Header.svg"
            alt="Compony Name Logo"
          />
        </div>
        <nav className="header__nav">
          <a
            className="header__link"
            href="#homePage"
            onClick={() => scrollToElement('homePage')}
          >
            Головна
          </a>
          <a
            className="header__link"
            href="#aboutSchool"
            onClick={() => scrollToElement('aboutSchool')}
          >
            Про нас
          </a>
          <a
            className="header__link"
            href="#for-who"
            onClick={() => scrollToElement('for-who')}
          >
            Для кого
          </a>
          <a
            className="header__link"
            href="#teachers"
            onClick={() => scrollToElement('teachers')}
          >
            Вчителі
          </a>
          <a
            className="header__link"
            href="#types-of-learning"
            onClick={() => scrollToElement('types-of-learning')}
          >
            Види навчання{' '}
          </a>
          <a
            className="header__link"
            href="#reviews"
            onClick={() => scrollToElement('reviews')}
          >
            Відгуки
          </a>
        </nav>

        <button
          className="header__button button"
          onClick={() => setShowForm(!showForm)}
        >
          Записатись{' '}
          <span className="header__button2">
            <img
              className={classNames('header__button-img', {
                'header__button-img--rotate': showForm,
              })}
              src="images/Vector(6).svg"
            />
          </span>
        </button>
      </div>
    </>
  );
};
