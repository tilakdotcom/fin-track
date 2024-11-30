import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";
import { useAppSelector } from "./store/reduxHooks";

export default function App() {
  const { currentUser } = useAppSelector((s) => s.persistedReducer.user);
  return (
    <div className="overflow-x-hidden">
      {/* Navigation */}
      <NavBar />
      <Routes>
        
        {currentUser ? (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/expense" element={<AddExpense />} />
            <Route path="/income" element={<AddExpense />} />
          </>
        ) : (
          <>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<HomePage />} />
          </>
        )}
      </Routes>
    </div>
  );
}
