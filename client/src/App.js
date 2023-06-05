import './App.css';
import React, {useState} from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import LoginRegistration from './views/LoginRegistration';
import CreateGig from './views/CreateGig';
import MusicianGigList from './components/MusicianGigList';
import EditGig from './views/EditGig';
import EditMusician from './views/EditMusician';
import AdminDashboard from './views/AdminDashboard';

function App() {

  const [allMusicians, setAllMusicians] = useState([])
  const [allGigs, setAllGigs] = useState([])
  const [musicianGigs, setMusicianGigs] = useState([])

  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/loginReg' element={<LoginRegistration/>}/>
          <Route path='/AdminDashboard' element={<AdminDashboard allMusicians={allMusicians} setAllMusicians={setAllMusicians} allGigs={allGigs} setAllGigs={setAllGigs}/>}/>
          <Route path='/MusicianDashboard' element={<MusicianGigList musicianGigs={musicianGigs} setMusicianGigs={setMusicianGigs}/>}/>
          <Route path='/gigs/createGig' element={<CreateGig/>}/>
          <Route path='/gigs/editGig/:id' element={<EditGig/>}/>
          <Route path='/musicians/editMusician/:id' element={<EditMusician/>}/>
          {/* // <Route path='/gigs/viewGig/:id' element={<ViewGig/>}/> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
