const delayBy = async (ms: number) => new Promise(res => setTimeout(res, ms));

const delayDevBy = async (ms: number) => {
  if (__DEV__) {
    return delayBy(ms);
  }
};

export {delayBy, delayDevBy};
