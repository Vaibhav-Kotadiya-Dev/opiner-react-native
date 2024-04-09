import {useEffect, useState} from 'react';
// @ts-ignore
import Upload, {UploadOptions} from 'react-native-background-upload';

import {getConfig} from 'network/OpinerApi';
import {reportToRaygun} from 'utils/Raygun';
import Toast from 'utils/Toast';
import {faCheckCircle} from '@fortawesome/pro-solid-svg-icons';

interface Props {
  imagePath: string;
  token: string;
  onComplete?: () => void;
}

const manager = {
  handle: console.log,
};

export const useUploadStatus = () => {
  const [isUploading, setUploading] = useState(false);
  useEffect(() => {
    manager.handle = setUploading;
  }, []);
  return isUploading;
};

const uploadImageBackground = async (props: Props) => {
  const {imagePath, token} = props;
  const options: UploadOptions = {
    url: `${getConfig().OPINER_BASE_URL}account/postimage`,
    path: imagePath,
    method: 'POST',
    field: 'file',
    type: 'multipart',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
    notification: {
      enabled: true,
      autoClear: true,
    },
  };
  manager.handle(true);
  Upload.startUpload(options)
    .then(uploadId => {
      Upload.addListener('error', uploadId, data => {
        manager.handle(false);
        Toast.show({
          message: 'Upload failed',
          description: data.error,
          type: 'danger',
        });
      });
      Upload.addListener('cancelled', uploadId, () => {
        manager.handle(false);
        Toast.show({
          message: 'Upload failed',
          description: 'The upload was cancelled.',
          type: 'danger',
        });
      });
      Upload.addListener('completed', uploadId, () => {
        manager.handle(false);
        props.onComplete?.();
        Toast.show({
          message: 'Photo saved',
          iconProps: {
            icon: faCheckCircle,
          },
        });
      });
    })
    .catch(err => {
      reportToRaygun(err, 'Uploading image');
      console.log('Upload error!', err);
    });
};

export default uploadImageBackground;
