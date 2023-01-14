/** POST 방식의 fetch 요청할 때 body에 json 데이터를 보낼 때 사용 */
export const postBody = (data: unknown) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };
};