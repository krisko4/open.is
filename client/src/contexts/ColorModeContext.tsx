import { createContext, FC, useContext, useMemo, useState } from 'react';

interface ColorMode {
  toggleColorMode: () => void
  mode: 'dark' | 'light'
}

export const ColorModeContext = createContext<ColorMode>({
  toggleColorMode: () => { },
  mode: 'light',
});

export const ColorModeContextProvider: FC = ({ children }) => {
  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [mode, setMode] = useState<'light' | 'dark'>('dark');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      mode,
    }), [mode],
  );
  return (
        <ColorModeContext.Provider value={colorMode}>
            {children}
        </ColorModeContext.Provider>
  );
};

export const useColorMode = () => {
  const context = useContext(ColorModeContext);
  if (!context) throw new Error('ColorModeContext should be used inside ColorModeContextProvider');
  return context;
}; 