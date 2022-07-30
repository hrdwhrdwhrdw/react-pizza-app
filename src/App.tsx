import { lazy, Suspense } from "react";
import "./App.css";
import { Header } from "./components/";
import { Home } from "./pages/";
import "./scss/app.scss";
import { Routes, Route } from "react-router-dom";
import { createContext } from "react";

const Cart = lazy(() => import(/* webpackChunkName: "Cart"*/"./pages/Cart"));
const NotFound = lazy(() => import(/* webpackChunkName: "NotFound"*/"./pages/NotFound/NotFound"));

export const SearchContext = createContext("");

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Suspense fallback={<div>"Идёт загрузка..."</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
