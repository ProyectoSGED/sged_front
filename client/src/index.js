import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./components/App";

//PROVIDERS
import { Provider as UserAdminProvider } from "./context/UsersAdminContext";

ReactDOM.render(
  <BrowserRouter>
    <UserAdminProvider>
      <App />
    </UserAdminProvider>
  </BrowserRouter>,
  document.querySelector("#root")
);
