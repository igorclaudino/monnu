import React, { useState, useRef, FormEvent } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { useHistory } from "react-router-dom";

import api from "../../services/api";
import { Snackbar, CircularProgress, Paper } from "@material-ui/core";
import Alert, { Color } from "@material-ui/lab/Alert";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://npds.crateus.ufc.br/">
        Núcleo de Prática de Desenvolvimento de Software
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2)
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 0)
  }
}));

interface SnackbarController {
  open: boolean;
  type: Color;
  message: String;
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
      // setSnackController({
      //   message: "Opa",
      //   type: "success",
      //   open: true
      // });
      // setLoading(false);
      // console.log(response.data);
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
