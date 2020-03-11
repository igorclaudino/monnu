import React from 'react';
import GlobalStyle from './styles/global';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <GlobalStyle />
      <Login />
    </div>
  );
}


export default App;
