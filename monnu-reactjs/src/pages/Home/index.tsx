import React, { useState, useEffect } from "react";
import {
  CssBaseline,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Container,
  Grid,
  Dialog,
  List,
  ListItem,
  ListItemText,
  Divider,
  Slide,
  TextField,
  CircularProgress
} from "@material-ui/core";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import AccountCircle from "@material-ui/icons/AccountCircle";
import CloseIcon from "@material-ui/icons/Close";
import useStyles from "./styles";
import usePersistedState from "../../utils/usePersistedState";
import { useHistory } from "react-router-dom";

import AppCard from "../../components/AppCard";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import api from "../../services/api";

const Transition = React.forwardRef<unknown, TransitionProps>(
  function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  }
);

interface LoggedUser {
  user?: any;
  token?: string;
}

interface App {
  name: string;
  url: string;
  port: string;
  isOnline?: boolean;
}

export default function Home() {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openDialog, setOpenDialog] = useState(false);
  const [apps, setApps] = useState<App[]>([]);
  const [appName, setAppName] = useState("");
  const [appURL, setAppURL] = useState("");
  const [appPort, setAppPort] = useState("");
  const [loggedUser, setLoggedUser] = useState<LoggedUser>({});

  useEffect(() => {
    getLoggedUser();
  }, []);

  useEffect(() => {
    getAllApps();
  }, [loggedUser]);

  async function getLoggedUser() {
    const fromStorage = localStorage.getItem("@monnu/loggedUser");
    if (fromStorage) {
      setLoggedUser(JSON.parse(fromStorage));
      console.log(loggedUser);
    } else history.replace("/");
  }

  async function getAllApps() {
    try {
      const response = await api.get("/apps", {
        headers: {
          Authorization: `Bearer ${loggedUser.token}`
        }
      });
      setApps(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSaveApp = async () => {
    try {
      await api.post(
        "/apps",
        { name: appName, url: appURL, port: appPort },
        {
          headers: {
            Authorization: `Bearer ${loggedUser.token}`
          }
        }
      );
      getAllApps();
      handleCloseDialog();
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    localStorage.removeItem("@monnu/loggedUser");
    history.replace("/");
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setAppName("");
    setAppURL("");
    setAppPort("");
    setOpenDialog(false);
  };
  return (
    <div style={{ flexGrow: 1 }}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Button>
            <EqualizerIcon className={classes.menuButton} />
            <Typography variant="h6" className={classes.title}>
              Monnu
            </Typography>
          </Button>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle className={classes.menuButton} />
            <Typography variant="h6">
              {loggedUser.user &&
                loggedUser.user.name.split(" ")[0] +
                  " " +
                  loggedUser.user.name.split(" ")[
                    loggedUser.user.name.split(" ").length - 1
                  ]}
            </Typography>
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleSignOut}>Sair</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Container>
        <Button
          color="primary"
          variant="contained"
          className={classes.button}
          onClick={handleClickOpen}
        >
          Nova aplicação
        </Button>
        <div className={classes.content}>
          {apps.map((app, index) => (
            <AppCard app={app} key={index} />
          ))}
        </div>
      </Container>
      <Dialog
        fullScreen
        open={openDialog}
        onClose={handleCloseDialog}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseDialog}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.titleDialog}>
              Nova aplicação
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSaveApp}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Container component="main" maxWidth="sm">
          <form noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="app_name"
              label="Nome da aplicação"
              name="text"
              autoFocus
              onChange={e => setAppName(e.target.value)}
              value={appName}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="url"
              label="URL da API"
              type="text"
              id="app_url"
              onChange={e => setAppURL(e.target.value)}
              value={appURL}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="port"
              label="Porta da API"
              type="text"
              id="app_port"
              onChange={e => setAppPort(e.target.value)}
              value={appPort}
            />
          </form>
        </Container>
      </Dialog>
    </div>
  );
}
