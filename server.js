const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const sequelize = require("./config/db");
const session = require('express-session');
const flash = require('connect-flash');
const app = express();

app.use(express.static(path.join(__dirname, "public")));

// middlewares
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(flash());
app.use(session({
  key:'user_id',
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { /* secure: true  */}
}))
const authMiddleware = require('./middleware/authmiddleware');
//app.use(authMiddleware);

// setting view engine
app.set("view engine", "ejs");

// testing database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

// syncing sequelize so that it creates table as per model if not table does`nt exist..
sequelize.sync();

// importing routes
const todoRoutes = require("./routes/todo");
const authRoutes = require('./routes/authRoutes');
const indexRoutes = require('./routes/indexRoutes');
const votingRouter = require('./routes/voutingRoute');

app.use("/todo",authMiddleware, todoRoutes);
app.use('/auth',authMiddleware,authRoutes);
app.use('/',indexRoutes);
app.use('/vote',authMiddleware,votingRouter);


// app.get("/", (req, res) => {
 
//   res.render("index.ejs");
// });


app.listen(5000, function() {
  console.log(`Server listening on port 3000`);
});
