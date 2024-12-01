import { Route, Routes, Navigate } from "react-router";
import { useAuth } from "./context/AuthContext";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";

function App() {
  const auth = useAuth();

  return (
    <main>
      <Routes>
        {/* Public route for authentication */}
        <Route path="/auth" element={<Auth />} />

        {/* Protected route for home */}
        <Route
          path="/"
          element={
            auth?.isLoggedIn && auth.user ? (
              <Home />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />

        {/* Catch-all route for 404 */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;
