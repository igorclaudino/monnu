import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { green } from "@material-ui/core/colors";
import { Link } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 275,
    margin: 10
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
}));

interface Props {
  app: any;
}
const AppCard: React.FC<Props> = ({ app }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {app.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          <Link
            target="_blank"
            href={`${app.url}:${app.port}`}
          >{`${app.url}:${app.port}`}</Link>
        </Typography>
        <Typography variant="body2" component="p">
          <HighlightOffIcon color="error" />
          <CheckCircleIcon style={{ color: green[500] }} />
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Mais informações</Button>
      </CardActions>
    </Card>
  );
};

export default AppCard;
