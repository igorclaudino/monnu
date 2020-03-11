import React from "react";
import { ThemeProvider } from "@material-ui/core";

import theme from "./styles/themes/monnu-theme";

import Routes from "./routes";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
}

export default App;
