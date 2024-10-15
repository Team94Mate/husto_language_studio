import { useContext, useRef, useState } from 'react';
import './ReviewsPage.scss';
import cn from 'classnames';
import classNames from 'classnames';
import { StorageContext } from '../../../storage/StorageContext';
import { ContactData } from '../../ClientForm/ClientForm';

export const ReviewsPage = () => {
  const [isClicked, setIsClicked] = useState<Record<number, boolean>>({});
  const [clickButton, setClickButton] = useState(false);
  const { reviewsData } = useContext(StorageContext);
  const [username, setUsername] = useState('');
  const [question, setQuestion] = useState('');

  const toggleQuestion = (index: number) => {
    setIsClicked(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const [currentReviewsIndex, setCurrentReviewsIndex] = useState(0);
  const touchStartRef = useRef(0);
  const touchEndRef = useRef(0);

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
      setCurrentReviewsIndex(prevIndex =>
        prevIndex < reviewsData.length - 1 ? prevIndex + 1 : prevIndex,
      );
    } else if (distance < -threshold) {
      setCurrentReviewsIndex(prevIndex =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex,
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const contactMessageData: ContactData = {
      username,
      question,
    };

    // addMessageData(contactMessageData)
    //   .then(response => {
    //     if (response) {
    //       console.log(response);
    //       setUsername('');
    //       setQuestion('');
    //     }
    //   })
    //   .catch(error => {
    //     throw error;
    //   });
    // });

    try {
      const response = await fetch(
        'http://localhost:8001/api/contact-messages/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(contactMessageData),
        },
      );

      if (response.ok) {
        setUsername('');
        setQuestion('');
      } else {
        // console.error('Failed to send message:', response.status);
        // console.log('Submitting:', contactMessageData);
      }
    } catch (error) {
      // console.error('Error while sending the request:', error);
      // console.log('Submitting:', contactMessageData);
    }
  };

  return (
    <div className="reviewsPage">
      <p className="reviewsPage__title1 animation left">
        Як навчання з <span className="reviewsPage__sapn">HUSTO</span> змінює
        життя
      </p>

      <div className="reviewsPage__container">
        <div
          className="reviewsPage__cards"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {reviewsData.map((review, index) => (
            <div
              className={classNames(
                `reviewsPage__card  reviewsPage__card--${review.id} animation`,
                {
                  'reviewsPage__card--active': currentReviewsIndex === index,
                  'reviewsPage__card--inactive': currentReviewsIndex !== index,
                  left: review.id === 1 || review.id === 3 || review.id === 4,
                  right: review.id === 2 || review.id === 5 || review.id === 6,
                },
              )}
              key={review.id}
            >
              <div className="reviewsPage__box">
                <img
                  className="reviewsPage__img"
                  src={review.image}
                  alt="client's photo"
                />
                <div className="reviewsPage__inform">
                  <div className="reviewsPage__name">{review.name}</div>
                  <div className="reviewsPage__age">{review.age}</div>
                </div>
              </div>

              <div className="reviewsPage__comments">
                <img className="reviewsPage__hash" src="images/hash(1).svg" />
                <p className="reviewsPage__p">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="reviewsPage__dots">
          {reviewsData.map((_, index) => (
            <div
              key={index}
              className={classNames('reviewsPage__dot', {
                'is-active': currentReviewsIndex === index,
              })}
              onClick={() => setCurrentReviewsIndex(index)}
            />
          ))}
        </div>
      </div>

      <div className="reviewsPage__clientForm animation left">
        <div className=" ClientForm__container">
          <h1 className="ClientForm__title">
            <img className="ClientForm__hash" src="images/hash(1).svg" />
            Ваша подорож до англійської мови <br />
            починається тут
          </h1>
          <div className="ClientForm__items">
            <div className="ClientForm__features">
              <p className="ClientForm__phar">
                Зв’яжіться з нами будь яким <br />
                зручним для вас способом
              </p>

              <div className="ClientForm__midia">
                <div className="ClientForm__midia-list">
                  <div className="ClientForm__midia-p"> Ми в: </div>
                  <a
                    className="ClientForm__link"
                    href="https://www.instagram.com/husto_language_studio/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      className="ClientForm__icon"
                      src="images/IconInstagram(final).png"
                    />
                  </a>
                  <a
                    className="ClientForm__link"
                    href="https://www.facebook.com/hustolanguagestudio"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      className="ClientForm__icon"
                      src="images/Icon-Facebook.svg"
                    />
                  </a>
                  <a
                    className="ClientForm__link"
                    href={
                      `${'https://www.tiktok.com'}` +
                      `${'/@husto.language_studio?_t=8pboAanPy7R'}`
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      className="ClientForm__icon"
                      src="images/Icon-TikTok.svg"
                    />
                  </a>
                </div>
              </div>

              <img
                className="ClientForm__logo"
                src="images/husto-logo-044.svg"
              />
            </div>

            <form className="ClientForm__form" onSubmit={handleSubmit}>
              <input
                className="ClientForm__input"
                type="text"
                placeholder="Ваш @instagram"
              />
              <textarea
                className="ClientForm__textarea"
                placeholder="Питання"
                name="text"
                id=""
              ></textarea>
              <button
                className="ClientForm__button"
                onClick={() => setClickButton(!clickButton)}
              >
                Відправити{' '}
                <span className="ClientForm__button2">
                  <img
                    className={classNames('ClientForm__button-img', {
                      'ClientForm__button-img--rotate': clickButton,
                    })}
                    alt="buttin icon"
                    src="images/Vector(6).svg"
                  />
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="reviewsPage__faq animation right">
        <div className="reviewsPage__questions">
          <div
            className={cn('reviewsPage__questionContainer', {
              'reviewsPage__questionContainer--open': isClicked[1],
            })}
          >
            <div className="reviewsPage__questionBox">
              <div className="reviewsPage__question">
                Які формати занять у нас є?
              </div>

              <div
                className="reviewsPage__questButton"
                onClick={() => toggleQuestion(1)}
              >
                <img
                  src="images/Vector-faq(6).svg"
                  alt="button image"
                  className={cn('reviewsPage__but-img', {
                    'reviewsPage__but-img--open': isClicked[1],
                  })}
                />
              </div>
            </div>

            {isClicked[1] && (
              <div className="reviewsPage__hiddenP">
                Знайдіть свій шлях до досконалої англійської з нашими
                різноманітними форматами навчання <br />
                Обирайтте, що найкраще підходить саме вам: <br />
                Індивідуальні заняття <br />
                Парні заняття <br />
                Групові заняття <b>Speaking Club</b>
              </div>
            )}
          </div>

          <div
            className={cn('reviewsPage__questionContainer', {
              'reviewsPage__questionContainer--open': isClicked[1],
            })}
          >
            <div className="reviewsPage__questionBox">
              <div className="reviewsPage__question">
                З яким рівнем ми працюємо?
              </div>

              <div
                className="reviewsPage__questButton"
                onClick={() => toggleQuestion(2)}
              >
                <img
                  src="images/Vector-faq(6).svg"
                  alt="button image"
                  className={cn('reviewsPage__but-img', {
                    'reviewsPage__but-img--open': isClicked[2],
                  })}
                />
              </div>
            </div>

            {isClicked[2] && (
              <div className="reviewsPage__hiddenP">
                Від нуля до експерта — наші курси розроблені для студентів на
                будь-якому рівні знання <br />
                англійської, від <b>Beginner</b> до <b>Advanced</b>.
              </div>
            )}
          </div>

          <div
            className={cn('reviewsPage__questionContainer', {
              'reviewsPage__questionContainer--open': isClicked[1],
            })}
          >
            <div className="reviewsPage__questionBox">
              <div className="reviewsPage__question">
                Яка у вас методика навчання?
              </div>

              <div
                className="reviewsPage__questButton"
                onClick={() => toggleQuestion(3)}
              >
                <img
                  src="images/Vector-faq(6).svg"
                  alt="button image"
                  className={cn('reviewsPage__but-img', {
                    'reviewsPage__but-img--open': isClicked[3],
                  })}
                />
              </div>
            </div>

            {isClicked[3] && (
              <div className="reviewsPage__hiddenP">
                На уроках у <b>Husto</b> ви розвиваєте всі ключові мовні
                навички—граматику, лексику та слухання, <br />
                але найбільша увага приділяється розмовній практиці. <br />
                Основа вивчення - сучасні підручники + інтерективні онлайн
                ресурси. <br />
                Середня тривалість курсу у <b>
                  Hustio Studio 8-9 місяців
                </b>. <br />
                Зауважимо що ваша успшність залежить також від того, <br />
                скільки ви приділяєте часу навчанню вдома.
              </div>
            )}
          </div>

          <div
            className={cn('reviewsPage__questionContainer', {
              'reviewsPage__questionContainer--open': isClicked[1],
            })}
          >
            <div className="reviewsPage__questionBox">
              <div className="reviewsPage__question">
                Як проходить навчання?
              </div>

              <div
                className="reviewsPage__questButton"
                onClick={() => toggleQuestion(4)}
              >
                <img
                  src="images/Vector-faq(6).svg"
                  alt="button image"
                  className={cn('reviewsPage__but-img', {
                    'reviewsPage__but-img--open': isClicked[4],
                  })}
                />
              </div>
            </div>

            {isClicked[4] && (
              <div className="reviewsPage__hiddenP">
                Ви можете проходити онлайн курси з будь-якого місця в Україні чи
                світі, не виходячи з дому. <br />
                Після безкоштовного тестування учасник розпочинає заняття у
                групі <br />
                з відповідним рівнем, індивідуально або у парі. <br />
                Курс та розклад занять розробляється відповідно до побажань учня
                <br />
                Корпоративні заняття проводимо оффлайн за побажанням навчання у
                програмі <b>Zoom</b>
              </div>
            )}
          </div>

          <div
            className={cn('reviewsPage__questionContainer', {
              'reviewsPage__questionContainer--open': isClicked[1],
            })}
          >
            <div className="reviewsPage__questionBox">
              <div className="reviewsPage__question">
                Що входить у вартість навчання?
              </div>

              <div
                className="reviewsPage__questButton"
                onClick={() => toggleQuestion(5)}
              >
                <img
                  src="images/Vector-faq(6).svg"
                  alt="button image"
                  className={cn('reviewsPage__but-img', {
                    'reviewsPage__but-img--open': isClicked[5],
                  })}
                />
              </div>
            </div>

            {isClicked[5] && (
              <div className="reviewsPage__hiddenP">
                Надаємо доступ до онлайн версії підручника, додаткових
                матеріалів та презентацій. <br />
                Контроль за навчанням: Домашні завдання, зміна графіку,
                успішність учня, тести.
              </div>
            )}
          </div>

          <div
            className={cn('reviewsPage__questionContainer', {
              'reviewsPage__questionContainer--open': isClicked[1],
            })}
          >
            <div className="reviewsPage__questionBox">
              <div className="reviewsPage__question">
                Яка кількість занять включена в місячний абонемент?
              </div>

              <div
                className="reviewsPage__questButton"
                onClick={() => toggleQuestion(6)}
              >
                <img
                  src="images/Vector-faq(6).svg"
                  alt="button image"
                  className={cn('reviewsPage__but-img', {
                    'reviewsPage__but-img--open': isClicked[6],
                  })}
                />
              </div>
            </div>

            {isClicked[6] && (
              <div className="reviewsPage__hiddenP">
                {'Придбавши місячний абонемент, ви отримуєте '}
                <b>8</b>
                {' або '}
                <b>9</b>
                {' занять.'}
                <br />
                {'Кількість занять змінюється в залежності від '}
                {'кількості днів у конкретному місяці.'}
              </div>
            )}
          </div>
        </div>
        <div className="reviewsPage__text">
          <h1 className="reviewsPage__title2">
            FAQ: Відповіді на <br />
            поширені запитання
          </h1>

          <p className="reviewsPage__phar1">
            Ми тут, щоб допомогти вам <br />
            досягти нових висот та впевнено <br />
            спілкуватися з усім світом
          </p>

          <div className="reviewsPage__last-phar-box">
            <p className="reviewsPage__phar2">
              Все ще є питання? Зв’яжіться знами
            </p>
            <p className="reviewsPage__phar3">
              <span className="reviewsPage__email"> Email:</span>{' '}
              husto.language.studio@gmail.com
            </p>
          </div>

          <h1 className="reviewsPage__title2 mob">
            FAQ: Відповіді на <br />
            поширені запитання
          </h1>
        </div>

        <p className="reviewsPage__phar1 mob">
          Ми тут, щоб допомогти вам <br />
          досягти нових висот та впевнено <br />
          спілкуватися з усім світом
        </p>

        <div className="reviewsPage__last-phar-box mob">
          <p className="reviewsPage__phar2">
            Все ще є питання? Зв’яжіться знами
          </p>
          <p className="reviewsPage__phar3">
            <span className="reviewsPage__email"> Email:</span>{' '}
            husto.language.studio@gmail.com
          </p>
        </div>

        <h1 className="reviewsPage__title2 mob">
          FAQ: Відповіді на <br />
          поширені запитання
        </h1>
      </div>
    </div>
  );
};
