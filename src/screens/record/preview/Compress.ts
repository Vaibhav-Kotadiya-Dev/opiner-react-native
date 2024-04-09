import fs from 'react-native-fs';
import {Platform} from 'react-native';
import {FFmpegKit, FFprobeKit} from 'ffmpeg-kit-react-native';

import {Question} from 'network/data/Question';
import {trackVideoStatus, TrackStatus} from 'network/OpinerApi';
import {setProgress, ProcessingType, setDone} from 'utils/VideoStateStore';
import {reportToRaygun} from 'utils/Raygun';
import {setValue, StorageKeys} from 'utils/LocalStorage';
import Toast from 'utils/Toast';
import {Constant} from 'screens/upload/utils';

export const getFinalOutputPath = (questionId: number) =>
  fs.CachesDirectoryPath + `/final-response-${questionId}.mp4`;

export const isFinalOutputPath = (path: string) =>
  path?.includes('final-response');

export const fixPath = (path: string) => {
  if (Platform.OS === 'android') {
    if (!path.startsWith('file://')) {
      path = `file://${path}`;
    }
  } else {
    path = path.replace('file://', '');
  }
  return path;
};

const getSize = async (
  path: string,
  extraInfo: string = '',
): Promise<string> => {
  try {
    const info = await fs.stat(fixPath(path));
    return (+info.size / 1000000).toFixed(2);
  } catch (error) {
    reportToRaygun(error as Error, 'Getting file size: getSize - ' + extraInfo);
    return '0';
  }
};

const tryCounter = {
  current: 0,
};
// For some reason, the package fails to get width and height
// in the first try (in the very first case only).
export const findWidthHeight = async (path: string) => {
  tryCounter.current = 0; // Reset before starting.
  while (tryCounter.current < 5) {
    tryCounter.current++;
    try {
      const session = await FFprobeKit.getMediaInformation(path);
      const info = session.getMediaInformation();
      const props = info.getAllProperties();
      let {width: rawWidth, height: rawHeight} = props;
      for (const stream of info.getStreams()) {
        if (rawHeight && rawWidth) {
          break;
        }
        const width = stream.getWidth();
        if (width && !rawWidth) {
          rawWidth = width;
        }

        const height = stream.getHeight();
        if (height && !rawHeight) {
          rawHeight = height;
        }
      }
      if (rawWidth === undefined || rawHeight === undefined) {
        throw new Error('Width and height are undefined');
      }
      console.log(
        `Found width: ${rawWidth}, height: ${rawHeight}, try count: (${tryCounter.current})`,
      );
      return {
        width: parseInt(rawWidth, 10),
        height: parseInt(rawHeight, 10),
      };
    } catch (exp) {
      reportToRaygun(
        exp as Error,
        'Retrieving height and width: findWidthHeight',
      );
      await new Promise(res =>
        setTimeout(() => res(true), tryCounter.current * 250),
      );
    }
  }
  throw new Error('Failed to retrieve width and height. - ' + path);
};

const processVideo = async (
  question: Question,
  src: string,
): Promise<string> => {
  if (isFinalOutputPath(src)) {
    return src; // don't compress the final link
  }
  const newPath = getFinalOutputPath(question.id);
  // effect -> setStatus (Compressing, Compressing, QuestionId)
  setProgress({
    question,
    path: src,
    processType: ProcessingType.Compressing,
  });

  if (await fs.exists(newPath)) {
    await fs.unlink(newPath);
  }

  const oldSize = await getSize(src, 'old path');
  const {width, height} = await findWidthHeight(src);
  tryCounter.current = 0;
  const pick = Math.min(width, height);
  const crop = Math.abs((height - width) / 2);
  await FFmpegKit.execute(
    `-i ${src} -vcodec libx264 -q:v 8 -vf "crop=${pick}:${pick}:0:${crop}${
      Constant.isIOS ? '' : ', hflip'
    }" -y ${newPath}`,
  );
  fs.exists(src).then(has => {
    if (has) {
      fs.unlink(src);
    }
  });

  const newSize = await getSize(newPath, 'new path');
  setValue(StorageKeys.LastVideoSize, parseFloat(newSize));
  const percentageOfOriginal = (
    (Number(newSize) / Number(oldSize)) *
    100
  ).toFixed(0);

  trackVideoStatus({
    description: 'Compression successful',
    fileSize: newSize,
    questionId: question.id,
    status: TrackStatus.Information,
  });

  Toast.show({
    duration: 3500,
    message: `Compression successful! File size is ${newSize}MB (${percentageOfOriginal}% of the original).`,
  });

  setDone({
    question,
    path: newPath,
    processType: ProcessingType.Compressing,
  });
  // logAll();
  return newPath;
};

export {processVideo, getSize};
