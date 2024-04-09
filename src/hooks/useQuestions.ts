import {useSelector} from 'react-redux';

import {AppState} from 'store/rootReducer';

const useQuestions = () => {
  const state = useSelector((state: AppState) => state.allQuestions);
  return state;
};

export default useQuestions;
