import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";
import { Provider } from "react-redux";
import { store } from "./store/store"

export default function App() {
  return (
    <div className="overflow-x-hidden">
      <BrowserRouter>
        <Provider store={store}>
          {/* Navigation */}
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/expense" element={<AddExpense />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    </div>
  );
}
