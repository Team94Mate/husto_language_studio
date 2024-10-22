export interface Review {
  id: number;
  name: string;
  age: string;
  description: string;
  photo: string;
}

interface Props {
  showForm: boolean;
  setShowForm: (someData: boolean) => void;
  showBurger: boolean;
  setBurger: (someData: boolean) => void;
  setPageHeight: (pageHeight: number) => void;
  pageHeight: number;
}

import React, { useMemo, useState } from 'react';

export const StorageContext = React.createContext<Props>({
  showForm: false,
  setShowForm: () => {},
  showBurger: false,
  setBurger: () => {},

  setPageHeight: () => {},
  pageHeight: 0,
});

type Prop = {
  children: React.ReactNode;
};

export const StorageProvider: React.FC<Prop> = ({ children }) => {
  const [showForm, setShowForm] = useState(false);
  const [showBurger, setBurger] = useState(false);
  const [pageHeight, setPageHeight] = useState(100);

  const value = useMemo(
    () => ({
      showForm,
      setShowForm,
      showBurger,
      setBurger,
      pageHeight,
      setPageHeight,
    }),
    [showForm, showBurger, pageHeight],
  );

  return (
    <StorageContext.Provider value={value}>{children}</StorageContext.Provider>
  );
};
