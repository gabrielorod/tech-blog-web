import { Box, Button, Typography, Container, AppBar, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '800px', 
      height: '100vh', 
      width: '100%', 
      bgcolor: '#FFFFFF' 
    }}>
      <AppBar 
        position="static" 
        elevation={0} 
        sx={{ 
          bgcolor: '#FFFFFF', 
          borderBottom: '1px solid #E6E8EB',
          height: '65px',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between', padding: { xs: '12px 16px', md: '12px 40px' } }}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: 'Newsreader',
                fontWeight: 700,
                fontSize: '18px',
                color: '#141712',
                cursor: 'pointer'
              }}
            >
              TechBlog
            </Typography>

            <Button
              onClick={() => navigate('/login')}
              sx={{
                fontFamily: 'Newsreader',
                fontWeight: 600,
                fontSize: '14px',
                color: '#67A22D',
                textTransform: 'none',
                minWidth: '44px'
              }}
            >
              Entrar
            </Button>
          </Toolbar>
        </Container>
      </AppBar>

      <Box sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        padding: { xs: '20px 16px', md: '20px 160px' }
      }}>
        <Box sx={{ 
          textAlign: 'center', 
          maxWidth: '960px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px'
        }}>
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
              maxWidth: { xs: '220px', md: '742px' }
            }}
          >
            Explorando tendências Tech, um post por vez
          </Typography>

          <Button
            variant="contained"
            disableElevation
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
              '&:hover': { bgcolor: '#5a8d27' }
            }}
          >
            Começar a ler
          </Button>
        </Box>
      </Box>
    </Box>
  );
}