import {useEffect, useState} from 'react';
import {ItemType} from 'react-native-dropdown-picker';

import {getCountriesList} from 'network/OpinerApi';
import {getCountriesDropdownOptions} from 'screens/account/utils';

let countriesListCache: ItemType<string | number>[] = [];

const useCountriesList = () => {
  const [countriesList, setCountriesList] = useState<
    ItemType<string | number>[]
  >([]);

  useEffect(() => {
    if (countriesListCache && countriesListCache.length) {
      setCountriesList(countriesListCache);
      return;
    }
    getCountriesList().then(results => {
      if (results && results.length) {
        const data = getCountriesDropdownOptions(results);
        setCountriesList(data);
        countriesListCache = data;
      }
    });
  }, []);

  return {countriesList};
};

export default useCountriesList;
