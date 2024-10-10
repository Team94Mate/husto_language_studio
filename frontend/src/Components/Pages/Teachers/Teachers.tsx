import { useContext, useRef, useState } from 'react';
import { ToggleButton } from '../../ToggleButton/ToggleButton';
import './Teachers.scss';
import classNames from 'classnames';
import { StorageContext } from '../../../storage/StorageContext';

export const Teachers = () => {
  const [currentTeacherIndex, setCurrentTeacherIndex] = useState(0);
  const touchStartRef = useRef(0);
  const touchEndRef = useRef(0);
  const { teachers } = useContext(StorageContext);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartRef.current - touchEndRef.current;
    const threshold = 50;

    if (distance > threshold) {
      setCurrentTeacherIndex(prevIndex =>
        prevIndex < teachers.length - 1 ? prevIndex + 1 : prevIndex,
      );
    } else if (distance < -threshold) {
      setCurrentTeacherIndex(prevIndex =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex,
      );
    }
  };

  return (
    <div className="teachers" id="teachers">
      <div className="teachers__container">
        <h1 className="teachers__title">
          Викладачі, які допомагають досягати результатів
        </h1>

        <div className="teachers__phar-box">
          <img className="teachers__img" src="images/hash(1).svg" alt="hash" />
          <p className="teachers__par">
            З нашими викладачами ви навчитесь англійської під
            <br />
            керівництвом справжніх професіоналів. Досвід і професійний
            <br />
            підхід забезпечують вам високу якість навчання та допоможуть
            <br /> досягти ваших мовних цілей
          </p>
        </div>

        <div
          className="teachers__cards"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {teachers.map((teacher, index) => (
            <div
              className={classNames(
                `teachers__card  teachers__card--${index}`,
                {
                  'teachers__card--active': currentTeacherIndex === index,
                  'teachers__card--inactive': currentTeacherIndex !== index,
                },
              )}
              key={teacher.name}
            >
              <img
                className="teachers__card-img"
                alt="teachers photo"
                src={teacher.img}
              />

              <div className="teachers__inform">
                <div className="teachers__name">{teacher.name}</div>
                <div className="teachers__role">{teacher.role}</div>
                <div className="teachers__exp">{`Досвід викладання ${teacher.exp}`}</div>
                <div className="teachers__spec">{teacher.spec}</div>

                {Array.isArray(teacher.comments) ? (
                  teacher.comments.map(comment => (
                    <div className="teachers__coment" key={comment}>
                      {comment}
                    </div>
                  ))
                ) : (
                  <div className="teachers__coment" key={teacher.name}>
                    {teacher.comments}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="teachers__dots">
          {teachers.map((_, index) => (
            <div
              key={index}
              className={classNames('teachers__dot', {
                'is-active': currentTeacherIndex === index,
              })}
              onClick={() => setCurrentTeacherIndex(index)}
            />
          ))}
        </div>
        <h1
          className="teachers__prise-title1 teachers__prise-title"
          id="types-of-learning"
        >
          Освіта — найкраща інвестиція у твоє майбутнє
        </h1>

        <div className="teachers__prise-title2 teachers__prise-title">
          <img
            src="images/hash(1).svg"
            alt="hashtag"
            className="teachers__prise-hash"
          />

          <h1 className="teachers__prise-h1">
            Обирай пакет навчання та крокуй до своїх цілей впевнено!
          </h1>
        </div>

        <div className="teachers__prise-content">
          <ToggleButton />
        </div>
      </div>
    </div>
  );
};
