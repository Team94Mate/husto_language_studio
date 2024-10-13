import '../Footer/Footer.scss';

export const Footer = () => {
  return (
    <div className="footer__container">
      <h1 className="footer__title">
        Навчайся з нами <br /> відкриваючи нові горизонти
      </h1>

      <div className="footer__email">
        <span className="footer__span">Email: </span>
        husto.language.studio@gmail.com
      </div>

      <div className="footer__midia">
        <h1 className="footer__midia-title">Соціальні мережі:</h1>
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
            <h3 className="footer__p"> Fecebook</h3>
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
        </div>
      </div>

      <nav className="footer__nav">
        <h3 className="footer__navlink-h">Навігація</h3>
        <a className="footer__navlink" href="#homePage">
          Головна
        </a>
        <a className="footer__navlink" href="#aboutSchool">
          Про нас
        </a>
        <a className="footer__navlink" href="#for-who">
          Для кого
        </a>
        <a className="footer__navlink" href="#teachers">
          Вчителі
        </a>
        <a className="footer__navlink" href="#types-of-learning">
          Види навчання{' '}
        </a>
        <a className="footer__navlink" href="#reviews">
          Відгуки
        </a>
      </nav>
    </div>
  );
};
