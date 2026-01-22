import { api } from './api';

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  articleId: number;
  parentId: number | null;
  author: {
    id: number;
    name: string;
    image?: string;
  };
  replies?: Comment[];
}

export interface CreateCommentDto {
  content: string;
  articleId: number;
  parentId?: number;
}

export const getCommentsByArticle = async (articleId: string): Promise<Comment[]> => {
  const response = await api.get<Comment[]>(`/comments/article/${articleId}`);
  return response.data;
};

export const createComment = async (data: CreateCommentDto): Promise<Comment> => {
  const response = await api.post<Comment>('/comments', data);
  return response.data;
};
