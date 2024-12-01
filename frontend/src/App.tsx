import { Navigate, Route, Routes } from "react-router";
import { useAuth } from "./context/AuthContext";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
  const auth = useAuth();

  return (
    <main>
      {auth?.isAuthChecked && (
        <Routes>
          {/* Public route for authentication */}
          <Route path="/auth" element={<Auth />} />

          {/* Protected route for home */}
          <Route
            path="/"
            element={
              auth?.isLoggedIn && auth?.user ? (
                <Home />
              ) : (
                <Navigate to="/auth" replace />
              )
            }
          />

          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </main>
  );
}

export default App;
