import "./App.css";
import { Header } from "./components";
import { Cart, Home } from "./pages";
import "./scss/app.scss";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [pizza, setPizza] = useState(null);
  useEffect(() => {
    axios.get("http://localhost:3001/db.json").then(({data}) => {
      setPizza(data.pizzas);
    });
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home items={pizza} />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
