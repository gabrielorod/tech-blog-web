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
