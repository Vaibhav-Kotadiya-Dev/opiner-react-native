import {useState, useEffect} from 'react';
import moment, {Moment} from 'moment';
import {VideoTimeConfig} from 'utils';

const defaultTime = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

const formatTime = (expiresOn: Moment) => {
  if (!expiresOn) {
    return {...defaultTime};
  }
  const now = moment();
  const duration = moment.duration(expiresOn.diff(now));
  const format = {
    days: expiresOn.diff(now, 'days'),
    hours: duration.get('hours'),
    minutes: duration.get('minutes'),
    seconds: duration.get('seconds'),
  };
  if (format.minutes === VideoTimeConfig.minutes) {
    format.seconds = 0;
  }
  return format;
};

const hasExpired = ({
  days,
  hours,
  minutes,
  seconds,
}: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}) => days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0;

const useDeadlineTimer = (expiresOn: Moment, onExpire: () => void) => {
  const [time, setTime] = useState({...formatTime(expiresOn)});

  useEffect(() => {
    const timerId = setInterval(() => {
      const newTime = formatTime(expiresOn);
      setTime(newTime);
      if (hasExpired(newTime)) {
        clearInterval(timerId);
        setTimeout(onExpire, 1000);
        return;
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [expiresOn, onExpire]);

  return time;
};

export default useDeadlineTimer;
