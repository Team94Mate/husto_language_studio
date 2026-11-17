import { useEffect, useState } from 'react';
import { ToggleButton } from '../../ToggleButton/ToggleButton';
import './Teachers.scss';
import classNames from 'classnames';
import { getTeachers } from '../../../api/api';
import { useAnimationEffect } from '../../../hooks/useAnimationEffect';
import { TeacherProp } from '../../../types/Teachers';
import { useSwipe } from '../../../utils/useSwipe';
import { useTranslation } from 'react-i18next';
import { localizeTeacher } from '../../../i18n/dynamicTranslations';

export const Teachers = () => {
  const { t, i18n } = useTranslation();
  const [teachers, setTeachers] = useState<TeacherProp[]>([]);

  const sortedTeachers = [...teachers].sort((a, b) => a.id - b.id);
  const localizedTeachers = sortedTeachers.map(item =>
    localizeTeacher(item, i18n.language),
  );

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
          {t('teachers.title')}
        </h1>

        <div className="teachers__phar-box">
          <img
            className="teachers__img  animation left"
            src="images/hash(1).svg"
            alt="hash"
          />
          <p className="teachers__par  animation right">
            {t('teachers.description')}
          </p>
        </div>

        <div
          className="teachers__cards"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {localizedTeachers.map((teacher, index) => (
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
                <div className="teachers__exp">
                  {t('teachers.experience', { years: teacher.experience_years })}
                </div>
                <div className="teachers__spec">{teacher.teacher_level}</div>

                {teacher.description_lines.map((comment, idx) => (
                  <div className="teachers__coment" key={`${teacher.id}-${idx}`}>
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
          {t('teachers.priceTitle')}
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
            {t('teachers.priceSubtitle')}
          </h1>
        </div>

        <div className="teachers__prise-content animation right">
          <ToggleButton />
        </div>
      </div>
    </div>
  );
};