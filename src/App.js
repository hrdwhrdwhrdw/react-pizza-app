import "./App.css";
import { Header } from "./components";
import { Cart, Home } from "./pages";
import "./scss/app.scss";
import { Routes, Route } from "react-router-dom";
// import { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";



import React, { Component } from "react";
import { setPizzas } from "./redux/actions/pizzas";

class App extends Component {
  componentDidMount() {
    axios.get("http://localhost:3000/db.json").then(({ data }) => {
      this.props.setPizzas(data.pizzas);
    });
  }
  render() {
    return (
      <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home items={this.props.items} />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.pizzas.items,
  };
};

const mapDispatchToProps = {
  setPizzas,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
