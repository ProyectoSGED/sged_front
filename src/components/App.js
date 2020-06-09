import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import HomeScreen from "../screens/HomeScreen";
import DownloadScreen from "../screens/DownloadScreen";
import ContactScreen from "../screens/ContactScreen";

const App = () => {
  return (
    <div className="app-container">
      <div className="container-fluid">
        <BrowserRouter>
          <div>
            <Header />
            <Route path="/" exact component={HomeScreen} />
            <Route path="/shapes" exact component={DownloadScreen} />
            <Route path="/contact" exact component={ContactScreen} />
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
