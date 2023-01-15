import { isReadArticleResDTO, isReadArticlesResDTO, PageState } from '@types';
import { controlAxiosError } from '@utils/control_axios_error';
import { postBody } from '@utils/post_body';

const baseUrl = `${process.env.NEXT_PUBLIC_AXIOS_FRONT_PROTOCOL}${process.env.NEXT_PUBLIC_AXIOS_FRONT_HOST}${process.env.NEXT_PUBLIC_AXIOS_FRONT_COMMON_PATH}`;

// id값을 이용한 아티클 조회
export const readArticle = async (param: { id: string; }) => {
  try {
    const response = await fetch(`${baseUrl}/article/${param.id}`);
    const result = await response.json();
    if (isReadArticleResDTO(result)) {
      return result;
    } else {
      return 'Not Vaild Format';
    }
  } catch (error) {
    return controlAxiosError(error);
  }
};

// 조건에 맞는 아티클 조회
export const readArticles = async (data: Partial<PageState>) => {
  try {
    const response = await fetch(`${baseUrl}/article/search`, postBody(data));
    const result = await response.json();
    if (isReadArticlesResDTO(result)) {
      return result;
    } else {
      return 'Not Vaild Format';
    }
  } catch (error) {
    return controlAxiosError(error);
  }
};

// 전체 아티클 조회
export const readWholeArticles = async () => {
  try {
    const response = await fetch(`${baseUrl}/article`);
    const result = await response.json();
    if (isReadArticlesResDTO(result)) {
      return result;
    } else {
      return 'Not Vaild Format';
    }
  } catch (error) {
    return controlAxiosError(error);
  }
};