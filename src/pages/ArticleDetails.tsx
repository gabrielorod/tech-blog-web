import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  TextField,
  Button,
  Chip,
} from '@mui/material';
import Header from '../components/Header';
import CommentItem from '../components/CommentItem';
import { getArticleById } from '../api/articles';
import { createComment, getCommentsByArticle } from '../api/comments';
import type { Comment as BlogComment } from '../api/comments';
import Rollback from '../components/rollback';

export default function ArticleDetails() {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const isAuthenticated = !!localStorage.getItem('tech-blog:token');

  const [commentText, setCommentText] = useState('');
  const [replyText, setReplyText] = useState('');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(5);

  const { data: article, isLoading: loadingArticle } = useQuery({
    queryKey: ['article', id],
    queryFn: () => getArticleById(id!),
    enabled: !!id,
  });

  const { data: comments, isLoading: loadingComments } = useQuery({
    queryKey: ['comments', id],
    queryFn: () => getCommentsByArticle(id!),
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: (variables: { content: string; parentId?: number }) =>
      createComment({
        content: variables.content,
        articleId: Number(id),
        parentId: variables.parentId,
      }),
    onSuccess: () => {
      setCommentText('');
      setReplyText('');
      setReplyingTo(null);
      queryClient.invalidateQueries({ queryKey: ['comments', id] });
    },
    onError: () => {
      alert('Erro ao enviar comentário. Verifique sua conexão.');
    },
  });

  const handleSendComment = () => {
    if (!commentText.trim()) return;
    mutation.mutate({ content: commentText });
  };

  const handleSendReply = (parentId: number) => {
    if (!replyText.trim()) return;
    mutation.mutate({ content: replyText, parentId });
  };

  if (loadingArticle || loadingComments)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress sx={{ color: '#67A22D' }} />
      </Box>
    );

  return (
    <Box
      sx={{
        bgcolor: { xs: '#F7F4ED', md: '#FFFFFF' },
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header showLogout={isAuthenticated} />

      <Container
        maxWidth={false}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: { xs: '20px 16px', md: '20px 160px' },
        }}
      >
        <Box sx={{ width: '100%', maxWidth: '960px' }}>
          <Rollback />

          <Box sx={{ p: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Newsreader',
                  fontWeight: 700,
                  fontSize: '32px',
                  lineHeight: '40px',
                  color: '#141712',
                  maxWidth: '600px',
                }}
              >
                {article?.title}
              </Typography>
              {article?.tags?.[0] && (
                <Chip
                  label={article.tags[0].name}
                  sx={{
                    bgcolor: '#EDF2E8',
                    borderRadius: '12px',
                    fontFamily: 'Newsreader',
                    fontWeight: 500,
                  }}
                />
              )}
            </Box>
            <Typography sx={{ fontFamily: 'Newsreader', fontSize: '14px', color: '#758269' }}>
              Publicado por {article?.author.name} •{' '}
              {article?.createdAt ? new Date(article.createdAt).toLocaleDateString('pt-BR') : ''}
            </Typography>
          </Box>

          <Box sx={{ p: '4px 16px 12px' }}>
            <Typography
              sx={{
                fontFamily: 'Newsreader',
                fontSize: '16px',
                lineHeight: '24px',
                color: '#141712',
                whiteSpace: 'pre-line',
              }}
            >
              {article?.content}
            </Typography>
          </Box>

          <Box sx={{ p: '16px 16px 8px', mt: 4 }}>
            <Typography sx={{ fontFamily: 'Newsreader', fontWeight: 700, fontSize: '18px', mb: 2 }}>
              Comentários ({comments?.length || 0})
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder={
                isAuthenticated
                  ? 'Escreva um comentário...'
                  : 'Você precisa estar logado para comentar.'
              }
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              variant="standard"
              InputProps={{
                readOnly: !isAuthenticated,
                disableUnderline: true,
                sx: {
                  bgcolor: isAuthenticated ? '#EDF2E8' : '#F5F5F5',
                  borderRadius: '12px',
                  p: 2,
                  fontFamily: 'Newsreader',
                  fontSize: '18px',
                  cursor: !isAuthenticated ? 'not-allowed' : 'text',
                  '& textarea::placeholder': {
                    color: !isAuthenticated ? '#A0A0A0' : '#758269',
                    opacity: 1,
                  },
                },
              }}
            />

            <Box sx={{ py: 2 }}>
              <Button
                variant="contained"
                disableElevation
                onClick={handleSendComment}
                disabled={!isAuthenticated || !commentText.trim() || mutation.isPending}
                sx={{
                  bgcolor: '#67A22D',
                  borderRadius: '12px',
                  textTransform: 'none',
                  px: 4,
                  '&.Mui-disabled': {
                    bgcolor: isAuthenticated ? '#A5C68A' : '#E0E0E0',
                    color: '#FFF',
                  },
                }}
              >
                {mutation.isPending ? 'Enviando...' : 'Comentar'}
              </Button>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {comments?.slice(0, visibleCount).map((comment: BlogComment) => (
                <Box key={comment.id}>
                  <CommentItem
                    name={comment.author.name}
                    content={comment.content}
                    time={new Date(comment.createdAt).toLocaleDateString('pt-BR')}
                    isReply={!!comment.parentId}
                    canDelete={false}
                    onReply={() => isAuthenticated && setReplyingTo(comment.id)}
                  />

                  {comment.replies &&
                    comment.replies.map((reply: BlogComment) => (
                      <CommentItem
                        key={reply.id}
                        name={reply.author.name}
                        content={reply.content}
                        time={new Date(reply.createdAt).toLocaleDateString('pt-BR')}
                        isReply={true}
                      />
                    ))}

                  {replyingTo === comment.id && (
                    <Box sx={{ ml: '68px', mb: 3, pr: 2 }}>
                      <TextField
                        fullWidth
                        size="small"
                        variant="standard"
                        placeholder="Escreva sua resposta..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        InputProps={{
                          disableUnderline: true,
                          sx: {
                            bgcolor: '#EDF2E8',
                            borderRadius: '8px',
                            p: 1.5,
                            fontFamily: 'Newsreader',
                          },
                        }}
                      />
                      <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                        <Button
                          size="small"
                          onClick={() => handleSendReply(comment.id)}
                          sx={{ color: '#67A22D', textTransform: 'none', fontFamily: 'Newsreader' }}
                        >
                          Responder
                        </Button>
                        <Button
                          size="small"
                          onClick={() => setReplyingTo(null)}
                          sx={{ color: '#758269', textTransform: 'none', fontFamily: 'Newsreader' }}
                        >
                          Cancelar
                        </Button>
                      </Box>
                    </Box>
                  )}
                </Box>
              ))}

              {comments && comments.length > visibleCount && (
                <Button
                  variant="text"
                  onClick={() => setVisibleCount((prev) => prev + 5)}
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    padding: '0px 0px 12px 64px',
                    width: '100%',
                    fontFamily: 'Newsreader',
                    fontSize: '12px',
                    color: '#67A22D',
                    textTransform: 'none',
                    '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' },
                  }}
                >
                  Ver mais comentários
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
