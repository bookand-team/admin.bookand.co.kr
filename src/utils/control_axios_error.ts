import { isAxiosError } from 'axios';

export const controlAxiosError = (error: unknown) => {
  if (isAxiosError(error)) {
    if (error.response) {
      if (error.response.data.message && error.response.data.message === 'JWT EXCEPTION') {
        return 'Token Exception';
      } else {
        return 'Error with Response';
      }
    } else if (error.request) {
      return 'Error with Request';
    } else {
      return 'Error without Request';
    }
  } else {
    return 'Not Axios Error';
  }
};