import './Header.scss';
import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { StorageContext } from '../../storage/StorageContext';
import classNames from 'classnames';

export const Header = () => {
  const { showForm, setShowForm } = useContext(StorageContext);
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith('en') ? 'en' : 'uk';

  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  return (
    <>
      <div className="header__container">
        <div className="header__icon-box">
          <img
            className="header__image"
            src="images/Husto-photo-Header.svg"
            alt="Compony Name Logo"
          />
        </div>
        <nav className="header__nav">
          <a className="header__link" href="#homePage">
            {t('nav.home')}
          </a>
          <a className="header__link" href="#aboutSchool">
            {t('nav.about')}
          </a>
          <a className="header__link" href="#for-who">
            {t('nav.forWho')}
          </a>
          <a className="header__link" href="#teachers">
            {t('nav.teachers')}
          </a>
          <a className="header__link" href="#types-of-learning">
            {t('nav.learningTypes')}{' '}
          </a>
          <a className="header__link" href="#reviews">
            {t('nav.reviews')}
          </a>
        </nav>

        <div className="header__actions">
          <div className="header__lang">
            <button
              type="button"
              className={classNames('header__lang-btn', {
                'header__lang-btn--active': currentLang === 'uk',
              })}
              onClick={() => i18n.changeLanguage('uk')}
            >
              UA
            </button>
            <span className="header__lang-divider">|</span>
            <button
              type="button"
              className={classNames('header__lang-btn', {
                'header__lang-btn--active': currentLang === 'en',
              })}
              onClick={() => i18n.changeLanguage('en')}
            >
              EN
            </button>
          </div>

          <button
            className="header__button button"
            onClick={() => setShowForm(!showForm)}
          >
            {t('nav.enroll')}{' '}
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
      </div>
    </>
  );
};
