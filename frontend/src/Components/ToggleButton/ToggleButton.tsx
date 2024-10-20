import { useContext, useEffect, useState } from 'react';
import './ToggleButton.scss';
import { StorageContext } from '../../storage/StorageContext';
import cn from 'classnames';
import classNames from 'classnames';
import { getCourses } from '../../api/api';

export interface CursProp {
  id: number;
  title: string;
  course_type: string;
  lesson_duration: string;
  classes: string;
  number_of_classes: string;
  price: number;
  trial_info: string;
}

export const ToggleButton = () => {
  const [toggleButton, setToggleButton] = useState('uk');
  const { showForm, setShowForm } = useContext(StorageContext);
  const [card, setCard] = useState<number>(0);
  const [curses, setCurses] = useState<CursProp[]>([]);
  const sortedCourses = curses.sort((a, b) => a.price - b.price);
  const mid = Math.floor(sortedCourses.length / 2);
  const enCourses = sortedCourses
    .slice(0, mid)
    .sort((a, b) => b.price - a.price);
  const uaCourses = sortedCourses.slice(mid).sort((a, b) => b.price - a.price);

  const convTime = (value: string) => {
    let convertedValue;

    if (typeof value === 'string') {
      const [hours, minutes] = value.split(':').map(Number);

      convertedValue = hours * 60 + minutes;
    }

    return convertedValue;
  };

  const convPrice = (price: number) => {
    return price * 1;
  };

  useEffect(() => {
    getCourses().then(setCurses);
  }, []);

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
          {enCourses.map(cours => (
            <div className="toggleButton__card" key={cours.price}>
              <h1 className="toggleButton__card-title">{cours.title}</h1>
              <h1 className="toggleButton__card-subtitle">
                {cours.course_type}
              </h1>
              <div className="toggleButton__card-pbox">
                <img
                  className="toggleButton__card-img"
                  src="images/hash(1).svg"
                  alt="hash"
                />
                <p className="toggleButton__card-p">
                  Тривалість: {convTime(cours.lesson_duration)} хвилин
                </p>
              </div>
              <div className="toggleButton__card-pbox">
                <img
                  className="toggleButton__card-img"
                  src="images/hash(1).svg"
                  alt="hash"
                />
                <p className="toggleButton__card-p">Заняття: {cours.classes}</p>
              </div>
              <div className="toggleButton__card-pbox">
                <img
                  className="toggleButton__card-img"
                  src="images/hash(1).svg"
                  alt="hash"
                />
                <p className="toggleButton__card-p">
                  Кількість занять: {cours.number_of_classes}
                </p>
              </div>

              <div className="toggleButton__card-price">
                ${convPrice(cours.price)}
                <span className="toggleButton__card-span">/міс.</span>
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
                      'toggleButton__button-img--rotate':
                        card === 1 && showForm,
                    })}
                    src="images/Vector(6).svg"
                  />
                </span>
              </button>
              <div className="toggleButton__card-inf">{cours.trial_info}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="toggleButton__content">
          {uaCourses.map(course => (
            <div className="toggleButton__card" key={course.price}>
              <h1 className="toggleButton__card-title">{course.title} </h1>
              <h1 className="toggleButton__card-subtitle">
                {course.course_type}
              </h1>
              <div className="toggleButton__card-pbox">
                <img
                  className="toggleButton__card-img"
                  src="images/hash(1).svg"
                  alt="hash"
                />
                <p className="toggleButton__card-p">
                  Тривалість: {convTime(course.lesson_duration)}
                </p>
              </div>
              <div className="toggleButton__card-pbox">
                <img
                  className="toggleButton__card-img"
                  src="images/hash(1).svg"
                  alt="hash"
                />
                <p className="toggleButton__card-p">
                  Заняття: {course.classes}
                </p>
              </div>
              <div className="toggleButton__card-pbox">
                <img
                  className="toggleButton__card-img"
                  src="images/hash(1).svg"
                  alt="hash"
                />
                <p className="toggleButton__card-p">
                  Кількість занять: {course.number_of_classes}
                </p>
              </div>

              <div className="toggleButton__card-price">
                ₴{convPrice(course.price)}
                <span className="toggleButton__card-span">/міс.</span>
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
                      'toggleButton__button-img--rotate':
                        card === 1 && showForm,
                    })}
                    src="images/Vector(6).svg"
                  />
                </span>
              </button>
              <div className="toggleButton__card-inf">{course.trial_info}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
