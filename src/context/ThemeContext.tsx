import React, {ReactNode} from 'react';

import useTheme from 'hooks/useTheme';
import {DefaultAppTheme, ITheme} from 'theme';
import ThemeToggleButton from 'components/theme-toggle';

export interface IThemeContext {
  theme: ITheme;
  onThemeToggle: () => void;
}

export const ThemeContext = React.createContext<IThemeContext>({
  theme: DefaultAppTheme,
  onThemeToggle: () => false,
});

const ThemeProvider = ({children}: {children: ReactNode}) => {
  const themeContext = useTheme();
  return (
    <ThemeContext.Provider value={themeContext}>
      {children}
      <ThemeToggleButton />
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
