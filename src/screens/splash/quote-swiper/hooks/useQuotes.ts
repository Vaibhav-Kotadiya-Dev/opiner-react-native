import {useState, useEffect} from 'react';

import {IQuote} from 'utils/Types';
import {getConfig, axiosClient} from 'network/OpinerApi';
import {reportToRaygun} from 'utils/Raygun';

const useQuotes = (numberToFetch: number = 3) => {
  const [currentIndex, setIndex] = useState(0);
  const [quotes, setQuotes] = useState<IQuote[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    axiosClient
      .get(`${getConfig().OPINER_BASE_URL}quote/getrandom/${numberToFetch}`, {})
      .then(response => {
        setLoading(false);
        if (response.data && Array.isArray(response.data)) {
          setQuotes(response.data);
        }
      })
      .catch(e => {
        console.log(e);
        reportToRaygun(e, 'Getting random quotes');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refresh = () => setIndex((currentIndex + 1) % quotes.length);

  return {
    quotes,
    isLoading,
    currentIndex,
    refresh,
  };
};

export default useQuotes;
