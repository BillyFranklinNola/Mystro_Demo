import './App.css';
import React, {useState} from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import LoginRegistration from './views/LoginRegistration';
import RegisterForm from './components/RegisterForm';
function App() {

  const [allMusicians, setAllMusicians] = useState([])
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/loginReg' element={<LoginRegistration/>}/>
          {/* <Route path='/musicians/list' element={<MusicianDashboard allMusicians={allMusicians} setAllMusicians={setAllMusicians}/>}/> */}
          {/* <Route path='/gigs/viewGig/:id' element={<ViewGig/>}/> */}
          {/* <Route path='/gigs/editGig/:id' element={<EditGig/>}/> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
