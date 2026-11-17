import { useContext, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './BurgerMenu.scss';
import classNames from 'classnames';
import { StorageContext } from '../../storage/StorageContext';

export const BurgerMenu = () => {
  const { setPageHeight } = useContext(StorageContext);
  const { showBurger, setBurger } = useContext(StorageContext);
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith('en') ? 'en' : 'uk';

  const burgerMenuRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={burgerMenuRef}
      className={classNames('burgerMenu', {
        'burgerMenu--turnOnBurger': showBurger,
      })}
    >
      <div className="burgerMenu__back">
        <div
          className="burgerMenu__back-box"
          onClick={() => {
            setBurger(false);
            setPageHeight(100);
          }}
        >
          <img
            className="burgerMenu__arrow"
            src="images/Chevron.svg"
            alt="arrow back"
          />
          <div className="burgerMenu__back-text">{t('nav.back')}</div>
        </div>

        <div className="burgerMenu__lang">
          <button
            type="button"
            className={classNames('burgerMenu__lang-btn', {
              'burgerMenu__lang-btn--active': currentLang === 'uk',
            })}
            onClick={() => i18n.changeLanguage('uk')}
          >
            UA
          </button>
          <span className="burgerMenu__lang-divider">|</span>
          <button
            type="button"
            className={classNames('burgerMenu__lang-btn', {
              'burgerMenu__lang-btn--active': currentLang === 'en',
            })}
            onClick={() => i18n.changeLanguage('en')}
          >
            EN
          </button>
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
          {t('nav.home')}
        </a>
        <a
          className="header__link burgerMenu__link"
          href="#aboutSchool"
          onClick={() => {
            setBurger(false);
          }}
        >
          {t('nav.about')}
        </a>
        <a
          className="header__link burgerMenu__link"
          href="#for-who"
          onClick={() => {
            setBurger(false);
          }}
        >
          {t('nav.forWho')}
        </a>
        <a
          className="header__link burgerMenu__link"
          href="#teachers"
          onClick={() => {
            setBurger(false);
          }}
        >
          {t('nav.teachers')}
        </a>
        <a
          className="header__link burgerMenu__link"
          href="#types-of-learning"
          onClick={() => {
            setBurger(false);
          }}
        >
          {t('nav.learningTypes')}{' '}
        </a>
        <a
          className="header__link burgerMenu__link"
          href="#reviews"
          onClick={() => {
            setBurger(false);
          }}
        >
          {t('nav.reviews')}
        </a>
      </nav>

      <div className="burgerMenu__indicator"></div>
    </div>
  );
};
