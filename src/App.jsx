import { BrowserRouter  as Router, Route, Routes } from "react-router";
import "./assets/styles/App.css";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Verification from "./pages/Validating";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/verification" element={<Verification />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
