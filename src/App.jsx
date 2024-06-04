import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Suspense, lazy } from "react";
import Loader from "./components/Loader";
import Appointment from "./pages/Appointment";
import StocksManagement from "./pages/StocksManagement";

const Dashboard = lazy(() => import("./pages/Dashboard"));

function App() {
  return (
    <div className="App">
      <Sidebar />
      <div className="main-content">
        <div className="app-navbar">
          <Navbar />
        </div>
        <Suspense fallback = {<Loader />}>
          <Routes>
            <Route exact path="/" element={<Dashboard />}></Route>
            <Route exact path="/appointment" element={<Appointment />}></Route>
            <Route exact path="/stockmanagement" element={<StocksManagement />}></Route>
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
