'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/src/context/Auth';
import Button from '@/src/components/Button';
import { useAuth } from '@/src/hooks/useAuth';

export default function SignIn() {
  const [errorMessage, setErrorMessage] = React.useState<string | null>();
  const { setUser, user } = React.useContext(AuthContext);
  const router = useRouter();
  const { getProfile, login, loading } = useAuth();

  React.useEffect(() => {
    if (user) router.push('/dashboard');
    else {
      getProfile()
        .then((res) => {
          setUser(res.data);
          router.push('/dashboard');
        })
        .catch(() => {});
    }
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get('email') === '' || data.get('password') === '') {
      setErrorMessage('Please fill all fields');
      return;
    }
    login({
      email: data.get('email') as string,
      password: data.get('password') as string,
    })
      .then((res) => {
        setUser(res.data.user);
        router.push('/dashboard');
      })
      .catch((err) => {
        if (err.response) setErrorMessage(err.response.data.message);
        else setErrorMessage('Something went wrong');
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" data-testid="signin-text">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Username"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            id="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            loading={loading}
          >
            Sign In
          </Button>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        </Box>
      </Box>
    </Container>
  );
}
