import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import { passportInit } from "./passport_p.js";

const app = express();

passportInit();

app.use(
    session({
        secret: "wfwefwefwef",
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());

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
        res.status(200).json({ ...req.user });
    }
});

app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile"] })
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
        res.status(401).json({ message: "already logged out" });
    } else {
        req.logout((err) => {
            if (err) {
                res.status(401).json({ message: "cannot loir" });
            } else {
                res.status(200).json({ message: "logged out succesfully" });
            }
        });
    }
});

app.listen(3000, () => {
    console.log("listening.....");
});
