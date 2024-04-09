import {useState, useEffect} from 'react';
import moment, {Moment} from 'moment';
import {VideoTimeConfig} from 'utils';

interface ITimerInfo {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  ms: number;
}

const defaultTime: ITimerInfo = {
  days: 0,
  hours: 0,
  minutes: VideoTimeConfig.minutes,
  seconds: 0,
  ms: 0,
};

const formatTime = (expiresOn: Moment): ITimerInfo => {
  if (!expiresOn) {
    return {...defaultTime};
  }
  const now = moment();
  const duration = moment.duration(expiresOn.diff(now));
  const format: ITimerInfo = {
    days: 0,
    ms: duration.get('ms'),
    hours: expiresOn.diff(now, 'hours'),
    minutes: duration.get('minutes'),
    seconds: duration.get('seconds'),
  };
  if (format.minutes === VideoTimeConfig.minutes) {
    format.seconds = 0;
  }
  return format;
};

const hasExpired = ({days, hours, minutes, seconds, ms}: ITimerInfo) =>
  days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0 && ms <= 0;

const useTimer = (expiresOn?: Moment, onExpire?: () => void) => {
  const [time, setTime] = useState<ITimerInfo>({...defaultTime});
  useEffect(() => {
    if (!expiresOn || !onExpire) {
      return;
    }
    const timerId = setInterval(() => {
      const newTime = formatTime(expiresOn);
      setTime(newTime);
      if (hasExpired(newTime)) {
        clearInterval(timerId);
        setTimeout(onExpire, 100);
      }
    }, 100);
    return () => clearInterval(timerId);
  }, [expiresOn, onExpire]);
  return time;
};

export default useTimer;
