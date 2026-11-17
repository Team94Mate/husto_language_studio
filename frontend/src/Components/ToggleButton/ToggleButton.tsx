import { useContext, useEffect, useState } from 'react';
import './ToggleButton.scss';
import { StorageContext } from '../../storage/StorageContext';
import cn from 'classnames';
import classNames from 'classnames';
import { getCourses } from '../../api/api';
import { useSwipe } from '../../utils/useSwipe';
import { useTranslation } from 'react-i18next';
import { localizeCourse } from '../../i18n/dynamicTranslations';

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
  const { t, i18n } = useTranslation();
  const [toggleButton, setToggleButton] = useState('uk');
  const { showForm, setShowForm } = useContext(StorageContext);
  const [card, setCard] = useState<number>(0);
  const [curses, setCurses] = useState<CursProp[]>([]);
  const newestCourse = curses.reduce<CursProp | undefined>(
    (newest, course) => (!newest || course.id > newest.id ? course : newest),
    undefined,
  );
  const existingCourses = curses.filter(
    course => course.id !== newestCourse?.id,
  );
  const sortedCourses = [...existingCourses].sort((a, b) => a.price - b.price);
  const mid = Math.floor(sortedCourses.length / 2);
  const enCourses = sortedCourses
    .slice(0, mid)
    .sort((a, b) => b.price - a.price);
  const uaCourses = [
    ...(newestCourse ? [newestCourse] : []),
    ...sortedCourses.slice(mid).sort((a, b) => b.price - a.price),
  ];
  const activeCourseCount =
    toggleButton === 'en' ? enCourses.length : uaCourses.length;

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

  const {
    currentSlideIndex,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    setCurrentSlideIndex,
  } = useSwipe({ slideCount: activeCourseCount });

  return (
    <div className="toggleButton">
      <div className="toggleButton__buttons">
        <button
          data-label={t('courses.ukTeacherTab')}
          className={cn('toggleButton__uk', {
            'toggleButton__uk--active': toggleButton === 'uk',
          })}
          onClick={() => {
            setToggleButton('uk');
            setCurrentSlideIndex(0);
          }}
        >
          {t('courses.ukTeacherTab')}
        </button>
        <button
          data-label={t('courses.enTeacherTab')}
          className={cn('toggleButton__en', {
            'toggleButton__en--active': toggleButton === 'en',
          })}
          onClick={() => {
            setToggleButton('en');
            setCurrentSlideIndex(0);
          }}
        >
          {t('courses.enTeacherTab')}
        </button>
      </div>

      {toggleButton === 'en' ? (
        <div
          className="toggleButton__content"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {enCourses.map((rawCourse, index) => {
            const cours = localizeCourse(rawCourse, i18n.language);

            return (
              <div
                className={classNames('toggleButton__card', {
                  'teachers__card--active': currentSlideIndex === index,
                  'teachers__card--inactive': currentSlideIndex !== index,
                })}
                key={cours.id ?? cours.price}
              >
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
                    {t('courses.duration')}: {convTime(cours.lesson_duration)}{' '}
                    {t('courses.minutes')}
                  </p>
                </div>
                <div className="toggleButton__card-pbox">
                  <img
                    className="toggleButton__card-img"
                    src="images/hash(1).svg"
                    alt="hash"
                  />
                  <p className="toggleButton__card-p">
                    {t('courses.classes')}: {cours.classes}
                  </p>
                </div>
                <div className="toggleButton__card-pbox">
                  <img
                    className="toggleButton__card-img"
                    src="images/hash(1).svg"
                    alt="hash"
                  />
                  <p className="toggleButton__card-p">
                    {t('courses.numberOfClasses')}: {cours.number_of_classes}
                  </p>
                </div>

                <div className="toggleButton__card-price">
                  ${convPrice(cours.price)}
                  <span className="toggleButton__card-span">
                    {t('courses.perMonth')}
                  </span>
                </div>
                <button
                  className="toggleButton__button button"
                  onClick={() => {
                    setShowForm(!showForm);
                    setCard(1);
                  }}
                >
                  {t('courses.join')}
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
            );
          })}
        </div>
      ) : (
        <div
          className="toggleButton__content"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {uaCourses.map((rawCourse, index) => {
            const course = localizeCourse(rawCourse, i18n.language);

            return (
              <div
                className={classNames('toggleButton__card', {
                  'teachers__card--active': currentSlideIndex === index,
                  'teachers__card--inactive': currentSlideIndex !== index,
                })}
                key={course.id ?? course.price}
              >
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
                    {t('courses.duration')}: {convTime(course.lesson_duration)}{' '}
                    {t('courses.minutes')}
                  </p>
                </div>
                <div className="toggleButton__card-pbox">
                  <img
                    className="toggleButton__card-img"
                    src="images/hash(1).svg"
                    alt="hash"
                  />
                  <p className="toggleButton__card-p">
                    {t('courses.classes')}: {course.classes}
                  </p>
                </div>
                <div className="toggleButton__card-pbox">
                  <img
                    className="toggleButton__card-img"
                    src="images/hash(1).svg"
                    alt="hash"
                  />
                  <p className="toggleButton__card-p">
                    {t('courses.numberOfClasses')}: {course.number_of_classes}
                  </p>
                </div>

                <div className="toggleButton__card-price">
                  {rawCourse === newestCourse ? '$' : '₴'}
                  {convPrice(course.price)}
                  <span className="toggleButton__card-span">
                    {rawCourse === newestCourse
                      ? t('courses.perCourse')
                      : t('courses.perMonth')}
                  </span>
                </div>
                <button
                  className="toggleButton__button button"
                  onClick={() => {
                    setShowForm(!showForm);
                    setCard(1);
                  }}
                >
                  {t('courses.join')}
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
                <div className="toggleButton__card-inf">
                  {course.trial_info}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="toggleButton__dots">
        {[...Array(activeCourseCount)].map((_, index) => (
          <div
            key={index}
            className={classNames('toggleButton__dot', {
              'is-active': currentSlideIndex === index,
            })}
            onClick={() => setCurrentSlideIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};
