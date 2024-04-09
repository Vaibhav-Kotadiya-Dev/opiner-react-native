import {getConfig} from 'network/OpinerApi';

const getCDNImageURL = (cdnUrl?: string | null) => {
  return `${getConfig().CONTENT_URL}${cdnUrl}`;
};

const OpinerContent = {
  getCDNImageURL,
};

export default OpinerContent;
