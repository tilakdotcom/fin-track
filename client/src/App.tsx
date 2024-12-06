import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/Expense";
import { useAppSelector } from "./store/reduxHooks";
import Income from "./pages/IncomePage";
import AddExAndIn from "./pages/AddExAndIn";

export default function App() {
  const { currentUser } = useAppSelector((s) => s.persistedReducer?.user);
  return (
    <div className="overflow-x-hidden">
      {/* Navigation */}
      <NavBar />
      <Routes>
        {currentUser ? (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/expense" element={<AddExpense />} />
            <Route path="/income" element={<Income />} />
            <Route path="/add" element={<AddExAndIn />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </>
        ) : (
          <>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </div>
  );
}
