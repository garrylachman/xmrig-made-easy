/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/ban-types */

import React from 'react';

type UISettings = {
  cardColumns: number;
};

const uiSettingsInitial: UISettings = {
  cardColumns: 1,
};

type UIContextProps = UISettings & {
  setCardColumns: (value: number) => void;
};

export const UIContext = React.createContext<UIContextProps>({
  ...uiSettingsInitial,
  setCardColumns: (value: number) => {},
});

export const UIContextProvider: React.FC<{}> = ({ children }) => {
  const [state, setState] = React.useState<UISettings>(uiSettingsInitial);

  const cardColumns = React.useMemo(() => state.cardColumns, [state]);
  const setCardColumns = (value: number) =>
    setState((old) => ({ ...old, cardColumns: value }));

  return (
    <UIContext.Provider
      value={{
        cardColumns,
        setCardColumns,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
