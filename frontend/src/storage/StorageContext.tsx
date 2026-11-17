import React, { useMemo, useState } from 'react';

export type LegalDocumentType = 'offer' | 'privacy' | null;

interface Props {
  showForm: boolean;
  setShowForm: (someData: boolean) => void;
  showBurger: boolean;
  setBurger: (someData: boolean) => void;
  setPageHeight: (pageHeight: number) => void;
  pageHeight: number;
  legalModal: LegalDocumentType;
  setLegalModal: (doc: LegalDocumentType) => void;
}

export const StorageContext = React.createContext<Props>({
  showForm: false,
  setShowForm: () => {},
  showBurger: false,
  setBurger: () => {},
  setPageHeight: () => {},
  pageHeight: 0,
  legalModal: null,
  setLegalModal: () => {},
});

type Prop = {
  children: React.ReactNode;
};

export const StorageProvider: React.FC<Prop> = ({ children }) => {
  const [showForm, setShowForm] = useState(false);
  const [showBurger, setBurger] = useState(false);
  const [pageHeight, setPageHeight] = useState(100);
  const [legalModal, setLegalModal] = useState<LegalDocumentType>(null);

  const value = useMemo(
    () => ({
      showForm,
      setShowForm,
      showBurger,
      setBurger,
      pageHeight,
      setPageHeight,
      legalModal,
      setLegalModal,
    }),
    [showForm, showBurger, pageHeight, legalModal],
  );

  return (
    <StorageContext.Provider value={value}>{children}</StorageContext.Provider>
  );
};
