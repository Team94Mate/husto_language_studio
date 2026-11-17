import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import '../Footer/Footer.scss';
import { StorageContext } from '../../storage/StorageContext';

export const Footer = () => {
  const { t } = useTranslation();
  const { setLegalModal } = useContext(StorageContext);
  const WHATSAPP_URL = 'https://wa.me/380631699824';

  return (
    <div className="footer__container">
      <h1 className="footer__title">
        {t('footer.titleLine1')} <br /> {t('footer.titleLine2')}
      </h1>

      <div className="footer__email">
        <div>
          <span className="footer__span">Email: </span>
          husto.language.studio@gmail.com
        </div>

        <div className="footer__legal">
          <button
            type="button"
            className="footer__legal-link"
            onClick={() => setLegalModal('offer')}
          >
            {t('legal.offerTitle')}
          </button>
        </div>
      </div>

      <div className="footer__midia">
        <h1 className="footer__midia-title">{t('footer.socialsTitle')}</h1>
        <div className="footer__midia-list">
          <a
            className="footer__link"
            href="https://www.instagram.com/husto_language_studio/"
            target="_blank"
            rel="noreferrer"
          >
            <img className="footer__icon" src="images/Vector-footer2.svg" />
            <h3 className="footer__p">Instagram</h3>
          </a>
          <a
            className="footer__link"
            href="https://www.facebook.com/hustolanguagestudio"
            target="_blank"
            rel="noreferrer"
          >
            <img className="footer__icon" src="images/Vector-footer.svg" />
            <h3 className="footer__p"> Facebook</h3>
          </a>
          <a
            className="footer__link"
            href={
              `${'https://www.tiktok.com'}` +
              `${'/@husto.language_studio?_t=8pboAanPy7R'}`
            }
            target="_blank"
            rel="noreferrer"
          >
            <img className="footer__icon" src="images/Vector-footTik.svg" />
            <h3 className="footer__p">Tiktok</h3>
          </a>
         <a
            className="footer__link"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
          >
            <svg
              className="footer__icon"
              viewBox="10 10 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.04 10C14.58 10 10.13 14.45 10.13 19.91C10.13 21.66 10.59 23.36 11.45 24.86L10.05 30L15.3 28.62C16.75 29.41 18.38 29.83 20.04 29.83C25.5 29.83 29.95 25.38 29.95 19.92C29.95 17.27 28.92 14.78 27.05 12.91C25.18 11.03 22.69 10 20.04 10ZM20.05 11.67C22.25 11.67 24.31 12.53 25.87 14.09C27.42 15.65 28.28 17.72 28.28 19.92C28.28 24.46 24.58 28.15 20.04 28.15C18.56 28.15 17.11 27.76 15.85 27L15.55 26.83L12.43 27.65L13.26 24.61L13.06 24.29C12.24 22.97 11.8 21.47 11.8 19.91C11.81 15.37 15.5 11.67 20.05 11.67ZM16.53 15.33C16.37 15.33 16.1 15.39 15.87 15.64C15.65 15.89 15 16.5 15 17.71C15 18.93 15.89 20.1 16.01 20.27C16.14 20.44 17.76 22.94 20.25 24.01C22.34 24.91 22.76 24.73 23.22 24.69C23.68 24.65 24.69 24.09 24.9 23.51C25.1 22.93 25.1 22.43 25.04 22.33C24.97 22.22 24.81 22.16 24.56 22.04C24.31 21.91 23.09 21.31 22.87 21.23C22.64 21.15 22.48 21.11 22.31 21.36C22.15 21.61 21.67 22.16 21.53 22.33C21.38 22.49 21.24 22.51 20.99 22.39C20.74 22.26 19.94 22 18.99 21.15C18.25 20.49 17.75 19.67 17.61 19.42C17.46 19.17 17.59 19.04 17.72 18.92C17.83 18.81 17.97 18.62 18.09 18.48C18.22 18.33 18.26 18.23 18.34 18.06C18.43 17.9 18.38 17.75 18.32 17.63C18.26 17.5 17.76 16.28 17.55 15.78C17.36 15.33 17.16 15.34 17 15.33H16.53Z"
                fill="white"
              />
            </svg>
            <h3 className="footer__p">WhatsApp</h3>
          </a>
        </div>
      </div>

      <nav className="footer__nav">
        <h3 className="footer__navlink-h">{t('footer.navigationTitle')}</h3>
        <a className="footer__navlink" href="#homePage">
          {t('nav.home')}
        </a>
        <a className="footer__navlink" href="#aboutSchool">
          {t('nav.about')}
        </a>
        <a className="footer__navlink" href="#for-who">
          {t('nav.forWho')}
        </a>
        <a className="footer__navlink" href="#teachers">
          {t('nav.teachers')}
        </a>
        <a className="footer__navlink" href="#types-of-learning">
          {t('nav.learningTypes')}{' '}
        </a>
        <a className="footer__navlink" href="#reviews">
          {t('nav.reviews')}
        </a>
      </nav>
    </div>
  );
};