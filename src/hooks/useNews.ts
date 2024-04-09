import {useState, useEffect} from 'react';

import {getConfig, axiosClient} from 'network/OpinerApi';
import {reportToRaygun} from 'utils/Raygun';

interface INewsItem {
  author: string;
  authorUserId: number;
  body: string;
  categoryName: string;
  created: string;
  id: number;
  imageExist: boolean;
  imageKey: string;
  isBrainTrust: boolean;
  isChanged: boolean;
  isOnline: boolean;
  isStreet: boolean;
  isVisionary: boolean;
  keyIdentifier: string;
  modified: string;
  newsCategoryId: number;
  title: string;
  videoExist: boolean;
  videoKey: string;
  videoThumbExist: boolean;
  videoThumbKey: string;
}

const useNews = () => {
  const [news, setNews] = useState<INewsItem[]>([]);
  const [isBusy, setBusy] = useState(false);
  useEffect(() => {
    setBusy(true);
    axiosClient
      .get(`${getConfig().OPINER_BASE_URL}news/getnews`)
      .then(response => {
        const {data} = response;
        if (data && Array.isArray(data)) {
          setNews(data);
        }
        setBusy(false);
      })
      .catch(e => {
        reportToRaygun(e, 'Fetching news');
        setBusy(false);
      });
  }, []);
  return {
    news,
    isBusy,
  };
};

export default useNews;
