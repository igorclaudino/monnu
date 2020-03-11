import React, { useState, FormEvent, useRef } from 'react';
import { toast } from 'react-toastify';
import BounceLoader from "react-spinners/BounceLoader";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import api from '../../services/api';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://npds.crateus.ufc.br/">
        Núcleo de Prática de Desenvolvimento de Software
    </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 0),
  },
}));

const Login: React.FC = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const passwordFieldRef = useRef<HTMLInputElement>(null);


  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/authenticate', { email, password })
      toast.success("Opa", {
        position: toast.POSITION.TOP_CENTER
      });
      setLoading(false);
      console.log(response.data);
    } catch (err) {
      setLoading(false);
      toast.error("Usuário ou senha inválidos", {
        position: toast.POSITION.TOP_CENTER,

      });
      setPassword("");
      if (passwordFieldRef && passwordFieldRef.current) {
        passwordFieldRef.current.focus();
      }
      console.log(err.response.data);
    }
  }


  return (
    <div>
      {loading ? <BounceLoader
        size={150}
        color="#ddd"
        loading={loading}
      /> :
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Monnu
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="E-mail"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Entrar
              </Button>

            </form>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      }
    </div>
  );
};

export default Login;
