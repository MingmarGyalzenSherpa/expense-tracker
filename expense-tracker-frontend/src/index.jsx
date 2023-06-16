import React, { Children } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Login from "./routes/Login.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./assets/css/index.css";
import Signup from "./routes/Signup.jsx";
import Dashboard from "./routes/Dashboard.jsx";
import Home from "./routes/home.jsx";
import Expenses from "./routes/Expenses.jsx";
import Incomes from "./routes/Incomes.jsx";
const router = createBrowserRouter([
  // {

  //   path: "/login",
  //   element: <Login />,
  // },
  // {
  //   path: "/signup",
  //   element: <Signup />,
  // },
  // {
  //   path: "/",
  //   element: <App />,
  // },
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "",
            element: <Home />,
          },
          {
            path: "/dashboard/home",
            element: <Home />,
          },
          {
            path: "/dashboard/expenses",
            element: <Expenses />,
          },
          {
            path: "/dashboard/incomes",
            element: <Incomes />,
          },
        ],
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
