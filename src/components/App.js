import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Header from "./Header";

const App = () => {
  return (
    <div className="container-fluid">
      <BrowserRouter>
        <div>
          <Header />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
