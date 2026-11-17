import React, { useContext, useEffect, useState } from 'react';
import './ReviewsPage.scss';
import cn from 'classnames';
import classNames from 'classnames';
import { addMessageData, getReviews } from '../../../api/api';
import { useAnimationEffect } from '../../../hooks/useAnimationEffect';
import { ContactData } from '../../../types/ContactData';
import { Review } from '../../../types/Review';
import { useSwipe } from '../../../utils/useSwipe';
import { useTranslation } from 'react-i18next';
import { localizeReview } from '../../../i18n/dynamicTranslations';
import { StorageContext } from '../../../storage/StorageContext';


const WHATSAPP_URL = 'https://wa.me/380631699824';
const GMAIL_COMPOSE_URL =
  'https://mail.google.com/mail/?view=cm&fs=1&to=husto.language.studio@gmail.com';

export const ReviewsPage = () => {
  const { t, i18n } = useTranslation();
  const { setLegalModal } = useContext(StorageContext);

  const [isClicked, setIsClicked] = useState<Record<number, boolean>>({});
  const [clickButton, setClickButton] = useState(false);
  const [reviewsData, setReviews] = useState<Review[]>([]);

  const sortedById = [...reviewsData].sort((a, b) => a.id - b.id);
  const localizedReviews = sortedById.map(review =>
    localizeReview(review, i18n.language),
  );

  const toggleQuestion = (index: number) => {
    setIsClicked(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const {
    currentSlideIndex: currentReviewsIndex,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    setCurrentSlideIndex: setCurrentReviewsIndex,
  } = useSwipe({ slideCount: reviewsData.length });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [quest, setQuestion] = useState('');

  const [loading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [successMessageTE, setSuccessMessageTE] = useState(false);
  const [errorMessageTE, setErrorMessageTE] = useState(false);

  const isNameValid = name.trim().length >= 2;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isPhoneValid = phone.trim().length >= 7;

  const isFormValid = () => {
    return isNameValid && isEmailValid && isPhoneValid;
  };

  const handleFieldFocus = (field: string) => {
    setFocusedField(field);
    setErrorMessage(false);
    setErrorMessageTE(false);
    setSuccessMessage(false);
    setSuccessMessageTE(false);
    setClickButton(false);
  };

  const handleFieldBlur = () => {
    setFocusedField(null);

    if (!isFormValid()) {
      setErrorMessage(true);
    } else {
      setErrorMessage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid()) {
      setErrorMessage(true);
      setErrorMessageTE(true);

      return;
    }

    const commentText = quest.trim()
      ? quest.trim()
      : t('clientForm.defaultQuestion');

    const contactMessageData: ContactData = {
      username: name.trim(),
      question: `Ім'я: ${name.trim()} | Email: ${email.trim()} | Телефон: ${phone.trim()} | Коментар: ${commentText}`,
    };

    setIsLoading(true);
    setErrorMessage(false);
    setSuccessMessage(false);
    setErrorMessageTE(false);
    setSuccessMessageTE(false);

    addMessageData(contactMessageData)
      .then(response => {
        if (response) {
          setName('');
          setEmail('');
          setPhone('');
          setQuestion('');
          setSuccessMessage(true);
          setSuccessMessageTE(true);
        }
      })
      .catch(() => {
        setErrorMessage(true);
        setErrorMessageTE(true);
      })
      .finally(() => {
        setIsLoading(false);
        setTimeout(() => {
          setSuccessMessage(false);
          setSuccessMessageTE(false);
          setClickButton(false);
        }, 2000);
      });
  };

  useEffect(() => {
    getReviews().then(response => setReviews(response));
  }, []);

  useAnimationEffect(sortedById);

  return (
    <div className="reviewsPage" id="reviews">
      <p className="reviewsPage__title1 animation left">
        {t('reviews.titlePrefix')}{' '}
        <span className="reviewsPage__sapn">HUSTO</span>{' '}
        {t('reviews.titleSuffix')}
      </p>

      <div className="reviewsPage__container">
        <div
          className="reviewsPage__cards"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {localizedReviews.map((review, index) => (
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
                  src={review.photo}
                  alt="client's photo"
                />
                <div className="reviewsPage__inform">
                  <div className="reviewsPage__name">{review.name}</div>
                  <div className="reviewsPage__age">
                    {t('reviews.ageYears', { age: review.age })}
                  </div>
                </div>
              </div>

              <div className="reviewsPage__comments">
                <img className="reviewsPage__hash" src="images/hash(1).svg" />
                <p className="reviewsPage__p">{review.description}</p>
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
        <div className="ClientForm__container">
          <h1 className="ClientForm__title">
            <img className="ClientForm__hash" src="images/hash(1).svg" />
            {t('clientForm.title')}
          </h1>
          <div className="ClientForm__items">
            <div className="ClientForm__features">
              <p className="ClientForm__phar">
                {t('clientForm.subtitleLine1')} <br />
                {t('clientForm.subtitleLine2')}
              </p>

              <div className="ClientForm__midia">
                <div className="ClientForm__midia-list">
                  <div className="ClientForm__midia-p">
                    {t('clientForm.socialsLabel')}
                  </div>
                  <a
                    className="ClientForm__link"
                    href="https://www.instagram.com/husto_language_studio/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <svg
                      className="ClientForm__icon"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="20" cy="20" r="20" fill="#2A857E" />
                      <rect
                        x="12"
                        y="12"
                        width="16"
                        height="16"
                        rx="4.5"
                        stroke="white"
                        strokeWidth="1.8"
                      />
                      <circle
                        cx="20"
                        cy="20"
                        r="3.6"
                        stroke="white"
                        strokeWidth="1.8"
                      />
                      <circle cx="24.5" cy="15.5" r="1.1" fill="white" />
                    </svg>
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
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <svg
                      className="ClientForm__icon"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="20" cy="20" r="20" fill="#2A857E" />
                      <path
                        d="M20.04 10C14.58 10 10.13 14.45 10.13 19.91C10.13 21.66 10.59 23.36 11.45 24.86L10.05 30L15.3 28.62C16.75 29.41 18.38 29.83 20.04 29.83C25.5 29.83 29.95 25.38 29.95 19.92C29.95 17.27 28.92 14.78 27.05 12.91C25.18 11.03 22.69 10 20.04 10ZM20.05 11.67C22.25 11.67 24.31 12.53 25.87 14.09C27.42 15.65 28.28 17.72 28.28 19.92C28.28 24.46 24.58 28.15 20.04 28.15C18.56 28.15 17.11 27.76 15.85 27L15.55 26.83L12.43 27.65L13.26 24.61L13.06 24.29C12.24 22.97 11.8 21.47 11.8 19.91C11.81 15.37 15.5 11.67 20.05 11.67ZM16.53 15.33C16.37 15.33 16.1 15.39 15.87 15.64C15.65 15.89 15 16.5 15 17.71C15 18.93 15.89 20.1 16.01 20.27C16.14 20.44 17.76 22.94 20.25 24.01C22.34 24.91 22.76 24.73 23.22 24.69C23.68 24.65 24.69 24.09 24.9 23.51C25.1 22.93 25.1 22.43 25.04 22.33C24.97 22.22 24.81 22.16 24.56 22.04C24.31 21.91 23.09 21.31 22.87 21.23C22.64 21.15 22.48 21.11 22.31 21.36C22.15 21.61 21.67 22.16 21.53 22.33C21.38 22.49 21.24 22.51 20.99 22.39C20.74 22.26 19.94 22 18.99 21.15C18.25 20.49 17.75 19.67 17.61 19.42C17.46 19.17 17.59 19.04 17.72 18.92C17.83 18.81 17.97 18.62 18.09 18.48C18.22 18.33 18.26 18.23 18.34 18.06C18.43 17.9 18.38 17.75 18.32 17.63C18.26 17.5 17.76 16.28 17.55 15.78C17.36 15.33 17.16 15.34 17 15.33H16.53Z"
                        fill="white"
                      />
                    </svg>
                  </a>
                  <a
                    className="ClientForm__link"
                    href={GMAIL_COMPOSE_URL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <svg
                      className="ClientForm__icon"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="20" cy="20" r="20" fill="#2A857E" />
                      <path
                        d="M27 13H13C12.01 13 11.21 13.81 11.21 14.8L11.2 25.6C11.2 26.59 12.01 27.4 13 27.4H27C27.99 27.4 28.8 26.59 28.8 25.6V14.8C28.8 13.81 27.99 13 27 13ZM27 16.6L20 21.1L13 16.6V14.8L20 19.3L27 14.8V16.6Z"
                        fill="white"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              <img
                className="ClientForm__logo"
                src="images/Header.svg"
                alt="Husto logo"
              />
            </div>

            <form className="ClientForm__form" onSubmit={handleSubmit}>
              <input
                className={classNames('ClientForm__input', {
                  'ClientForm__input--filled': name.trim() !== '',
                  'ClientForm__input--succes': successMessage,
                  'ClientForm__input--error': errorMessage && !isNameValid,
                  'ClientForm__input--warning': errorMessage && !isNameValid,
                  'ClientForm__input--focus': focusedField === 'name',
                })}
                value={name}
                type="text"
                placeholder={t('clientForm.namePlaceholder')}
                onChange={e => setName(e.target.value)}
                disabled={loading}
                onFocus={() => handleFieldFocus('name')}
                onBlur={handleFieldBlur}
              />

              <input
                className={classNames('ClientForm__input', {
                  'ClientForm__input--filled': email.trim() !== '',
                  'ClientForm__input--succes': successMessage,
                  'ClientForm__input--error': errorMessage && !isEmailValid,
                  'ClientForm__input--warning': errorMessage && !isEmailValid,
                  'ClientForm__input--focus': focusedField === 'email',
                })}
                value={email}
                type="email"
                placeholder={t('clientForm.emailPlaceholder')}
                onChange={e => setEmail(e.target.value)}
                disabled={loading}
                onFocus={() => handleFieldFocus('email')}
                onBlur={handleFieldBlur}
              />

              <input
                className={classNames('ClientForm__input', {
                  'ClientForm__input--filled': phone.trim() !== '',
                  'ClientForm__input--succes': successMessage,
                  'ClientForm__input--error': errorMessage && !isPhoneValid,
                  'ClientForm__input--warning': errorMessage && !isPhoneValid,
                  'ClientForm__input--focus': focusedField === 'phone',
                })}
                value={phone}
                type="tel"
                placeholder={t('clientForm.phonePlaceholder')}
                onChange={e => setPhone(e.target.value)}
                disabled={loading}
                onFocus={() => handleFieldFocus('phone')}
                onBlur={handleFieldBlur}
              />

              <textarea
                className={classNames('ClientForm__textarea', {
                  'ClientForm__textarea--filled': quest.trim() !== '',
                  'ClientForm__textarea--succes': successMessageTE,
                  'ClientForm__textarea--error': errorMessageTE,
                  'ClientForm__textarea--focus': focusedField === 'quest',
                })}
                value={quest}
                onChange={e => setQuestion(e.target.value)}
                placeholder={t('clientForm.questionPlaceholder')}
                name="text"
                disabled={loading}
                onFocus={() => handleFieldFocus('quest')}
                onBlur={handleFieldBlur}
              ></textarea>

              <button
                type="submit"
                className="ClientForm__button"
                onClick={() => setClickButton(!clickButton)}
                disabled={!isFormValid()}
              >
                {t('clientForm.submit')}{' '}
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
            <p className="ClientForm__consent">
              {t('legal.consentPrefix')}{' '}
              <button
                type="button"
                className="ClientForm__consent-link"
                onClick={() => setLegalModal('offer')}
              >
                {t('legal.offerLink')}
              </button>{' '}
            </p>
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
                {t('reviews.faq1Q')}
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
                {t('reviews.faq1ALine1')} <br />
                {t('reviews.faq1ALine2')} <br />
                {t('reviews.faq1ALine3')} <br />
                {t('reviews.faq1ALine4')} <br />
                {t('reviews.faq1ALine5')} <br />
                <b>{t('reviews.faq1ALine6')}</b>
              </div>
            )}
          </div>

          <div
            className={cn('reviewsPage__questionContainer', {
              'reviewsPage__questionContainer--open': isClicked[2],
            })}
          >
            <div className="reviewsPage__questionBox">
              <div className="reviewsPage__question">
                {t('reviews.faq2Q')}
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
                {t('reviews.faq2ALine1')} <br />
                {t('reviews.faq2ALine2Prefix')} <b>Beginner</b>{' '}
                {t('reviews.faq2ALine2Mid')} <b>Advanced</b>.
              </div>
            )}
          </div>

          <div
            className={cn('reviewsPage__questionContainer', {
              'reviewsPage__questionContainer--open': isClicked[3],
            })}
          >
            <div className="reviewsPage__questionBox">
              <div className="reviewsPage__question">
                {t('reviews.faq3Q')}
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
                {t('reviews.faq3ALine1Prefix')} <b>Husto</b>{' '}
                {t('reviews.faq3ALine1Suffix')} <br />
                {t('reviews.faq3ALine2')} <br />
                {t('reviews.faq3ALine3')} <br />
                {t('reviews.faq3ALine4Prefix')}{' '}
                <b>{t('reviews.faq3ALine4Bold')}</b>. <br />
                {t('reviews.faq3ALine5')} <br />
                {t('reviews.faq3ALine6')}
              </div>
            )}
          </div>

          <div
            className={cn('reviewsPage__questionContainer', {
              'reviewsPage__questionContainer--open': isClicked[4],
            })}
          >
            <div className="reviewsPage__questionBox">
              <div className="reviewsPage__question">
                {t('reviews.faq4Q')}
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
                {t('reviews.faq4ALine1')} <br />
                {t('reviews.faq4ALine2')} <br />
                {t('reviews.faq4ALine3')} <br />
                {t('reviews.faq4ALine4')} <br />
                {t('reviews.faq4ALine5')} <b>Zoom</b>
              </div>
            )}
          </div>

          <div
            className={cn('reviewsPage__questionContainer', {
              'reviewsPage__questionContainer--open': isClicked[5],
            })}
          >
            <div className="reviewsPage__questionBox">
              <div className="reviewsPage__question">
                {t('reviews.faq5Q')}
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
                {t('reviews.faq5ALine1')} <br />
                {t('reviews.faq5ALine2')}
              </div>
            )}
          </div>

          <div
            className={cn('reviewsPage__questionContainer', {
              'reviewsPage__questionContainer--open': isClicked[6],
            })}
          >
            <div className="reviewsPage__questionBox">
              <div className="reviewsPage__question">
                {t('reviews.faq6Q')}
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
                {t('reviews.faq6ALine1')}
                <br />
                {t('reviews.faq6ALine2')}
              </div>
            )}
          </div>
        </div>
        <div className="reviewsPage__text">
          <h1 className="reviewsPage__title2">
            {t('reviews.faqTitleLine1')} <br />
            {t('reviews.faqTitleLine2')}
          </h1>

          <p className="reviewsPage__phar1">
            {t('reviews.faqDescLine1')} <br />
            {t('reviews.faqDescLine2')} <br />
            {t('reviews.faqDescLine3')}
          </p>

          <div className="reviewsPage__last-phar-box">
            <p className="reviewsPage__phar2">
              {t('reviews.faqContactPrompt')}
            </p>
            <p className="reviewsPage__phar3">
              <span className="reviewsPage__email"> Email:</span>{' '}
              husto.language.studio@gmail.com
            </p>
          </div>

          <h1 className="reviewsPage__title2 mob">
            {t('reviews.faqTitleLine1')} <br />
            {t('reviews.faqTitleLine2')}
          </h1>
        </div>

        <p className="reviewsPage__phar1 mob">
          {t('reviews.faqDescLine1')} <br />
          {t('reviews.faqDescLine2')} <br />
          {t('reviews.faqDescLine3')}
        </p>

        <div className="reviewsPage__last-phar-box mob">
          <p className="reviewsPage__phar2">
            {t('reviews.faqContactPrompt')}
          </p>
          <p className="reviewsPage__phar3">
            <span className="reviewsPage__email"> Email:</span>{' '}
            husto.language.studio@gmail.com
          </p>
        </div>

        <h1 className="reviewsPage__title2 mob">
          {t('reviews.faqTitleLine1')} <br />
          {t('reviews.faqTitleLine2')}
        </h1>
      </div>
    </div>
  );
};