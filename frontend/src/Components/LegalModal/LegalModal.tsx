import React, { useContext, useEffect } from 'react';
import { StorageContext } from '../../storage/StorageContext';
import {
  PRIVACY_POLICY_DRAFT,
  PUBLIC_OFFER_UK,
} from '../../data/legalDocuments';
import './LegalModal.scss';

export const LegalModal: React.FC = () => {
  const { legalModal, setLegalModal } = useContext(StorageContext);

  useEffect(() => {
    if (!legalModal) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLegalModal(null);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [legalModal, setLegalModal]);

  if (!legalModal) {
    return null;
  }

  const doc = legalModal === 'offer' ? PUBLIC_OFFER_UK : PRIVACY_POLICY_DRAFT;

  return (
    <div
      className="LegalModal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      onClick={() => setLegalModal(null)}
    >
      <div
        className="LegalModal__window"
        onClick={e => e.stopPropagation()}
      >
        <div className="LegalModal__header">
          <div>
            <h2 id="legal-modal-title" className="LegalModal__title">
              <img
                className="LegalModal__hash"
                src="images/hash(1).svg"
                alt=""
              />
              {doc.title}
            </h2>
            {doc.subtitle && (
              <p className="LegalModal__subtitle">{doc.subtitle}</p>
            )}
          </div>

          <button
            type="button"
            className="LegalModal__close"
            onClick={() => setLegalModal(null)}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="LegalModal__body">
          {doc.notice && (
            <p className="LegalModal__notice">{doc.notice}</p>
          )}

          {doc.sections.map(section => (
            <section key={section.title} className="LegalModal__section">
              <h3>{section.title}</h3>

              {section.subBlocks?.map(block => (
                <div key={block.subtitle} className="LegalModal__subblock">
                  <p className="LegalModal__subtitle-item">{block.subtitle}</p>
                  <ul className="LegalModal__list">
                    {block.items.map(item => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}

              {section.paragraphs?.map(paragraph => (
                <p key={paragraph}>{paragraph}</p>
              ))}

              {section.list && (
                <ul className="LegalModal__list">
                  {section.list.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}

              {section.requisites && (
                <dl className="LegalModal__requisites">
                  {section.requisites.map(row => (
                    <div key={row.label} className="LegalModal__req-row">
                      <dt>{row.label}</dt>
                      <dd>{row.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};