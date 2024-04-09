import {PURPLE, PINK, ORANGE} from 'assets/colors';

const GradientThemes = {
  TheStreet: {
    colors: [ORANGE, PURPLE],
    start: {x: 0.5, y: 0.5},
    end: {x: 1, y: 1},
  },
  BrainTrusts: {
    colors: [PURPLE, PINK],
    start: {x: 0.5, y: 0.5},
    end: {x: 1, y: 1},
  },
  Visionaries: {
    colors: [PINK, ORANGE],
    start: {x: 0.5, y: 0.5},
    end: {x: 1, y: 1},
  },
  All: {
    colors: [ORANGE, PURPLE, PINK],
    useAngle: true,
    angle: 136,
  },
};

export default GradientThemes;
