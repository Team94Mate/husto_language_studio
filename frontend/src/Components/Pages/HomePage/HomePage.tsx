import { useContext, useEffect, useRef, useState } from 'react';
import './HomePage.scss';
import classNames from 'classnames';
import { StorageContext } from '../../../storage/StorageContext';
import { useAnimationEffect } from '../../../hooks/useAnimationEffect';

export const HomePage = () => {
  const [isClicked, setIsClicked] = useState<number[]>([]);
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const { setBurger, setPageHeight } = useContext(StorageContext);
  const previousHashRef = useRef(window.location.hash);

  const handleClick = () => {
    setBurger(true);
    setPageHeight(100);

    const page = document.querySelector('.burgerMenu') as HTMLElement;

    page.style.padding = '16px 16px 8px 16px';
    page.style.display = 'flex';
  };

  useEffect(() => {
    const handleHashChange = () => {
      const newHash = window.location.hash;

      if (previousHashRef.current !== newHash) {
        setIsClicked([]);
        setCurrentHash(newHash);
        previousHashRef.current = newHash;
      }
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [currentHash, setBurger]);

  useAnimationEffect();

  return (
    <div className="homePage" id="homePage">
      <button className="homePage__mob-button" onClick={handleClick}>
        <img className="homePage__mob-image" src="images/HeadericonMenu.svg" />
      </button>
      <div className="homePage__wrapper">
        <div className="homePage__container">
          <h1 className="homePage__title animation left">
            Твій успіх - наша мета
          </h1>
          <p className="homePage__from animation right">From</p>
          <img
            src="images/DodBeginner.png"
            alt="Small Dog"
            className="homePage__dog1 animation right"
          />

          <p className="homePage__beginner animation right">Beginner</p>
          <div className="homePage__box-to animation right">
            <img
              src="images/Header-small-arrow.svg"
              alt="Arrow"
              className="homePage__to"
            />
          </div>

          <p className="homePage__advanced animation right">Advanced</p>
          <h1 className="homePage__husto animation top">HUSTO</h1>
          <div className="homePage__hash-box animation left">
            <div className="homePage__hash" />
          </div>

          <img
            src="images/big-dog.png"
            alt="advenced dog"
            className="homePage__dog2 animation right"
          />
          <h1 className="homePage__h1 animation right">
            Мовна школа яка змінить тебе!
          </h1>
          <p className="homePage__p animation left">
            Індивідуальні, парні та групові онлайн курси <br />
            на інтерактивній платформі <br />
            з досвідченими викладачами <br />
          </p>

          <a
            className="homePage__button homePage__button--1 animation right"
            onClick={() => {
              setIsClicked(prev => [...prev, 1]);
            }}
            target="_blank"
            href={
              `${'https://www.canva.com/design/DAFtevtJOXM/'}` +
              `${'6IYP4BRYWjpF5rxkheWVew/edit'}`
            }
            rel="noreferrer"
          >
            <h3 className="homePage__button-text1"> Безкоштовний марафон</h3>
            <span className="homePage__button2 homePage__button2--phone">
              <img
                className={classNames('homePage__button-img', {
                  'homePage__button-img--clicked1': isClicked.includes(1),
                })}
                alt="buttin icon"
                src="images/Vector(6).svg"
              />
            </span>
          </a>

          <a
            className="homePage__button homePage__button--2 animation right"
            onClick={() => setIsClicked(prev => [...prev, 2])}
            target="_blank"
            href={
              `${'https://docs.google.com/forms/d/e/1FAIpQLSc'}` +
              `${'__p8783rA2XzmtrQQsdfGPB2I9CTCfFF_6gzSBdSzDDInVg/viewform'}`
            }
            rel="noreferrer"
          >
            <h3 className="homePage__button-text2">Безкоштовне тестування</h3>

            <span className="homePage__button2 homePage__button2--phone">
              <img
                className={classNames('homePage__button-img', {
                  'homePage__button-img--clicked2': isClicked.includes(2),
                })}
                src="images/Vector(6).svg"
                alt="buttin icon"
              />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};
