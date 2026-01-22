import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import CircularProgress from '@mui/material/CircularProgress';
import { useMutation } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authLogin } from '../api/auth';
import { isEmailValid } from '../utils/validation';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isValidEmail = useMemo(() => isEmailValid(email), [email]);
  const isFormValid = isValidEmail && password.length > 0;

  const loginMutation = useMutation({
    mutationFn: async () => {
      return await authLogin(email, password);
    },
    onSuccess: (data) => {
      localStorage.setItem('tech-blog:token', data.access_token);
      navigate('/artigos');
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      loginMutation.mutate();
    }
  };

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
          height: '48px',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ padding: { xs: '12px 16px', md: '12px 40px' } }}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: 'Newsreader',
                fontWeight: 700,
                fontSize: '18px',
                color: '#141712',
                cursor: 'pointer'
              }}
              onClick={() => navigate('/')}
            >
              TechBlog
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>

      <Box 
        component="form" 
        onSubmit={handleLogin}
        sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center',
          padding: { xs: '20px 16px', md: '20px 160px' }
        }}
      >
        <Box sx={{ 
          width: '100%', 
          maxWidth: { xs: '358px', md: '610px' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          
          <Typography
            sx={{
              fontFamily: 'Newsreader',
              fontWeight: 600,
              fontSize: '32px',
              lineHeight: '40px',
              textAlign: 'center',
              color: '#141C0D',
              mb: '32px'
            }}
          >
            Bem-vindo de volta
          </Typography>

          <Box sx={{ width: '100%', mb: '16px' }}>
            <InputLabel sx={{ 
              fontFamily: 'Newsreader', 
              fontWeight: 500, 
              fontSize: '16px', 
              color: '#141C0D', 
              mb: '8px' 
            }}>
              Email
            </InputLabel>
            <TextField
              fullWidth
              placeholder="Email"
              variant="standard"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{ 
                disableUnderline: true,
                sx: { 
                  bgcolor: '#EDF2E8', 
                  borderRadius: '12px', 
                  padding: '12px 16px',
                  fontFamily: 'Newsreader',
                  fontSize: '16px',
                  color: '#141C0D',
                  '& input::placeholder': { color: '#73964F', opacity: 1 }
                } 
              }}
            />
          </Box>

          <Box sx={{ width: '100%', mb: loginMutation.isError ? '8px' : '24px' }}>
            <InputLabel sx={{ 
              fontFamily: 'Newsreader', 
              fontWeight: 500, 
              fontSize: '16px', 
              color: '#141C0D', 
              mb: '8px' 
            }}>
              Senha
            </InputLabel>
            <TextField
              fullWidth
              type="password"
              placeholder="Senha"
              variant="standard"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{ 
                disableUnderline: true,
                sx: { 
                  bgcolor: '#EDF2E8', 
                  borderRadius: '12px', 
                  padding: '12px 16px',
                  fontFamily: 'Newsreader',
                  fontSize: '16px',
                  color: '#141C0D',
                  '& input::placeholder': { color: '#73964F', opacity: 1 }
                } 
              }}
            />
          </Box>

          {loginMutation.isError && (
            <Box sx={{ width: '100%', mb: '16px', textAlign: 'left' }}>
              <Typography sx={{ 
                color: '#FF0000', 
                fontSize: '14px', 
                fontFamily: 'Newsreader' 
              }}>
                E-mail ou senha incorreto, tente novamente
              </Typography>
            </Box>
          )}

          <Button
            fullWidth
            type="submit"
            variant="contained"
            disableElevation
            disabled={!isFormValid || loginMutation.isPending}
            sx={{
              bgcolor: '#67A22D',
              borderRadius: '12px',
              height: '40px',
              fontFamily: 'Newsreader',
              fontWeight: 600,
              fontSize: '14px',
              color: '#FAFCF7',
              textTransform: 'none',
              '&:hover': { bgcolor: '#5a8d27' },
              '&.Mui-disabled': { bgcolor: '#A5C68A', color: '#FAFCF7' }
            }}
          >
            {loginMutation.isPending ? (
              <CircularProgress size={24} sx={{ color: '#FAFCF7' }} />
            ) : (
              'Entrar'
            )}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}