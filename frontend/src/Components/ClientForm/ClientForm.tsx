import { useContext, useState } from 'react';
import './ClientForm.scss';
import { StorageContext } from '../../storage/StorageContext';
import classNames from 'classnames';

export const ClientForm = () => {
  const { showForm, setShowForm } = useContext(StorageContext);
  const [isClicked, setIsClicked] = useState(false);
  const [instagram, setInstagram] = useState('');
  const [question, setQuestion] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const contactMessageData = {
      instagram,
      question,
    };

    try {
      const response = await fetch(
        'http://0.0.0.0:8001/api/contact-messages/',
        {
          method: 'Post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(contactMessageData),
        },
      );

      if (response.ok) {
        setInstagram('');
        setQuestion('');
      } else {
        // console.error('Failed to send message:', response.status);
      }
    } catch (error) {
      // console.error('Error while sending the request:', error);
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
              type={instagram}
              placeholder="Ваш @instagram"
              onChange={e => setInstagram(e.target.value)}
            />
            <textarea
              className="ClientForm__textarea"
              value={question}
              onChange={e => setQuestion(e.target.value)}
              placeholder="Питання"
              name="text"
            ></textarea>

            <a
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
            </a>
          </form>
        </div>
      </div>
    </div>
  );
};
