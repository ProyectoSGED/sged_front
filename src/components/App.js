import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import HomeScreen from "../screens/HomeScreen";

const App = () => {
  return (
    <div>
      <div className="container-fluid">
        <BrowserRouter>
          <div>
            <Header />
            <Route path="/" exact component={HomeScreen} />
          </div>
        </BrowserRouter>
      </div>
      <div className="footerContainer">
        <Footer />
      </div>
    </div>
  );
};

export default App;
