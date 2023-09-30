import "./App.css";
import UploadCSVPage from "./pages/auth/uploadCSVPage";
import EnterPassword from "./pages/auth/enter-password";
import Login from "./pages/auth/login";
import Dashboard from "./pages/dashboard";
import Attendance from "./pages/dashboard/attendance";
import Home from "./pages/dashboard/dashboard";
import Profile from "./pages/dashboard/profile";
import SubUnits from "./pages/dashboard/sub-units";
import Users from "./pages/dashboard/users";
import { AuthGuard } from "./utils";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <AuthGuard>
      <>
        <Routes>
          <Route path="/" index element={<Login />} />
          <Route path="uploadCSVPage" element={<UploadCSVPage />} />
          <Route path="/enter-password" element={<EnterPassword />} />

          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Home />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="profile" element={<Profile />} />
            <Route path="sub-units" element={<SubUnits />} />
            <Route path="users" element={<Users />} />
          </Route>
        </Routes>
      </>
    </AuthGuard>
  );
}

export default App;
