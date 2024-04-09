import {
  IconDefinition,
  faGaugeSimple,
  faGaugeSimpleHigh,
  faGaugeSimpleLow,
  faGaugeSimpleMax,
  faGaugeSimpleMin,
} from '@fortawesome/pro-solid-svg-icons';

export const speedOptions: {
  label: string;
  value: number;
  icon: IconDefinition;
}[] = [
  {
    label: 'Fastest',
    value: 2,
    icon: faGaugeSimpleMax,
  },
  {
    label: 'Faster',
    value: 1.5,
    icon: faGaugeSimpleHigh,
  },
  {
    label: 'Normal',
    value: 1,
    icon: faGaugeSimple,
  },
  {
    label: 'Slower',
    value: 0.8,
    icon: faGaugeSimpleLow,
  },
  {
    label: 'Slowest',
    value: 0.5,
    icon: faGaugeSimpleMin,
  },
];

export const getSpeedIcon = (speed: number) => {
  const speedOption = speedOptions.find(option => option.value === speed);
  return speedOption ? speedOption.icon : faGaugeSimple;
};
