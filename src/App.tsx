import React from 'react';
import './App.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateDanceClass from './components/create_dance_class';
import ReadDanceClass from './components/read_dance_class';
import UpdateDanceClass from './components/update_dance_class';
import CreateLocation from './components/create_location';
import ReadLocation from './components/read_location';
import UpdateLocation from './components/update_location';
import ReadTeacher from './components/read_teacher';
import CreateTeacher from './components/create_teacher';
import UpdateTeacher from './components/update_teacher';
import ReadStyle from './components/read_style';
import CreateStyle from './components/create_style';
import UpdateStyle from './components/update_style';
import Navbar from './components/navbar';

function App() {
  return (
    <Router>
      <div className="main">
        <h2 className="main-header">Dance Class Finder</h2>
        <Navbar />
        <div>
          <Routes>
            <Route path='/' element={<ReadDanceClass />} />
            <Route path='/create-dance-class' element={<CreateDanceClass />} />
            <Route path='/read-dance-class' element={<ReadDanceClass />} />
            <Route path='/update-dance-class' element={<UpdateDanceClass />} />
            <Route path='/create-location' element={<CreateLocation />} />
            <Route path='/read-location' element={<ReadLocation />} />
            <Route path='/update-location' element={<UpdateLocation />} />
            <Route path='/read-teacher' element={<ReadTeacher />} />
            <Route path='/create-teacher' element={<CreateTeacher />} />
            <Route path='/update-teacher' element={<UpdateTeacher />} />
            <Route path='/read-style' element={<ReadStyle />} />
            <Route path='/create-style' element={<CreateStyle />} />
            <Route path='/update-style' element={<UpdateStyle />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
