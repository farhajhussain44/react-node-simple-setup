import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from "./components/user/login";
import RegsiterPage from "./components/user/register";
import Chat from "./components/chat"



function App() {
  return (

    <Router>
      <React.Fragment>
        <Routes>
          <Route
            exact
            path={'/'}
            element={<LoginPage />}
          />
          <Route
            exact
            path={'/login'}
            element={<LoginPage />}
          />
          <Route
            exact
            path={'/regsiter'}
            element={<RegsiterPage />}
          />
          <Route
            exact
            path={'/chat'}
            element={<Chat />}
          />
        </Routes>
      </React.Fragment>
    </Router>

  );
}

export default App;
