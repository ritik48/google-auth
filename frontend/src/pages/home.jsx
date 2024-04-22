import { useUserContext } from "../useUserContext";

export function Home() {
    const { user, logout } = useUserContext();
    return (
        <div>
            <h1>Welcome, {user?.name}</h1>
            <button onClick={() => logout()}>Log out</button>
        </div>
    );
}
