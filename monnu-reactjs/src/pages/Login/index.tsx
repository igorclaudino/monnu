import React, { useState, useRef, FormEvent, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Copyright from "./Copyright";
import {
  Snackbar,
  CircularProgress,
  Paper,
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container
} from "@material-ui/core";
import Alert, { Color } from "@material-ui/lab/Alert";

import usePersistedState from "../../utils/usePersistedState";
import useStyles from "./styles";
import api from "../../services/api";

interface SnackbarController {
  open: boolean;
  type: Color;
  message: String;
}

interface LoggedUser {
  user?: any;
  token?: string;
}

const Login: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackController, setSnackController] = useState<SnackbarController>({
    open: false,
    type: "info",
    message: ""
  });

  useEffect(() => {
    async function getLoggedUser() {
      const fromStorage = await localStorage.getItem("@monnu/loggedUser");
      if (fromStorage) history.push("/home");
    }
    getLoggedUser();
  }, [history]);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackController({
      open: false,
      type: "info",
      message: ""
    });
  };

  const passwordFieldRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    try {
      const response = await api.post("/authenticate", { email, password });
      await localStorage.setItem(
        "@monnu/loggedUser",
        JSON.stringify(response.data)
      );
      history.push("/home");
    } catch (err) {
      console.log(err);
      setLoading(false);
      setSnackController({
        message: "Usuário ou senha inválidos",
        type: "error",
        open: true
      });
      setPassword("");
      if (passwordFieldRef && passwordFieldRef.current) {
        passwordFieldRef.current.focus();
      }
      console.log(err.response.data);
    }
  }

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper elevation={3}>
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
                onChange={e => setEmail(e.target.value)}
                value={email}
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
                onChange={e => setPassword(e.target.value)}
                value={password}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={loading}
                className={classes.submit}
              >
                {loading ? <CircularProgress color="inherit" /> : "Entrar"}
              </Button>
            </form>
            <Box mt={5}>
              <Copyright />
            </Box>
          </div>
        </Paper>
      </Container>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        key={`top,center`}
        open={snackController.open}
        onClose={handleClose}
        autoHideDuration={6000}
      >
        <Alert severity={snackController.type}>{snackController.message}</Alert>
      </Snackbar>
    </>
  );
};

export default Login;
