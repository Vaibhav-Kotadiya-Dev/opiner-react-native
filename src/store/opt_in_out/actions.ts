import {ACTIONS_PACKAGE} from '../../appConstants';
import {Action} from '../ActionInterface';

const OPT_IN = `${ACTIONS_PACKAGE}.OPT_IN`;
const OPT_OUT = `${ACTIONS_PACKAGE}.OPT_OUT`;
const OPT_CONFIRM = `${ACTIONS_PACKAGE}.OPT_CONFIRM`;

const optIn = (id: number): Action => ({
  type: OPT_IN,
  payload: {
    id,
  },
});
const optOut = (id: number): Action => ({
  type: OPT_OUT,
  payload: {
    id,
  },
});
// const optConfirm = (id: number): Action => ({
//     type: OPT_CONFIRM,
//     payload: {
//         id
//     }
// })

export {
  OPT_IN,
  OPT_OUT,
  OPT_CONFIRM,
  optIn,
  optOut,
  // optConfirm
};
