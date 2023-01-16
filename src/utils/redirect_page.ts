/** 서버사이드에서 페이지 이동 */
export const redirectPage = (destination: string) => {
  return {
    redirect: {
      destination: destination,
      permanent: false
    }
  };
};