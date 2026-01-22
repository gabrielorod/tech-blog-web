import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Rollback() {
  const navigate = useNavigate();

  return (
    <>
      <Button
        onClick={() => navigate('/artigos')}
        startIcon={<ArrowBackIcon />}
        sx={{
          ml: 1,
          mt: 1,
          fontFamily: 'Newsreader',
          textTransform: 'none',
          color: '#758269',
          '&:hover': { bgcolor: 'transparent', color: '#141712' },
        }}
      >
        Voltar para artigos
      </Button>
    </>
  );
}
