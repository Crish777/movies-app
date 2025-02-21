import { BrowserRouter as Router, Route, Routes } from "react-router";
import "./assets/styles/App.css";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Verification from "./pages/Validating";
import MainLayout from "./layouts/MainLayout";
import MovieDetail from "./pages/MovieDetail";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path='/auth' element={<Auth />} />
            <Route path='/verification' element={<Verification />} />
            <Route path='/movie/:movieid' element={<MovieDetail />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
