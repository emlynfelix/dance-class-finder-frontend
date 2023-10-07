import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateDanceClass from './components/create_dance_class';
import ReadDanceClass from './components/read_dance_class';
import UpdateDanceClass from './components/update_dance_class';
import CreateLocation from './components/create_location';
import ReadLocation from './components/read_location';
import UpdateLocation from './components/update_location';
import ReadTeacher from './components/read_teacher';
import CreateTeacher from './components/create_teacher';

function App() {
  return (
    <Router>
      <div className="main">
        <h2 className="main-header">Dance Class Finder</h2>
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
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
