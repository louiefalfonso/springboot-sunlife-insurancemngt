import { Route, Routes, Navigate } from "react-router-dom";
import ProtectedRoute from "./services/ProtectedRoute"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ClientsPage from "./pages/ClientsPage";
import ClaimsPage from "./pages/ClaimsPage";
import PoliciesPage from "./pages/PoliciesPage";
import ClaimPage from "./pages/claims/[...id]";
import ClientPage from "./pages/clients/[...id]";
import PolicyPage from "./pages/policies/[...id]";
import LoansPage from "./pages/LoansPage";
import LoanPage from "./pages/loans/[...id]";

function App() {

   const token = localStorage.getItem("token"); 

  return (
    <>
      <main className="w-full min-h-screen bg-[#f3f4f6] ">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={ <ProtectedRoute token={token}><Dashboard /></ProtectedRoute>} />
          <Route path="/claims" element={ <ProtectedRoute token={token}><ClaimsPage /></ProtectedRoute>} />
          <Route path="/claims/:id" element={<ProtectedRoute token={token}><ClaimPage/></ProtectedRoute>} />

          <Route path="/clients" element={<ProtectedRoute token={token}><ClientsPage /></ProtectedRoute>} />
          <Route path="/clients/:id" element={<ProtectedRoute token={token}><ClientPage/></ProtectedRoute>} />

          <Route path="/policies" element={<ProtectedRoute token={token}><PoliciesPage /></ProtectedRoute>} />
          <Route path="/policies/:id" element={<ProtectedRoute token={token}><PolicyPage/></ProtectedRoute>} />

          <Route path="/loans" element={<ProtectedRoute token={token}><LoansPage/></ProtectedRoute>} />
          <Route path="/loans:id" element={<ProtectedRoute token={token}><LoanPage/></ProtectedRoute>} />
          

        </Routes>
      </main>
    </>
  );
}

export default App
