/* eslint-disable max-len */
import './AboutSchool.scss';
import classNames from 'classnames';
import { useSwipe } from '../../../utils/useSwipe';

export const AboutSchool = () => {
  const {
    currentSlideIndex: cardSlideIndex,
    handleTouchStart: handleCardTouchStart,
    handleTouchMove: handleCardTouchMove,
    handleTouchEnd: handleCardTouchEnd,
    setCurrentSlideIndex: setCardSlideIndex,
  } = useSwipe({ slideCount: 5 });

  const {
    currentSlideIndex: hwSlideIndex,
    handleTouchStart: handleHwTouchStart,
    handleTouchMove: handleHwTouchMove,
    handleTouchEnd: handleHwTouchEnd,
    setCurrentSlideIndex: setHwSlideIndex,
  } = useSwipe({ slideCount: 4 });

  return (
    <div className="aboutSchool" id="aboutSchool">
      <div className="aboutSchool__backround">
        <div className="aboutSchool__container">
          <div className="aboutSchool__text animation left">
            <h1 className="aboutSchool__title">
              <span className="aboutSchool__title-span">HUSTO</span> забезпечує
              можливість майстерно опанувати англійську мову та досягти високих
              результатів
            </h1>

            <img
              className="aboutSchool__text-hash"
              src="images/Header-arrow2sdas(1).svg"
              alt="array"
            />

            <p className="aboutSchool__phar">
              Ми використовуємо інтерактивні платформи, щоб прокачати всі скіли
              Wordwall, Quizlet Baamboozle, Kahoot, Test English
            </p>

            <p className="aboutSchool__phar-mob">
              Ми використовуємо інтерактивні платформи, щоб прокачати всі скіли{' '}
              <br />
              Wordwall, Quizlet Baamboozle, Kahoot, Test English
            </p>
          </div>

          <div
            className="aboutSchool__cards"
            onTouchStart={handleCardTouchStart}
            onTouchMove={handleCardTouchMove}
            onTouchEnd={handleCardTouchEnd}
          >
            <div
              className={classNames(
                'aboutSchool__card aboutSchool__card--1 animation left',
                {
                  'aboutSchool__card--active': cardSlideIndex === 0,
                  'aboutSchool__card--inactive': cardSlideIndex !== 0,
                },
              )}
            >
              <img
                className="aboutSchool__card-img1"
                src="images/hash(1).svg"
              />
              <p className="aboutSchool__card-p">
                Усі викладачі{' '}
                <span className="aboutSchool__span aboutSchool__span--1">
                  HUSTO
                </span>
                <br />
                мають педагогічну освіту <br />
                та значний досвід викладання
              </p>
            </div>
            <div
              className={classNames(
                'aboutSchool__card aboutSchool__card--2 animation top',
                {
                  'aboutSchool__card--active': cardSlideIndex === 1,
                  'aboutSchool__card--inactive': cardSlideIndex !== 1,
                },
              )}
            >
              <p className="aboutSchool__card-p">
                Враховуємо унікальні <br />
                <span className="aboutSchool__span"> потреби </span> та {''}
                <span className="aboutSchool__span"> цілі</span> <br />
                кожного учня
              </p>
            </div>
            <div
              className={classNames(
                'aboutSchool__card aboutSchool__card--3 animation right',
                {
                  'aboutSchool__card--active': cardSlideIndex === 2,
                  'aboutSchool__card--inactive': cardSlideIndex !== 2,
                },
              )}
            >
              <div className="aboutSchool__card-imgBox">
                <img
                  src="images/black-arrow-2.svg"
                  alt="arrow"
                  className="aboutSchool__card-img3"
                />
              </div>

              <p className="aboutSchool__card-p">
                Працюємо з усіма рівнями{' '}
                <span className="aboutSchool__span aboutSchool__span-spec">
                  <span className="aboutSchool__span-beginner">Beginner</span>
                  <span className="aboutSchool__span-adv">Advanced</span>
                </span>
              </p>
            </div>
            <div
              className={classNames(
                'aboutSchool__card aboutSchool__card--4 animation left',
                {
                  'aboutSchool__card--active': cardSlideIndex === 3,
                  'aboutSchool__card--inactive': cardSlideIndex !== 3,
                },
              )}
            >
              <div className="aboutSchool__hidden">
                <div className="aboutSchool__card-type">
                  <img
                    className="aboutSchool__card-typeImg"
                    src="images/hash(1).svg"
                    alt="hashtag"
                  />
                  <span className="aboutSchool__card-typeSpan">HUSTO</span>
                  <img
                    className="aboutSchool__card-typeImg"
                    src="images/hash(1).svg"
                    alt="ashtag"
                  />
                  <span className="aboutSchool__card-typeSpan">HUSTO</span>
                  <img
                    className="aboutSchool__card-typeImg"
                    src="images/hash(1).svg"
                    alt="ashtag"
                  />
                  <span className="aboutSchool__card-typeSpan">HUSTO</span>
                  <img
                    className="aboutSchool__card-typeImg"
                    src="images/hash(1).svg"
                    alt="ashtag"
                  />
                  <span className="aboutSchool__card-typeSpan">HUSTO</span>
                  <img
                    className="aboutSchool__card-typeImg"
                    src="images/hash(1).svg"
                    alt="ashtag"
                  />
                  <span className="aboutSchool__card-typeSpan">HUSTO</span>
                  <img
                    className="aboutSchool__card-typeImg"
                    src="images/hash(1).svg"
                    alt="ashtag"
                  />
                  <span className="aboutSchool__card-typeSpan">HUSTO</span>
                  <img
                    className="aboutSchool__card-typeImg"
                    src="images/hash(1).svg"
                    alt="ashtag"
                  />
                  <span className="aboutSchool__card-typeSpan">HUSTO</span>
                </div>
                <div className="aboutSchool__card-type2">
                  <img
                    className="aboutSchool__card-typeImg"
                    src="images/hash(1).svg"
                    alt="hashtag"
                  />
                  <span className="aboutSchool__card-typeSpan">HUSTO</span>
                  <img
                    className="aboutSchool__card-typeImg"
                    src="images/hash(1).svg"
                    alt="ashtag"
                  />
                  <span className="aboutSchool__card-typeSpan">HUSTO</span>
                  <img
                    className="aboutSchool__card-typeImg"
                    src="images/hash(1).svg"
                    alt="ashtag"
                  />
                  <span className="aboutSchool__card-typeSpan">HUSTO</span>
                  <img
                    className="aboutSchool__card-typeImg"
                    src="images/hash(1).svg"
                    alt="ashtag"
                  />
                  <span className="aboutSchool__card-typeSpan">HUSTO</span>
                  <img
                    className="aboutSchool__card-typeImg"
                    src="images/hash(1).svg"
                    alt="ashtag"
                  />
                  <span className="aboutSchool__card-typeSpan">HUSTO</span>
                  <img
                    className="aboutSchool__card-typeImg"
                    src="images/hash(1).svg"
                    alt="ashtag"
                  />
                  <span className="aboutSchool__card-typeSpan">HUSTO</span>
                </div>
              </div>

              <p className="aboutSchool__card-p">
                Мотивуємо учнів <br />
                <span className="aboutSchool__span">
                  розкрити свій потенціал
                </span>
              </p>
            </div>
            <div
              className={classNames(
                'aboutSchool__card aboutSchool__card--5 animation right',
                {
                  'aboutSchool__card--active': cardSlideIndex === 4,
                  'aboutSchool__card--inactive': cardSlideIndex !== 4,
                },
              )}
            >
              <p className="aboutSchool__card-p">
                Персоналізовані програми <br /> для <br />
                <span className="aboutSchool__span">
                  максимального результату
                </span>
              </p>
            </div>
          </div>

          <div className="aboutSchool__dots">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className={classNames('aboutSchool__dot', {
                  'is-active': cardSlideIndex === index,
                })}
                onClick={() => setCardSlideIndex(index)}
              />
            ))}
          </div>

          <div className="aboutSchool__open-for">
            <div className="aboutSchool__block">
              <h1 className="aboutSchool__heading">
                Відкрий для себе <br /> нові можливості з
              </h1>
              <p className="aboutSchool__heading2">HUSTO</p>
            </div>
            <div
              className="aboutSchool__par-box  
              aboutSchool__par-box1 animation left"
            >
              <img className="aboutSchool__open-img" src="images/hash(1).svg" />

              <p className="aboutSchool__par aboutSchool__par--1">
                Впевнено спілкуватись <br /> англійською
              </p>
            </div>

            <div
              className="aboutSchool__par-box 
              aboutSchool__par-box2 animation left"
            >
              <img className="aboutSchool__open-img" src="images/hash(1).svg" />
              <p className="aboutSchool__par aboutSchool__par--2">
                Стати більш впевненою <br /> версією себе
              </p>
            </div>

            <div
              className="aboutSchool__par-box 
              aboutSchool__par-box3 animation left"
            >
              <img className="aboutSchool__open-img" src="images/hash(1).svg" />
              <p className="aboutSchool__par aboutSchool__par--3">
                Прокачаєш знання <br />
                з індивідуальним підходом <br />
                від компетентних викладачів
              </p>
            </div>

            <div
              className="aboutSchool__par-box
               aboutSchool__par-box4 animation right"
              id="for-who"
            >
              <img className="aboutSchool__open-img" src="images/hash(1).svg" />
              <p className="aboutSchool__par aboutSchool__par--4">
                Подорожувати <br /> без обмежень
              </p>
            </div>

            <div
              className="aboutSchool__par-box
               aboutSchool__par-box5 animation right"
            >
              <img className="aboutSchool__open-img" src="images/hash(1).svg" />
              <p className="aboutSchool__par aboutSchool__par--5">
                Отримати престижну <br /> роботу
              </p>
            </div>

            <div
              className="aboutSchool__par-box
               aboutSchool__par-box6 animation right"
            >
              <img className="aboutSchool__open-img" src="images/hash(1).svg" />
              <p className="aboutSchool__par aboutSchool__par--6">
                Дивитись улюблені <br />
                фільми та серіали <br />
                англійською без субтитрів
              </p>
            </div>
          </div>

          <div className="aboutSchool__how-works">
            <h1 className="aboutSchool__how-works-title animation left">
              Як це працює:
            </h1>
            <div
              className="aboutSchool__how-works-cards"
              onTouchStart={handleHwTouchStart}
              onTouchMove={handleHwTouchMove}
              onTouchEnd={handleHwTouchEnd}
            >
              <div
                className={classNames(
                  'aboutSchool__how-works-card  animation left',
                  {
                    'aboutSchool__how-works-card--active': hwSlideIndex === 0,
                    'aboutSchool__how-works-card--inactive': hwSlideIndex !== 0,
                  },
                )}
              >
                <p
                  className="aboutSchool__how-works-p 
              aboutSchool__how-works-card--1"
                >
                  Визначення рівня <br /> знань учня
                </p>
              </div>

              <div
                className={classNames(
                  'aboutSchool__how-works-card aboutSchool__how-works-card--2 animation right',
                  {
                    'aboutSchool__how-works-card--active': hwSlideIndex === 1,
                    'aboutSchool__how-works-card--inactive': hwSlideIndex !== 1,
                  },
                )}
              >
                <p className="aboutSchool__how-works-p">Вибір вчителя</p>
              </div>

              <div
                className={classNames(
                  'aboutSchool__how-works-card aboutSchool__how-works-card--3 animation left',
                  {
                    'aboutSchool__how-works-card--active': hwSlideIndex === 2,
                    'aboutSchool__how-works-card--inactive': hwSlideIndex !== 2,
                  },
                )}
              >
                <p className="aboutSchool__how-works-p">
                  {' '}
                  Проведення пробного <br /> заняття
                </p>
              </div>

              <div
                className={classNames(
                  'aboutSchool__how-works-card aboutSchool__how-works-card--4  animation right',
                  {
                    'aboutSchool__how-works-card--active': hwSlideIndex === 3,
                    'aboutSchool__how-works-card--inactive': hwSlideIndex !== 3,
                  },
                )}
              >
                <p className="aboutSchool__how-works-p">
                  Визначення <br /> персональної програми <br /> для навчання
                </p>
              </div>
            </div>

            <div className="aboutSchool__dots aboutSchool__dots--hw">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className={classNames('aboutSchool__dot', {
                    'is-active': hwSlideIndex === index,
                  })}
                  onClick={() => setHwSlideIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
