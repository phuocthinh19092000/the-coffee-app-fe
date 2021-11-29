import React, { useState } from 'react';

type Theme = 'Light' | 'Dark';
type ThemeContext = { theme: Theme; toggleTheme: () => void };

export const ThemeContext = React.createContext<ThemeContext>({} as ThemeContext);

export const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('Light');
  const toggleTheme = () => {
    setTheme(theme === 'Light' ? 'Dark' : 'Light');
  };

  const backgroundColor = theme === 'Light' ? '#FFF' : '#333';

  document.body.style.backgroundColor = backgroundColor;

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
