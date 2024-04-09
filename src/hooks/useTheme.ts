import {useState} from 'react';

import {IThemeContext} from 'context/ThemeContext';
import {AppThemes, DefaultAppTheme} from 'theme';

const useTheme = (): IThemeContext => {
  const [themeName, setThemeName] = useState(DefaultAppTheme.name);

  // const scheme = useColorScheme();
  // const themeByScheme = scheme
  //   ? scheme === 'dark'
  //     ? AppThemes.Dark.name
  //     : AppThemes.Light.name
  //   : AppThemes.Light.name;

  // useEffect(() => {
  //   setThemeName(themeByScheme);
  // }, [themeByScheme]);

  // useLayoutEffect(() => {
  //   try {
  //     /**
  //      * SAVED THEME
  //      * We can use this later to enable in-app theme toggle
  //      */
  //     AsyncStorage.getItem('theme').then(saved => {
  //       if (saved) {
  //         setThemeName(saved as ThemeNameType);
  //       }
  //     });
  //   } catch (error) {}
  // }, []);

  const onThemeToggle = () => {
    const newTheme =
      themeName === AppThemes.Dark.name ? AppThemes.Light : AppThemes.Dark;
    setThemeName(newTheme.name);
    // AsyncStorage.setItem('theme', newTheme.name);
  };

  return {
    theme: AppThemes[themeName],
    onThemeToggle,
  };
};

export default useTheme;
