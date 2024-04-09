import {axiosClient, getConfig} from 'network/OpinerApi';

const likeResponse = async ({
  id,
  timestamp,
}: {
  id: number;
  timestamp?: string | number;
}) => {
  const url = `${getConfig().OPINER_BASE_URL}response/${id}/like${
    timestamp ? `/${timestamp}` : ''
  }`;
  return await axiosClient.get(url);
};

const unlikeResponse = async ({id}: {id: number}) => {
  const url = `${getConfig().OPINER_BASE_URL}response/${id}/unlike`;
  return await axiosClient.get(url);
};

export {likeResponse, unlikeResponse};
