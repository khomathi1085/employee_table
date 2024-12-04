import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddEmployee from "./pages/AddEmployee";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AddEmployee />} />
      </Routes>
    </Router>
  );
};

export default App;
