import './App.css';
import './styles/globals.css'
import React, {useState} from 'react';
import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateGig from './views/CreateGig';
import EditGig from './views/EditGig';
import EditMusician from './views/EditMusician';
import AdminDashboard from './views/AdminDashboard';
import GigView from './views/GigView';
import MusicianDashboard from './views/MusicianDashboard';
import TimelineView from './views/TimelineView';
import AdminRoute from './components/AdminRoute';
import ProtectedRoute from './components/ProtectedRoute';
import ChartsView from './views/ChartsView';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import LoginPage from './views/LogInPage';
import RegisterMusician from './views/RegisterMusician';

function App() {

  const [allMusicians, setAllMusicians] = useState([])
  const [gig, setGig] = useState({})
  const [musician, setMusician] = useState({})
  const [allGigs, setAllGigs] = useState([])
  const [gigMusicians, setGigMusicians] = useState([])
  // const location = useLocation();
  // const changeBackground = !location.pathname.includes('AdminDashboard');



  return (
    <div className={'bg-imageScale'}>
      <div className='text-center' style={{fontFamily: 'Tektur'}}>
        <BrowserRouter>
          <div className='py-3 mx-4'>
            <NavBar/>
          </div>
          <Routes>
            <Route 
              path='/' 
              element={
                <LoginPage/>
              }/>
            <Route 
              path='/musicians/register' 
              element={
                <RegisterMusician/>
              }/>
            <Route 
              path='/AdminDashboard' 
              element={
                <AdminRoute>
                  <AdminDashboard
                    allMusicians={allMusicians} 
                    setAllMusicians={setAllMusicians} 
                    allGigs={allGigs} 
                    setAllGigs={setAllGigs}/>
                </AdminRoute>
              }/>
            <Route 
              path='/MusicianDashboard' 
              element={
                <ProtectedRoute>
                  <MusicianDashboard/>
                </ProtectedRoute>
              }/>
            <Route 
              path='/gigs/createGig' 
              element={
                <AdminRoute>
                  <CreateGig/>
                </AdminRoute>
              }/>
            <Route 
              path='/gigs/viewGig/:id' 
              element={
                <ProtectedRoute>
                  <GigView 
                    gig={gig} 
                    setGig={setGig} 
                    gigMusicians={gigMusicians} 
                    setGigMusicians={setGigMusicians}/>
                </ProtectedRoute>
              }/>
            <Route 
              path='/gigs/editGig/:id' 
              element={
                <AdminRoute>
                  <EditGig/>
                </AdminRoute>
              }/>
            <Route 
              path='/musicians/editMusician/:id' 
              element={
                <AdminRoute>
                  <EditMusician 
                    musician={musician} 
                    setMusician={setMusician}/>
                </AdminRoute>
              }/>
            <Route 
              path='/gigs/timeline/:id' 
              element={
                <ProtectedRoute>
                  <TimelineView/>
                </ProtectedRoute>
              }/>
            <Route
              path='/gigs/charts/:id'
              element={
                <ProtectedRoute>
                  <ChartsView/>
                </ProtectedRoute>
              }/>
          </Routes>
        </BrowserRouter>
        <Footer/>
        <ToastContainer/>
      </div>
    </div>
  );
}

export default App;
