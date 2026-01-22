import { AppBar, Toolbar, Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

interface HeaderProps {
  showLogout?: boolean;
}

export default function Header({ showLogout = true }: HeaderProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('tech-blog:token');
    navigate('/');
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: '#FFFFFF',
        borderBottom: '1px solid #E6E8EB',
        height: '65px',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 5 } }}>
          <Typography
            variant="h6"
            sx={{
              fontFamily: 'Newsreader',
              fontWeight: 700,
              color: '#141712',
              cursor: 'pointer',
              userSelect: 'none',
            }}
            onClick={() => navigate('/')}
          >
            TechBlog
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {showLogout ? (
              <Button
                onClick={handleLogout}
                startIcon={<LogoutIcon />}
                sx={{
                  fontFamily: 'Newsreader',
                  pr: 0,
                  fontWeight: 600,
                  fontSize: '14px',
                  color: '#141712',
                  bgcolor: '#EDF2E8',
                  textTransform: 'none',
                }}
              />
            ) : (
              <Button
                onClick={() => navigate('/login')}
                sx={{
                  fontFamily: 'Newsreader',
                  fontWeight: 600,
                  fontSize: '14px',
                  color: '#67A22D',
                  textTransform: 'none',
                }}
              >
                Entrar
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
