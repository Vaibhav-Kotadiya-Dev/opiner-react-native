import {useContext} from 'react';

import {IThemeContext, ThemeContext} from 'context/ThemeContext';

const useThemeContext = (): IThemeContext => useContext(ThemeContext);

export default useThemeContext;
