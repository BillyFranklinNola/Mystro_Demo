import './App.css';
import React, {useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginRegistration from './views/LoginRegistration';
import CreateGig from './views/CreateGig';
import EditGig from './views/EditGig';
import EditMusician from './views/EditMusician';
import AdminDashboard from './views/AdminDashboard';
import GigView from './views/GigView';
import MusicianDashboard from './views/MusicianDashboard';
import TimelineView from './views/TimelineView';


function App() {

  const [allMusicians, setAllMusicians] = useState([])
  const [gig, setGig] = useState({})
  const [musisican, setMusician] = useState({})
  const [allGigs, setAllGigs] = useState([])
  const [gigMusicians, setGigMusicians] = useState([])



  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginRegistration/>}/>
          <Route path='/AdminDashboard' element={<AdminDashboard allMusicians={allMusicians} setAllMusicians={setAllMusicians} allGigs={allGigs} setAllGigs={setAllGigs}/>}/>
          <Route path='/MusicianDashboard' element={<MusicianDashboard/>}/>
          <Route path='/gigs/createGig' element={<CreateGig/>}/>
          <Route path='/gigs/viewGig/:id' element={<GigView gig={gig} setGig={setGig} gigMusicians={gigMusicians} setGigMusicians={setGigMusicians}/>}/>
          <Route path='/gigs/editGig/:id' element={<EditGig/>}/>
          <Route path='/musicians/editMusician/:id' element={<EditMusician musisican={musisican} setMusician={setMusician}/>}/>
          <Route path='/gigs/timeline/:id' element={<TimelineView/>}/>
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </div>
  );
}

export default App;
