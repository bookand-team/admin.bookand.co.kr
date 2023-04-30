import { isAxiosError } from 'axios';

export const axiosErrorHandler = (error: unknown): string => {
  // axios 에러인지 확인
  if (isAxiosError(error)) {
    // 요청 전송 성공, 응답 수신 성공, 응답 상태코드가 2XX 아닌 경우
    if (error.response) {
      // 서버에서 에러 메시지를 함께 보내준 경우
      if (error.response.data.message) {
        return error.response.data.message;
      } else {
        return 'AxiosError: Not successful response';
      }
    } else if (error.request) {
      return 'AxiosError: Failed to receive response';
    } else {
      return 'AxiosError: Failed to send request';
    }
  } else {
    return 'Error: Not axios error';
  }
};