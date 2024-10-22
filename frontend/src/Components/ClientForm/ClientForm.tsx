import React, { useContext, useState } from 'react';
import './ClientForm.scss';
import { StorageContext } from '../../storage/StorageContext';
import classNames from 'classnames';
import { addMessageData } from '../../api/api';

export interface ContactData {
  username: string;
  question: string;
}

export const ClientForm = () => {
  const { showForm, setShowForm } = useContext(StorageContext);
  const [isClicked, setIsClicked] = useState(false);
  const [username, setUsername] = useState('');
  const [quest, setQuestion] = useState('');
  const [loading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [successMessageTE, setSuccessMessageTE] = useState(false);
  const [errorMessageTE, setErrorMessageTE] = useState(false);
  const [isFocusedTE, setIsFocusedTE] = useState(false);

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (!value.startsWith('@')) {
      value = '@' + value.replace('/@/g', '');
    }

    setUsername(value);
  };

  const isFormValid = () => {
    return username.trim().length > 1;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid()) {
      setErrorMessage(true);
      setErrorMessageTE(true);

      return;
    }

    const question = quest.trim() ? quest : 'не задали питання';

    const contactMessageData: ContactData = {
      username,
      question,
    };

    setIsLoading(true);
    setErrorMessage(false);
    setSuccessMessage(false);
    setErrorMessageTE(false);
    setSuccessMessageTE(false);

    addMessageData(contactMessageData)
      .then(response => {
        if (response) {
          setUsername('');
          setQuestion('');
          setSuccessMessage(true);
          setSuccessMessageTE(true);
          setTimeout(() => {
            setShowForm(false);
          }, 2000);
        }
      })
      .catch(error => {
        setErrorMessage(true);
        setErrorMessageTE(true);
        throw error;
      })
      .finally(() => {
        setIsLoading(false);
        setTimeout(() => {
          setSuccessMessage(false);
          setSuccessMessageTE(false);
          setIsClicked(false);
        }, 1000);
      });
  };

  return (
    <div
      className={classNames('ClientForm', {
        'ClientForm--with-form': showForm,
      })}
    >
      <button
        className="ClientForm__close-button"
        onClick={() => {
          setShowForm(false);
          setErrorMessage(false);
          setErrorMessageTE(false);
          setIsClicked(false);
          setSuccessMessageTE(false);
        }}
      >
        X
      </button>
      <div className="ClientForm__container">
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

            <img className="ClientForm__logo" src="/images/Header.svg" />
          </div>

          <form className="ClientForm__form" onSubmit={handleSubmit}>
            <input
              className={classNames('ClientForm__input', {
                'ClientForm__input--filled': username.trim() !== '',
                'ClientForm__input--succes': successMessage,
                'ClientForm__input--error': errorMessage,
                'ClientForm__input--warning': errorMessage,
                'ClientForm__input--focus': isFocused,
              })}
              value={username}
              pattern="^@([A-Za-z0-9._]){1,30}$"
              title="Ім'я в Instagram повинно починатися 
              з @ і бути довжиною від 1 до 30 символів, 
              включаючи літери, цифри, крапки та підкреслення."
              type="text"
              placeholder="Ваш @instagram"
              onChange={e => {
                setUsername(e.target.value);
                handleInputValue(e);
              }}
              disabled={loading}
              onFocus={() => {
                setIsFocused(true);
                setErrorMessage(false);
                setSuccessMessage(false);
                setIsClicked(false);
              }}
              onBlur={() => {
                setIsFocused(false);

                if (!isFormValid()) {
                  setErrorMessage(true);
                } else {
                  setErrorMessage(false);
                }
              }}
            />
            <textarea
              className={classNames('ClientForm__textarea', {
                'ClientForm__textarea--filled': quest.trim() !== '',
                'ClientForm__textarea--succes': successMessageTE,
                'ClientForm__textarea--error': errorMessageTE,
                'ClientForm__textarea--focus': isFocusedTE,
              })}
              value={quest}
              onChange={e => setQuestion(e.target.value)}
              placeholder="Питання"
              name="text"
              disabled={loading}
              onFocus={() => {
                setIsFocusedTE(true);
                setErrorMessageTE(false);
                setSuccessMessageTE(false);
                setIsClicked(false);
              }}
              onBlur={() => {
                if (!isFormValid()) {
                  setErrorMessage(true);
                }

                setIsFocusedTE(false);
              }}
            ></textarea>

            <button
              type="submit"
              className="ClientForm__button"
              onClick={() => {
                setIsClicked(!isClicked);
              }}
              disabled={!isFormValid()}
            >
              Відправити{' '}
              <span className="ClientForm__button2">
                <img
                  className={classNames('ClientForm__button-img', {
                    'ClientForm__button-img--rotate': isClicked,
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
  );
};
