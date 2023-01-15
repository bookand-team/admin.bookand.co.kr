import { ArticleDTO } from './data';

export interface ReadArticleResDTO {
  article: ArticleDTO;
}

export interface ReadArticlesResDTO {
  articles: ArticleDTO[];
  articlesLength: number;
}

export function isReadArticleResDTO(res: unknown): res is ReadArticleResDTO {
  // res가 객체인지 확인
  if (!(res !== null && typeof res === 'object')) { return false; }
  // article 확인
  if (!('article' in res)) { return false; }
  return true;
}

export function isReadArticlesResDTO(res: unknown): res is ReadArticlesResDTO {
  // res가 객체인지 확인
  if (!(res !== null && typeof res === 'object')) { return false; }
  // articles, articlesLength 확인
  if (!('articles' in res && 'articlesLength' in res)) { return false; }
  return true;
}