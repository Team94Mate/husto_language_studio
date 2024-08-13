interface Props {
  someData: string;
  setData: (someData: string) => void;
}

import React, { useMemo, useState } from 'react';

export const StorageContext = React.createContext<Props>({
  someData: '',
  setData: () => {},
});

type Prop = {
  children: React.ReactNode;
};

export const StorageProvider: React.FC<Prop> = ({ children }) => {
  const [someData, setData] = useState('');

  const value = useMemo(
    () => ({
      someData,
      setData,
    }),
    [someData, setData],
  );

  return (
    <StorageContext.Provider value={value}>{children}</StorageContext.Provider>
  );
};
