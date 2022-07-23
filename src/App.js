import "./App.css";
import { Header } from "./components";
import { Cart, Home } from "./pages";
import "./scss/app.scss";
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
