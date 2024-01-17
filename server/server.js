const cookieSession = require("cookie-session");
const express = require("express");
const session = require("express-session");
const cors = require("cors")
const passportSetup = require("./api/passport");
const passport = require("passport");
const authRoute = require("./routes/auth")
const scheduleRoute = require("./routes/schedule");
const dashboardRoute = require("./routes/dashboard");
const app = express();

app.use(
    cookieSession({name:"session", keys:["openreplay"], maxAge: 24 * 60 * 60 * 100,})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/auth", authRoute);
app.use("/schedule", scheduleRoute);
app.use("/dashboard", dashboardRoute);

//app.get('/message', (req, res) => {
//  res.json({ message: "Hello from server!"});
//});

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});
