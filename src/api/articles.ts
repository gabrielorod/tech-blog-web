import { api } from './api';

export interface Tag {
  id: number;
  name: string;
}

export interface Author {
  id: number;
  name: string;
}

export interface Article {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: Author;
  tags: Tag[];
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface CreateArticleData {
  title: string;
  content: string;
  tags: string[];
}
export interface UpdateArticleData {
  title?: string;
  content?: string;
  tags?: string[];
}

export const getArticles = async (
  search?: string,
  tag?: string,
  page: number = 1,
  pageSize: number = 10,
): Promise<PaginatedResponse<Article>> => {
  const response = await api.get<PaginatedResponse<Article>>('/articles', {
    params: { search, tag, page, pageSize },
  });
  return response.data;
};

export const getArticleById = async (id: string): Promise<Article> => {
  const response = await api.get<Article>(`/articles/${id}`);
  return response.data;
};

export const createArticle = async (data: CreateArticleData): Promise<Article> => {
  const response = await api.post<Article>('/articles', data);
  return response.data;
};

export const updateArticle = async (
  id: string | number,
  data: UpdateArticleData,
): Promise<Article> => {
  const response = await api.put<Article>(`/articles/${id}`, data);
  return response.data;
};
