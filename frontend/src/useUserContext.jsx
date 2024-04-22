/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    async function logout() {
        try {
            const res = await fetch("http://localhost:3000/logout", {
                credentials: "include",
                method: "GET",
            });
            const d = await res.json();

            if (res.ok) {
                setUser(null);
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    useEffect(() => {
        async function fecthUser() {
            try {
                console.log("here");
                const res = await fetch("http://localhost:3000/user", {
                    credentials: "include",
                    method: "GET",
                });

                const data = await res.json();
                console.log("data = ", data);

                if (res.ok) {
                    setUser(data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fecthUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUserContext() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("User Context was used outside User Provider");
    }
    return context;
}
