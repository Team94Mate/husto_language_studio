import { useEffect, useState } from 'react';
import { ToggleButton } from '../../ToggleButton/ToggleButton';
import './Teachers.scss';
import classNames from 'classnames';
import { getTeachers } from '../../../api/api';
import { useAnimationEffect } from '../../../hooks/useAnimationEffect';
import { TeacherProp } from '../../../types/Teachers';
import { useSwipe } from '../../../utils/useSwipe';

export const Teachers = () => {
  const [teachers, setTeachers] = useState<TeacherProp[]>([]);

  const sortedTeachers = teachers.sort((a, b) => a.id - b.id);

  const {
    currentSlideIndex: currentTeacherIndex,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    setCurrentSlideIndex: setCurrentTeacherIndex,
  } = useSwipe({ slideCount: teachers.length });

  useEffect(() => {
    getTeachers().then(response => {
      setTeachers(response);
    });
  }, []);

  useAnimationEffect(sortedTeachers);

  return (
    <div className="teachers" id="teachers">
      <div className="teachers__container">
        <h1 className="teachers__title  animation left">
          Викладачі, які допомагають досягати результатів
        </h1>

        <div className="teachers__phar-box">
          <img
            className="teachers__img  animation left"
            src="images/hash(1).svg"
            alt="hash"
          />
          <p className="teachers__par  animation right">
            З нашими викладачами ви навчитесь англійської під керівництвом
            справжніх професіоналів. Досвід і професійний підхід забезпечують
            якість навчання та допоможуть досягти ваших мовних цілей
          </p>
        </div>

        <div
          className="teachers__cards"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {sortedTeachers.map((teacher, index) => (
            <div
              className={classNames(
                `teachers__card  teachers__card--${teacher.id} animation`,
                {
                  'teachers__card--active': currentTeacherIndex === index,
                  'teachers__card--inactive': currentTeacherIndex !== index,
                  left: teacher.id === 1 || teacher.id === 4,
                  right: teacher.id === 3 || teacher.id === 5,
                  bottom: teacher.id === 2,
                },
              )}
              key={teacher.id}
            >
              <img
                className="teachers__card-img"
                alt="teachers photo"
                src={teacher.photo}
              />

              <div className="teachers__inform">
                <div className="teachers__name">{teacher.name}</div>
                <div className="teachers__role">{teacher.specialization}</div>
                <div className="teachers__exp">{`Досвід викладання ${teacher.experience_years} років`}</div>
                <div className="teachers__spec">{teacher.teacher_level}</div>

                {teacher.description_lines.map(comment => (
                  <div className="teachers__coment" key={teacher.id}>
                    {comment}
                  </div>
                ))}
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
          className="teachers__prise-title1
           teachers__prise-title animation left"
          id="types-of-learning"
        >
          Освіта — найкраща інвестиція у твоє майбутнє
        </h1>

        <div
          className="teachers__prise-title2
         teachers__prise-title animation right"
        >
          <img
            src="images/hash(1).svg"
            alt="hashtag"
            className="teachers__prise-hash"
          />

          <h1 className="teachers__prise-h1">
            Обирай пакет навчання та крокуй до своїх цілей впевнено!
          </h1>
        </div>

        <div className="teachers__prise-content animation right">
          <ToggleButton />
        </div>
      </div>
    </div>
  );
};
