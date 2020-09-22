import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./components/App";

//PROVIDERS
import { Provider as UserAdminProvider } from "./context/UsersAdminContext";
import { Provider as ShapesProvider } from "./context/ShapesContext";
import { Provider as ContactProvider } from "./context/ContactContext";
import { Provider as SessionProvider } from "./context/SessionContext";

ReactDOM.render(
  <BrowserRouter>
    <ShapesProvider>
      <UserAdminProvider>
        <ContactProvider>
          <SessionProvider>
            <App />
          </SessionProvider>
        </ContactProvider>
      </UserAdminProvider>
    </ShapesProvider>
  </BrowserRouter>,
  document.querySelector("#root")
);
