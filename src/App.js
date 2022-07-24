import "./App.css";
import { Header } from "./components";
import { Cart, Home } from "./pages";
import "./scss/app.scss";
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound/NotFound";
import { useState } from "react";
import { createContext } from "react";

export const SearchContext = createContext("");

function App() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
