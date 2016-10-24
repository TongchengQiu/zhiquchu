export const START = 'multiDispatch/step/start';
export const SUCCESS = 'multiDispatch/step/success';
export const ERROR = 'multiDispatch/step/error';

export const multiReducer = (action, startFunc, successFunc, errorFunc) => {
  switch (action.step) {
    case START:
      return startFunc && startFunc();
    case SUCCESS:
      return successFunc && successFunc();
    case ERROR:
      return errorFunc && errorFunc();
    default:
      return null;
  }
};

export const multiDispatch = ({ types, type, api, ...args }) => {
  if (!type && !types) {
    throw new Error('type or types is required!');
  }

  if (!api) {
    throw new Error('api is required!');
  }

  let startType = null;
  let successType = null;
  let errorType = null;
  if (types) {
    startType = types[0];
    successType = types[1];
    errorType = types[2];
  } else {
    startType = type;
    successType = type;
    errorType = type;
  }

  return (dispatch) => {
    startType && dispatch({
      ...args,
      type: startType,
      step: START
    });

    return api()
      .then((obj) => {
        successType && dispatch({
          ...args,
          type: successType,
          step: SUCCESS,
          result: obj
        });
      })
      .catch((response) => {
        errorType && dispatch({
          ...args,
          type: errorType,
          step: ERROR,
          error: response && response.error,
          response
        });
      });
  };
};

export default multiDispatch;
