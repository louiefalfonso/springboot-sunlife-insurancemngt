import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ClientsPage from "./pages/ClientsPage";
import ClaimsPage from "./pages/ClaimsPage";
import PoliciesPage from "./pages/PoliciesPage";
import ClaimPage from "./pages/claims/[...id]";

function App() {

  return (
    <>
      <main className="w-full min-h-screen bg-[#f3f4f6] ">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/claims" element={<ClaimsPage />} />
          <Route path="/claims/:id" element={<ClaimPage/>} />

          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/policies" element={<PoliciesPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App
