const CLIENT_ID =
    "307119935292-7fl7n8aphhqvelclo40t3ckku48o9vv8.apps.googleusercontent.com";
const CLIENT_SECRET = "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";

import passport from "passport";
import { Strategy } from "passport-google-oauth20";

export function passportInit() {
    passport.use(
        new Strategy(
            {
                clientID: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                callbackURL: "http://localhost:3000/auth/google/callback",
            },
            function (accessToken, refreshToken, profile, cb) {
                cb(null, {
                    name: profile.displayName,
                    email: profile.emails[0].value,
                });
            }
        )
    );

    passport.serializeUser(function (user, cb) {
        process.nextTick(function () {
            return cb(null, {
                name: user.name,
                email: user.email,
            });
        });
    });

    passport.deserializeUser(function (user, cb) {
        process.nextTick(function () {
            return cb(null, user);
        });
    });
}
