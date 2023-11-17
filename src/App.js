// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScheduleAll from './pages/SchedulesAll';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SchedulesAdd from './pages/SchedulesAdd';
import Navbar from './components/Navbar';


function App() {
  return (
    <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Layout />}> */}
        <Route index element={<ScheduleAll />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/schedules" element={<ScheduleAll />} />
        <Route path="/schedules-add" element={<SchedulesAdd />} />
        {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
