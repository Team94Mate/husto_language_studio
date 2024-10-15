import { useContext, useState } from 'react';
import './ClientForm.scss';
import { StorageContext } from '../../storage/StorageContext';
import classNames from 'classnames';
// import { addMessageData } from '../../api/api';

export interface ContactData {
  username: string;
  question: string;
}

export const ClientForm = () => {
  const { showForm, setShowForm } = useContext(StorageContext);
  const [isClicked, setIsClicked] = useState(false);
  const [username, setUsername] = useState('');
  const [question, setQuestion] = useState('');

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
    <div
      className={classNames('ClientForm', {
        'ClientForm--with-form': showForm,
      })}
    >
      <button
        className="ClientForm__close-button"
        onClick={() => setShowForm(false)}
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

            <img className="ClientForm__logo" src="images/husto-logo-044.svg" />
          </div>

          <form className="ClientForm__form" onSubmit={handleSubmit}>
            <input
              className="ClientForm__input"
              value={username}
              type="text"
              placeholder="Ваш @instagram"
              onChange={e => setUsername(e.target.value)}
            />
            <textarea
              className="ClientForm__textarea"
              value={question}
              onChange={e => setQuestion(e.target.value)}
              placeholder="Питання"
              name="text"
            ></textarea>

            <button
              type="submit"
              className="ClientForm__button"
              onClick={() => setIsClicked(!isClicked)}
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
