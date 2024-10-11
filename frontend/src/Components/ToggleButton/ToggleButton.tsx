import { useContext, useState } from 'react';
import './ToggleButton.scss';
import { StorageContext } from '../../storage/StorageContext';
import cn from 'classnames';
import classNames from 'classnames';

export const ToggleButton = () => {
  const [toggleButton, setToggleButton] = useState('uk');
  const { showForm, setShowForm } = useContext(StorageContext);
  const [card, setCard] = useState<number>(0);

  return (
    <div className="toggleButton">
      <div className="toggleButton__buttons">
        <button
          className={cn('toggleButton__uk', {
            'toggleButton__uk--active': toggleButton === 'uk',
          })}
          onClick={() => setToggleButton('uk')}
        >
          Український викладач
        </button>
        <button
          className={cn('toggleButton__en', {
            'toggleButton__en--active': toggleButton === 'en',
          })}
          onClick={() => setToggleButton('en')}
        >
          Англомовний викладач
        </button>
      </div>

      {toggleButton === 'en' ? (
        <div className="toggleButton__content">
          <div className="toggleButton__card ">
            <h1 className="toggleButton__card-title">SoloPro</h1>
            <h1 className="toggleButton__card-subtitle">Індивідуальний</h1>
            <div className="toggleButton__card-pbox">
              <img
                className="toggleButton__card-img"
                src="images/hash(1).svg"
                alt="hash"
              />
              <p className="toggleButton__card-p">Тривалість: 60 хвилин</p>
            </div>
            <div className="toggleButton__card-pbox">
              <img
                className="toggleButton__card-img"
                src="images/hash(1).svg"
                alt="hash"
              />
              <p className="toggleButton__card-p">Заняття: 2 рази на тиждень</p>
            </div>
            <div className="toggleButton__card-pbox">
              <img
                className="toggleButton__card-img"
                src="images/hash(1).svg"
                alt="hash"
              />
              <p className="toggleButton__card-p">
                Кількість занять: 8 на місяць
              </p>
            </div>

            <div className="toggleButton__card-price">
              $280<span className="toggleButton__card-span">/міс.</span>
            </div>
            <button
              className="toggleButton__button button"
              onClick={() => {
                setShowForm(!showForm);
                setCard(1);
              }}
            >
              Приєднатись
              <span className="toggleButton__button2">
                <img
                  className={classNames('toggleButton__button-img', {
                    'toggleButton__button-img--rotate': card === 1 && showForm,
                  })}
                  src="images/Vector(6).svg"
                />
              </span>
            </button>
            <div className="toggleButton__card-inf">
              Пробний урок 8$ <br /> (тривалість 30 хвилин)*
            </div>
          </div>

          <div className="toggleButton__card">
            <h1 className="toggleButton__card-title">SplitDual</h1>
            <h1 className="toggleButton__card-subtitle">Парний</h1>
            <div className="toggleButton__card-pbox">
              <img
                className="toggleButton__card-img"
                src="images/hash(1).svg"
                alt="hash"
              />
              <p className="toggleButton__card-p">Тривалість: 60 хвилин</p>
            </div>
            <div className="toggleButton__card-pbox">
              <img
                className="toggleButton__card-img"
                src="images/hash(1).svg"
                alt="hash"
              />
              <p className="toggleButton__card-p">Заняття: 2 рази на тиждень</p>
            </div>
            <div className="toggleButton__card-pbox">
              <img
                className="toggleButton__card-img"
                src="images/hash(1).svg"
                alt="hash"
              />
              <p className="toggleButton__card-p">
                Кількість занять: 8 на місяць
              </p>
            </div>

            <div className="toggleButton__card-price">
              $220<span className="toggleButton__card-span">/міс.</span>
            </div>
            <button
              className="toggleButton__button button"
              onClick={() => {
                setShowForm(!showForm);
                setCard(2);
              }}
            >
              Приєднатись
              <span className="toggleButton__button2">
                <img
                  className={classNames('toggleButton__button-img', {
                    'toggleButton__button-img--rotate': card === 2 && showForm,
                  })}
                  src="images/Vector(6).svg"
                />
              </span>
            </button>
            <div className="toggleButton__card-inf">
              Пробний урок 199 UAH <br /> (тривалість 30 хвилин)*
            </div>
          </div>

          <div className="toggleButton__card">
            <h1 className="toggleButton__card-title">TeamUp</h1>
            <h1 className="toggleButton__card-subtitle">Група до 4х осіб</h1>
            <div className="toggleButton__card-pbox">
              <img
                className="toggleButton__card-img"
                src="images/hash(1).svg"
                alt="hash"
              />
              <p className="toggleButton__card-p">Тривалість: 60 хвилин</p>
            </div>
            <div className="toggleButton__card-pbox">
              <img
                className="toggleButton__card-img"
                src="images/hash(1).svg"
                alt="hash"
              />
              <p className="toggleButton__card-p">Заняття: 2 рази на тиждень</p>
            </div>
            <div className="toggleButton__card-pbox">
              <img
                className="toggleButton__card-img"
                src="images/hash(1).svg"
                alt="hash"
              />
              <p className="toggleButton__card-p">
                Кількість занять: 8 на місяць
              </p>
            </div>

            <div className="toggleButton__card-price">
              $180<span className="toggleButton__card-span">/міс.</span>
            </div>
            <button
              className="toggleButton__button button"
              onClick={() => {
                setShowForm(!showForm);
                setCard(3);
              }}
            >
              Приєднатись
              <span className="toggleButton__button2">
                <img
                  className={classNames('toggleButton__button-img', {
                    'toggleButton__button-img--rotate': card === 3 && showForm,
                  })}
                  src="images/Vector(6).svg"
                />
              </span>
            </button>
            <div className="toggleButton__card-inf">
              Пробний урок 199 UAH <br /> (тривалість 30 хвилин)*
            </div>
          </div>
        </div>
      ) : (
        <div className="toggleButton__content">
          <div className="toggleButton__card">
            <h1 className="toggleButton__card-title">SoloPro </h1>
            <h1 className="toggleButton__card-subtitle">Індивідуальний</h1>
            <div className="toggleButton__card-pbox">
              <img
                className="toggleButton__card-img"
                src="images/hash(1).svg"
                alt="hash"
              />
              <p className="toggleButton__card-p">Тривалість: 60 хвилин</p>
            </div>
            <div className="toggleButton__card-pbox">
              <img
                className="toggleButton__card-img"
                src="images/hash(1).svg"
                alt="hash"
              />
              <p className="toggleButton__card-p">Заняття: 2 рази на тиждень</p>
            </div>
            <div className="toggleButton__card-pbox">
              <img
                className="toggleButton__card-img"
                src="images/hash(1).svg"
                alt="hash"
              />
              <p className="toggleButton__card-p">
                Кількість занять: 8 на місяць
              </p>
            </div>

            <div className="toggleButton__card-price">
              ₴4599<span className="toggleButton__card-span">/міс.</span>
            </div>
            <button
              className="toggleButton__button button"
              onClick={() => {
                setShowForm(!showForm);
                setCard(1);
              }}
            >
              Приєднатись
              <span className="toggleButton__button2">
                <img
                  className={classNames('toggleButton__button-img', {
                    'toggleButton__button-img--rotate': card === 1 && showForm,
                  })}
                  src="images/Vector(6).svg"
                />
              </span>
            </button>
            <div className="toggleButton__card-inf">
              Пробний урок 199 UAH <br /> (тривалість 30 хвилин)*
            </div>
          </div>

          <div className="toggleButton__card">
            <h1 className="toggleButton__card-title">SplitDual</h1>
            <h1 className="toggleButton__card-subtitle">Парний</h1>
            <div className="toggleButton__card-pbox">
              <img
                className="toggleButton__card-img"
                src="images/hash(1).svg"
                alt="hash"
              />
              <p className="toggleButton__card-p">Тривалість: 60 хвилин</p>
            </div>
            <div className="toggleButton__card-pbox">
              <img
                className="toggleButton__card-img"
                src="images/hash(1).svg"
                alt="hash"
              />
              <p className="toggleButton__card-p">Заняття: 2 рази на тиждень</p>
            </div>
            <div className="toggleButton__card-pbox">
              <img
                className="toggleButton__card-img"
                src="images/hash(1).svg"
                alt="hash"
              />
              <p className="toggleButton__card-p">
                Кількість занять: 8 на місяць
              </p>
            </div>

            <div className="toggleButton__card-price">
              ₴3799<span className="toggleButton__card-span">/міс.</span>
            </div>
            <button
              className="toggleButton__button button"
              onClick={() => {
                setShowForm(!showForm);
                setCard(2);
              }}
            >
              Приєднатись
              <span className="toggleButton__button2">
                <img
                  className={classNames('toggleButton__button-img', {
                    'toggleButton__button-img--rotate': card === 2 && showForm,
                  })}
                  src="images/Vector(6).svg"
                />
              </span>
            </button>
            <div className="toggleButton__card-inf">
              Пробний урок 199 UAH <br /> (тривалість 30 хвилин)*
            </div>
          </div>

          <div className="toggleButton__card">
            <h1 className="toggleButton__card-title">TeamUp</h1>
            <h1 className="toggleButton__card-subtitle">Група до 4х осіб</h1>
            <div className="toggleButton__card-pbox">
              <img
                className="toggleButton__card-img"
                src="images/hash(1).svg"
                alt="hash"
              />
              <p className="toggleButton__card-p">Тривалість: 60 хвилин</p>
            </div>
            <div className="toggleButton__card-pbox">
              <img
                className="toggleButton__card-img"
                src="images/hash(1).svg"
                alt="hash"
              />
              <p className="toggleButton__card-p">Заняття: 2 рази на тиждень</p>
            </div>
            <div className="toggleButton__card-pbox">
              <img
                className="toggleButton__card-img"
                src="images/hash(1).svg"
                alt="hash"
              />
              <p className="toggleButton__card-p">
                Кількість занять: 8 на місяць
              </p>
            </div>

            <div className="toggleButton__card-price">
              ₴2999<span className="toggleButton__card-span">/міс.</span>
            </div>
            <button
              className="toggleButton__button button"
              onClick={() => {
                setShowForm(!showForm);
                setCard(3);
              }}
            >
              Приєднатись
              <span className="toggleButton__button2">
                <img
                  className={classNames('toggleButton__button-img', {
                    'toggleButton__button-img--rotate': card === 3 && showForm,
                  })}
                  src="images/Vector(6).svg"
                />
              </span>
            </button>
            <div className="toggleButton__card-inf">
              Пробний урок 199 UAH <br /> (тривалість 30 хвилин)*
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
