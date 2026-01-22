import { Box, Typography, Chip, IconButton } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import type { Article } from '../api/articles';

interface ArticleCardProps {
  article: Article;
}

interface TokenPayload {
  sub: number;
  email: string;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const navigate = useNavigate();

  const token = localStorage.getItem('tech-blog:token');
  let loggedUserId: number | null = null;

  if (token) {
    try {
      const decoded = jwtDecode<TokenPayload>(token);
      loggedUserId = decoded.sub;
    } catch (error) {
      console.error('Token inválido', error);
    }
  }

  const isAuthor = loggedUserId === article.author.id;

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/artigo/editar/${article.id}`);
  };

  return (
    <Box
      onClick={() => navigate(`/artigo/${article.id}`)}
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        p: '16px',
        borderBottom: '1px solid #E6E8EB',
        cursor: 'pointer',
        transition: '0.2s',
        '&:hover': { bgcolor: '#FAFCF7' },
      }}
    >
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', width: '100%' }}>
        <Box
          sx={{
            width: 56,
            height: 56,
            bgcolor: '#EDF2E8',
            borderRadius: '8px',
            flexShrink: 0,
          }}
        >
          {article.imageUrl ? (
            <img
              src={article.imageUrl}
              alt={article.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : null}
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Typography
              sx={{
                fontFamily: 'Newsreader',
                fontWeight: 600,
                fontSize: '16px',
                color: '#141712',
                mb: 0.5,
              }}
            >
              {article.title}
            </Typography>

            {isAuthor && (
              <IconButton size="small" onClick={handleEdit} sx={{ color: '#758269', p: 0.5 }}>
                <EditOutlinedIcon fontSize="small" />
              </IconButton>
            )}
          </Box>

          <Typography
            sx={{
              fontFamily: 'Newsreader',
              fontSize: '14px',
              color: '#758269',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              mb: 1,
            }}
          >
            {article.content}
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
            {article.tags?.map((tag) => (
              <Chip
                key={tag.id}
                label={tag.name}
                size="small"
                sx={{
                  height: '20px',
                  fontSize: '10px',
                  bgcolor: '#EDF2E8',
                  fontFamily: 'Newsreader',
                  borderRadius: '12px',
                }}
              />
            ))}
          </Box>

          <Typography sx={{ fontSize: '12px', color: '#B0B0B0', fontFamily: 'Newsreader' }}>
            Por: {article.author.name}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
