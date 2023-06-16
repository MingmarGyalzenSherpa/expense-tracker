const express = require("express");
const appConfig = require("./config/appConfig");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const authRoute = require("./routes/auth.routes");
const expenseRoute = require("./routes/expenses.routes");
const incomeRoute = require("./routes/income.routes");
const { User } = require("./models");

//init
const app = express();

//middleware
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    name: "auth-session-expense-tracker",
    secret: "this-is-secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

//routing
app.use("/", authRoute);

app.use("/expenses", expenseRoute);

app.use("/incomes", incomeRoute);

app.listen(appConfig.PORT, (req, res) => {
  console.log("Server running at port : " + appConfig.PORT);
});
