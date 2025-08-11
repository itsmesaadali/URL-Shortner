import { HomePage } from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import { NotFound } from "./pages/NotFound";
import { AppLayout } from "./components/Layout/AppLayout";

function App() {
  return (
    <>
    <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "var(--surface)",
            color: "var(--text)",
            borderRadius: "0.5rem",
            boxShadow: "0 6px 20px rgba(3,10,25,0.06)",
          },
        }}
      />
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
