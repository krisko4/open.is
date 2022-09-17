import { createContext, FC, useContext, useMemo, useState } from 'react';

export enum Mode {
  LIGHT = 'light',
  DARK = 'dark',
}
interface ColorMode {
  toggleColorMode: () => void;
  mode: Mode.DARK | Mode.LIGHT;
}

export const ColorModeContext = createContext<ColorMode>({
  toggleColorMode: () => ({}),
  mode: Mode.LIGHT,
});

export const ColorModeContextProvider: FC = ({ children }) => {
  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [mode, setMode] = useState<Mode.LIGHT | Mode.DARK>(Mode.DARK);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === Mode.LIGHT ? Mode.DARK : Mode.LIGHT));
      },
      mode,
    }),
    [mode]
  );
  return <ColorModeContext.Provider value={colorMode}>{children}</ColorModeContext.Provider>;
};

export const useColorMode = () => {
  const context = useContext(ColorModeContext);
  if (!context) throw new Error('ColorModeContext should be used inside ColorModeContextProvider');
  return context;
};
