import InputFieldContainer from "./components/common/InputField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router";
import { useState } from "react";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
