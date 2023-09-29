import Navbar from './features/navbar';
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './features/authentication/Login';

const App = () => {
  return ( 
  <div>
    <Navbar/>
    <Router>
      <Routes>
        <Route path='/' element={<Login/> }/>
      </Routes>
    </Router>
  </div>
  );
}
 
export default App;