import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { CircularProgress } from '@mui/material';

import ArticleForm from '../components/ArticleForm';
import { getArticleById, updateArticle, type UpdateArticleData } from '../api/articles';
import { tagLabelToCode, type TagCode } from '../utils/tags';

export default function EditArticle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: article, isLoading } = useQuery({
    queryKey: ['article', id],
    queryFn: () => getArticleById(id!),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: UpdateArticleData) => updateArticle(id!, data),
    onSuccess: () => navigate(`/artigo/${id}`),
    onError: () => alert('Erro ao atualizar artigo.'),
  });

  const initialData = article
    ? {
        title: article.title,
        content: article.content,
        tags: article.tags.map((t) => tagLabelToCode(t.name)).filter((t): t is TagCode => !!t),
      }
    : undefined;

  if (isLoading) return <CircularProgress />;

  return (
    <ArticleForm
      key={article?.id}
      title="Editar artigo"
      buttonLabel="Salvar"
      initialData={initialData}
      onSubmit={(data) => mutate(data)}
      isLoading={isPending}
    />
  );
}
