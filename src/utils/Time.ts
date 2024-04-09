import moment from 'moment';
import momentTz from 'moment-timezone';

const timeProperties = [
  'created',
  'deadline',
  'modified',
  'startDate',
  'completed',
  'responseDeadline',
  'optInDeadline',
];

const timeConverter = (UNIX_timestamp: number): string => {
  return moment(UNIX_timestamp).format();
};

const getCreationDate = (value: string) => {
  return moment(value).format('DD MMMM YYYY').toUpperCase();
};

const convertTimeToLocal = (value: string) => {
  if (!value) {
    return value;
  }
  /**
   * If time in any other timezone is sent from the server,
   * Replace the timezone and use instead of value
   */
  // const londonTime = momentTz.tz(value, 'Europe/London');
  const localTime = momentTz.utc(value).tz(momentTz.tz.guess()).format();
  return localTime;
};

/**
 *
 * @param obj any object which time properties are to be converted
 * @param properties array of properties that are to be converted
 */
const convertPropertyTime = (
  obj: any = {},
  properties: Array<string> = timeProperties,
) => {
  let newObj = obj;
  const objKeys = Object.keys(obj);
  properties.forEach(prop => {
    if (objKeys.findIndex(key => key === prop) !== -1) {
      newObj[prop] = convertTimeToLocal(obj[prop]);
    }
  });
  return newObj;
};

const isDeadlineMidnight = (deadline: string) => {
  const time = moment(deadline).format('HH:mm');
  return moment(time, 'HH:mm').isSame(moment('00:00', 'HH:mm'), 'minute');
};

const formatTime = (deadline: string): string => {
  let responseTime = moment(deadline).format('HH:mm, D MMMM YYYY');
  // /**
  //  * If it's midnight, display `The end of {previous day}`
  //  */
  // if (isDeadlineMidnight(deadline)) {
  //   const prevDay = moment(deadline).subtract(1, 'day').format('dddd');
  //   responseTime = `the end of ${prevDay}`;
  // }
  return responseTime;
};

export {
  timeConverter,
  getCreationDate,
  convertTimeToLocal,
  convertPropertyTime,
  formatTime,
  isDeadlineMidnight,
};
