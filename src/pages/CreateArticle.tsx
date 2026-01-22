import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import ArticleForm from '../components/ArticleForm';
import { createArticle } from '../api/articles';

export default function CreateArticle() {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: createArticle,
    onSuccess: () => navigate('/artigos'),
    onError: () => alert('Erro ao criar artigo.'),
  });

  return (
    <ArticleForm
      title="Novo artigo"
      buttonLabel="Criar artigo"
      onSubmit={(data) => mutate(data)}
      isLoading={isPending}
    />
  );
}
