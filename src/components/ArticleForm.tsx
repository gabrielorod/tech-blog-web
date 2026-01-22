import { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Chip, Stack } from '@mui/material';
import Header from './Header';
import Rollback from './rollback';
import { TAGS, type TagCode } from '../utils/tags';

interface ArticleFormProps {
  title: string;
  buttonLabel: string;
  initialData?: { title: string; content: string; tags: TagCode[]; imageUrl?: string };
  onSubmit: (data: { title: string; content: string; tags: TagCode[]; imageUrl?: string }) => void;
  isLoading?: boolean;
}

export default function ArticleForm({
  title,
  buttonLabel,
  initialData,
  onSubmit,
  isLoading,
}: ArticleFormProps) {
  const [formData, setFormData] = useState<{
    title: string;
    content: string;
    tags: TagCode[];
    imageUrl?: string;
  }>({
    title: initialData?.title || '',
    content: initialData?.content || '',
    imageUrl: initialData?.imageUrl || '',
    tags: (initialData?.tags as TagCode[]) || [],
  });

  const isAuthenticated = !!localStorage.getItem('tech-blog:token');

  const handleTagToggle = (code: TagCode) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(code) ? prev.tags.filter((t) => t !== code) : [...prev.tags, code],
    }));
  };

  return (
    <Box sx={{ bgcolor: { xs: '#F7F4ED', md: '#FFFFFF' }, minHeight: '100vh' }}>
      <Header showLogout={isAuthenticated} />
      <Container
        maxWidth={false}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          py: { xs: 0, md: '20px' },
          px: { xs: 0, md: '160px' },
        }}
      >
        <Box sx={{ width: '100%', maxWidth: '960px', bgcolor: '#FFFFFF', p: '16px' }}>
          <Rollback />
          <Typography
            sx={{ fontFamily: 'Newsreader', fontWeight: 700, fontSize: '32px', color: '#141712' }}
          >
            {title}
          </Typography>

          <Stack spacing={3}>
            <Box>
              <Typography sx={{ fontFamily: 'Newsreader', fontWeight: 600, mb: 1 }}>
                Título do artigo *
              </Typography>
              <TextField
                fullWidth
                placeholder="Título"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    bgcolor: '#EDF2E8',
                    borderRadius: '12px',
                    p: '10px 16px',
                    fontFamily: 'Newsreader',
                  },
                }}
              />
            </Box>

            <Box>
              <Typography sx={{ fontFamily: 'Newsreader', fontWeight: 600, mb: 1 }}>
                Imagem do Artigo
              </Typography>
              <TextField
                fullWidth
                placeholder="https://exemplo.com/imagem.jpg"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    bgcolor: '#EDF2E8',
                    borderRadius: '12px',
                    p: '10px 16px',
                    fontFamily: 'Newsreader',
                  },
                }}
              />
              {formData.imageUrl && (
                <Box sx={{ mt: 2, borderRadius: '12px', overflow: 'hidden', maxHeight: '200px' }}>
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                </Box>
              )}
            </Box>

            <Box>
              <Typography sx={{ fontFamily: 'Newsreader', fontWeight: 600, mb: 1 }}>
                Tags *
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {TAGS.map(({ label, code }) => {
                  const selected = formData.tags.includes(code);

                  return (
                    <Chip
                      key={code}
                      label={label}
                      onClick={() => handleTagToggle(code)}
                      sx={{
                        fontFamily: 'Newsreader',
                        fontWeight: 500,
                        bgcolor: selected ? 'rgba(103, 162, 45, 0.2)' : '#EDF2E8',
                        color: selected ? '#67A22D' : '#141712',
                        borderRadius: '12px',
                        border: 'none',
                      }}
                    />
                  );
                })}
              </Box>
            </Box>

            <Box>
              <Typography sx={{ fontFamily: 'Newsreader', fontWeight: 600, mb: 1 }}>
                Conteúdo *
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={10}
                placeholder="Escreva aqui seu artigo..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    bgcolor: '#EDF2E8',
                    borderRadius: '12px',
                    p: '16px',
                    fontFamily: 'Newsreader',
                  },
                }}
              />
            </Box>
          </Stack>

          <Box
            sx={{
              pt: 2,
              pb: 4,
              display: 'flex',
              justifyContent: { xs: 'center', md: 'flex-start' },
            }}
          >
            <Button
              variant="contained"
              disableElevation
              onClick={() => onSubmit(formData)}
              disabled={isLoading || !formData.title || !formData.content}
              sx={{
                bgcolor: '#67A22D',
                color: '#EDF2E8',
                borderRadius: '12px',
                textTransform: 'none',
                fontFamily: 'Newsreader',
                fontWeight: 600,
                fontSize: '14px',
                width: { xs: '100%', md: '109px' },
                height: '40px',
                '&:hover': { bgcolor: '#5a8d27' },
                '&.Mui-disabled': { bgcolor: '#A5C68A', color: '#EDF2E8', opacity: 0.7 },
              }}
            >
              {isLoading ? 'Salvando...' : buttonLabel}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
