import { useContext, useEffect, useRef } from 'react';
import './BurgerMenu.scss';
import classNames from 'classnames';
import { StorageContext } from '../../storage/StorageContext';
import { scrollToElement } from '../../helpers/useScroolToElement';

export const BurgerMenu = () => {
  const { pageHeight, setPageHeight } = useContext(StorageContext);

  const burgerMenuRef = useRef<HTMLDivElement>(null);

  const { showBurger, setBurger } = useContext(StorageContext);

  const handleOnClick = () => {
    const page = document.querySelector('.burgerMenu') as HTMLElement;

    setPageHeight(0);
    page.style.padding = '0';
  };

  useEffect(() => {
    const page = document.querySelector('.burgerMenu') as HTMLElement;
    const resizeButton = document.querySelector('.burgerMenu__indicator');

    const handleTouchResize = (e: TouchEvent) => {
      setPageHeight((e.touches[0].clientY / window.innerHeight) * 100);

      if (e.touches[0].clientY === 0) {
        page.style.padding = '0';
        page.style.display = 'none';
        setPageHeight(100);
      }
    };

    page.style.height = `${pageHeight}vh`;

    const stopTouchResize = () => {
      window.removeEventListener('touchmove', handleTouchResize);
      window.removeEventListener('touchend', stopTouchResize);
    };

    const startTouchResize = () => {
      window.addEventListener('touchmove', handleTouchResize);
      window.addEventListener('touchend', stopTouchResize);
    };

    resizeButton?.addEventListener('touchstart', startTouchResize);

    return () => {
      window.removeEventListener('touchstart', startTouchResize);
      window.removeEventListener('touchmove', handleTouchResize);
      window.removeEventListener('touchend', stopTouchResize);
    };
  }, [pageHeight, setPageHeight]);

  useEffect(() => {
    if (burgerMenuRef.current) {
      burgerMenuRef.current.style.height = `${pageHeight}vh`;
    }
  }, [pageHeight, setBurger]);

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
          onClick={() => scrollToElement('homePage')}
        >
          Головна
        </a>
        <a
          className="header__link burgerMenu__link"
          href="#aboutSchool"
          onClick={() => scrollToElement('aboutSchool')}
        >
          Про нас
        </a>
        <a
          className="header__link burgerMenu__link"
          href="#for-who"
          onClick={() => scrollToElement('for-who')}
        >
          Для кого
        </a>
        <a
          className="header__link burgerMenu__link"
          href="#teachers"
          onClick={() => scrollToElement('teachers')}
        >
          Вчителі
        </a>
        <a
          className="header__link burgerMenu__link"
          href="#types-of-learning"
          onClick={() => scrollToElement('types-of-learning')}
        >
          Види навчання{' '}
        </a>
        <a
          className="header__link burgerMenu__link"
          href="#reviews"
          onClick={() => scrollToElement('reviews')}
        >
          Відгуки
        </a>
      </nav>

      <div className="burgerMenu__indicator" onClick={handleOnClick}></div>
    </div>
  );
};
