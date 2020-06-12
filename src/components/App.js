import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import HomeScreen from "../screens/HomeScreen";
import SelectShapeScreen from "../screens/SelectShapeScreen";
import ShapeScreen from "../screens/ShapeScreen";
import ContactScreen from "../screens/ContactScreen";
import SigninScreen from "../screens/SigninScreen";

const App = () => {
  return (
    <div className="app-container">
      <div className="container-fluid">
        <BrowserRouter>
          <div>
            <Header />
            <Route path="/" exact component={HomeScreen} />
            <Route path="/shapes" exact component={SelectShapeScreen} />
            <Route path="/shapes/list" exact component={ShapeScreen} />
            <Route path="/contact" exact component={ContactScreen} />
            <Route path="/signin" exact component={SigninScreen} />
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
