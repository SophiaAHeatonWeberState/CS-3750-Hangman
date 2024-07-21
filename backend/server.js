const express = require('express');
const app = express();
const session = require("express-session");
//const MongoStore = require("connect-mongo");
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config({ path : "./config.env"});
<<<<<<< HEAD
=======

>>>>>>> ed8577e6c0496361014334b1be560cc1ca3a4c0f
app.use(
  cors({
      origin: "http://localhost:3000",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
      optionsSuccessStatus: 204,
      allowedHeaders: ["Content-Type", "Authorization"],
  })
);

<<<<<<< HEAD
const dbo = require("./db/conn");

app.use(express.json());

=======
app.use(express.json());

const dbo = require("./db/conn");

>>>>>>> ed8577e6c0496361014334b1be560cc1ca3a4c0f
app.use(require("./routes/data"));
app.use(require("./routes/session"));

const port = process.env.PORT;

<<<<<<< HEAD

=======
>>>>>>> ed8577e6c0496361014334b1be560cc1ca3a4c0f
// once sophie has the mongo side figured out this should work

// app.use(session(
//   {
//       secret: 'keyboard cat',
//       saveUninitialized: false, //dont create a session until something is stored
//       resave: false, //dont save session if unmodified
//       store: MongoStore.create({
//           mongoUrl: process.env.ATLAS_URI
//       })
//   }
// ));

// Start the server after database connection
dbo.connectToServer((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  }

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
