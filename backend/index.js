import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import { passportInit } from "./passport_p.js";

const app = express();

app.use(
    session({
        secret: "wfwefwefwef",
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 60000, httpOnly: true },
    })
);

passportInit();
app.use(passport.initialize());
app.use(passport.authenticate("session"));

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);

app.get("/user", (req, res) => {
    if (!req.user) {
        res.status(401).json({ message: "not authenticated" });
    } else {
        console.log(req.user);
        res.status(200).json({ ...req.user });
    }
});

app.get(
    "/auth/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
        prompt: "select_account",
    })
);

app.get("/login/failed", (req, res) => {
    res.json({ success: false, message: "failed login" });
});

app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/login/failed",
        successRedirect: "http://localhost:5173",
    })
);

app.get("/logout", (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "already logged out" });
    } else res.status(200).json({ message: "logged out" });
});

app.listen(3000, () => {
    console.log("listening.....");
});
