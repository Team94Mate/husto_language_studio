import './Midia.scss';

export const Midia = () => {
  return (
    <div className="ClientForm__midia Midia">
      <div className="ClientForm__midia-list Midia__list">
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
          <img className="ClientForm__icon" src="images/Icon-Facebook.svg" />
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
          <img className="ClientForm__icon" src="images/Icon-TikTok.svg" />
        </a>
      </div>
    </div>
  );
};
