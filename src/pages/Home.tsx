import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Pagination from '@mui/material/Pagination';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getArticles } from '../api/articles';
import SearchIcon from '@mui/icons-material/Search';
import Header from '../components/Header';
import ArticleCard from '../components/ArticleCard';
import { TAGS } from '../utils/tags';
import type { TagCode } from '../utils/tags';

export default function Home() {
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedTag, setSelectedTag] = useState<TagCode | null>(null);

  const isAuthenticated = !!localStorage.getItem('tech-blog:token');

  const selectedTagCode = selectedTag ?? undefined;

  const {
    data: response,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['articles', debouncedSearch, selectedTagCode, page, pageSize],
    queryFn: () => getArticles(debouncedSearch, selectedTagCode, page, pageSize),
  });

  const handleTagClick = (code: TagCode) => {
    setSelectedTag((prev) => (prev === code ? null : code));
    setPage(1);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box sx={{ bgcolor: '#FFFFFF', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header showLogout={isAuthenticated} />

      <Container maxWidth="lg" sx={{ py: 4, flexGrow: 1 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Newsreader',
              fontWeight: 700,
              color: '#141712',
              fontSize: { xs: '24px', md: '32px' },
            }}
          >
            Todos os artigos
          </Typography>

          {isAuthenticated && (
            <Button
              variant="contained"
              disableElevation
              sx={{
                bgcolor: '#67A22D',
                borderRadius: '12px',
                textTransform: 'none',
                fontFamily: 'Newsreader',
                px: { xs: 2, md: 3 },
                fontSize: { xs: '14px', md: '16px' },
                '&:hover': { bgcolor: '#5a8d27' },
                display: 'flex',
              }}
              onClick={() => navigate('/artigo/criar')}
            >
              Criar artigo
            </Button>
          )}
        </Box>

        <TextField
          fullWidth
          placeholder="Pesquisar..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: <SearchIcon sx={{ color: '#758269', mr: 1 }} />,
            sx: {
              bgcolor: '#EDF2E8',
              borderRadius: '12px',
              height: '56px',
              px: 2,
              '& fieldset': { border: 'none' },
            },
          }}
        />

        <Box
          sx={{
            display: 'flex',
            gap: '12px',
            mb: 4,
            overflowX: 'auto',
            pb: 1,
            '&::-webkit-scrollbar': { display: 'none' },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          {TAGS.map(({ label, code }) => {
            const selected = selectedTag === code;

            return (
              <Chip
                key={code}
                label={label}
                onClick={() => handleTagClick(code)}
                sx={{
                  fontFamily: 'Newsreader',
                  fontWeight: 500,
                  bgcolor: selected ? '#67A22D' : '#EDF2E8',
                  color: selected ? '#FFFFFF' : '#141712',
                  borderRadius: '12px',
                }}
              />
            );
          })}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
              <CircularProgress sx={{ color: '#67A22D' }} />
            </Box>
          ) : isError ? (
            <Typography color="error" textAlign="center">
              Erro ao carregar artigos.
            </Typography>
          ) : (
            response?.data.map((article) => <ArticleCard key={article.id} article={article} />)
          )}
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            mt: 4,
            mb: 2,
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <Pagination
            count={response?.pagination.totalPages || 1}
            page={page}
            onChange={handlePageChange}
            shape="rounded"
            sx={{
              '& .Mui-selected': {
                borderRadius: '16px',
                bgcolor: '#EDF2E8 !important',
                color: '#000000',
              },
            }}
          />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography sx={{ fontSize: '12px', color: '#758269', fontFamily: 'Newsreader' }}>
              quantidade por página:
            </Typography>
            <Select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
              size="small"
              sx={{
                borderRadius: '16px',
                height: '32px',
                fontSize: '12px',
                bgcolor: '#EDF2E8',
                '& fieldset': { border: 'none' },
              }}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
            </Select>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
