import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '800px',
        height: '100vh',
        width: '100%',
        bgcolor: '#FFFFFF',
      }}
    >
      <Header showLogout={false} />

      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: { xs: '20px 16px', md: '20px 160px' },
        }}
      >
        <Box
          sx={{
            textAlign: 'center',
            maxWidth: '960px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Newsreader',
              fontWeight: 600,
              fontSize: { xs: '48px', md: '80px' },
              lineHeight: { xs: '48px', md: '80px' },
              color: '#141C0D',
            }}
          >
            Insights & Learning
          </Typography>

          <Typography
            sx={{
              fontFamily: 'Newsreader',
              fontWeight: 400,
              fontSize: { xs: '16px', md: '28px' },
              lineHeight: { xs: '16px', md: '28px' },
              color: '#141C0D',
              maxWidth: { xs: '220px', md: '742px' },
            }}
          >
            Explorando tendências Tech, um post por vez
          </Typography>

          <Button
            variant="contained"
            disableElevation
            onClick={() => navigate('/artigos')}
            sx={{
              mt: '16px',
              bgcolor: '#67A22D',
              borderRadius: '12px',
              padding: '0px 16px',
              width: '122px',
              height: '40px',
              fontFamily: 'Newsreader',
              fontWeight: 600,
              fontSize: '14px',
              color: '#FAFCF7',
              textTransform: 'none',
              '&:hover': { bgcolor: '#5a8d27' },
            }}
          >
            Começar a ler
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
