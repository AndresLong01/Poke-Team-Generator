const express = require("express");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 8080;

// const sessionObj = {
//   secret: 'This should be in your environment variables',
//   cookie: {
//     maxAge: 300000,
//     httpOnly: true,
//     secure: false,
//     sameSite: 'strict'
//   },
//   resave: false,
//   saveUninitialized: true,
// }

// app.use(session(sessionObj))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.listen(PORT, () => {
  console.log("Let's catch them all");
})