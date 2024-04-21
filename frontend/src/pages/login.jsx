export function Login() {
    return (
        <div className="container">
            <button
                onClick={() =>
                    window.open("http://127.0.0.1:3000/auth/google", "_self")
                }
            >
                Google Login
            </button>
        </div>
    );
}
