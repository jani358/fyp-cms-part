import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import CreateUser from "./components/User/CreateUser";
import CreateTutorial from "./components/Tutorial/CreateTutorial";
import CreateCourse from "./components/Course/CreateCourse";
import CreateCategory from "./components/Category/CreateCategory";
import CreateActivity from "./components/Activity/CreateActivity";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-user" element={<CreateUser />} />
            <Route path="/create-tutorial" element={<CreateTutorial />} />
            <Route path="/create-course" element={<CreateCourse />} />
            <Route path="/create-category" element={<CreateCategory />} />
            <Route path="/create-activity" element={<CreateActivity />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
