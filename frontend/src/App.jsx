import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

import "./App.css";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { useUserContext } from "./useUserContext";
import { ProtectedRoute } from "./components/protecttedRoute";

function App() {
    const { user } = useUserContext();
    console.log(user);
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<Home />} />
                </Route>

                <Route
                    path="/login"
                    element={user !== null ? <Navigate to={"/"} /> : <Login />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
