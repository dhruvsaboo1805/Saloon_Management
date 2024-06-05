import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Suspense, lazy } from "react";
import Loader from "./components/Loader";


const Dashboard = lazy(() => import("./pages/Dashboard"));
const PendingAppointment = lazy(() => import("./pages/PendingAppointment"))
const StocksManagement = lazy(() => import("./pages/StocksManagement"));
const SaloonCalender=  lazy(() => import("./pages/SaloonCalender"))
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const ConfirmedAppointments = lazy(() => import("./pages/ConfirmedAppointments"));
const CheckInAppointments = lazy(() => import("./pages/CheckInAppointments"));
const PaidAppointments = lazy(() => import("./pages/PaidAppointments"));

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
            <Route exact path="/pendingappointment" element={<PendingAppointment />}></Route>
            <Route exact path="/stockmanagement" element={<StocksManagement />}></Route>
            <Route exact path="/calendar" element={<SaloonCalender />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/signup" element={<SignUp />}></Route>
            <Route exact path="/ConfirmedAppointments" element={<ConfirmedAppointments />}></Route>
            <Route exact path="/CheckInAppointments" element={<CheckInAppointments />}></Route>
            <Route exact path="/PaidAppointments" element={<PaidAppointments />}></Route>
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
