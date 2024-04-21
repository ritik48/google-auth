import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

import "./App.css";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { useEffect, useState } from "react";

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fecthUser() {
            const res = await fetch("http://127.0.0.1:3000/user", {
                credentials: "include",
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                },
            });

            const data = await res.json();

            if (!res.ok) {
                console.log("authnetication failed");
            } else {
                setUser(data);
            }
        }
        fecthUser();
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={user ? <Home /> : <Navigate to={"/login"} />}
                />
                <Route
                    path="/login"
                    element={user ? <Navigate to={"/"} /> : <Login />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
