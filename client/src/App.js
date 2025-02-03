import { useState } from 'react';
import DataProvider from './contextAPI/DataProvider';
import {BrowserRouter,Routes,Route, Navigate, Outlet} from 'react-router-dom'

// components
import Login from './components/account/Login.jsx';
import Home from './components/home/Home.jsx';
import Header from './components/header/Header.jsx';
import About from './components/about/About.jsx';


const PrivateRoute = ({isUserAthenticated, ...props}) => {
  return isUserAthenticated ?
    <>
      <Header/>
      <Outlet/>
    </>
    : <Navigate replace to='/login'/>
}

function App() {
  const [isUserAthenticated,setIsUserAuthenticated] = useState(false);

  return (
    <DataProvider>
      <BrowserRouter>
        
        <div style={{marginTop: 64}}> 
          <Routes>
            <Route path='/login' element={<Login setIsUserAuthenticated={setIsUserAuthenticated}/>}/>
            <Route path='/' element={<PrivateRoute isUserAthenticated={isUserAthenticated}/>}>
              <Route path='/' element={<Home/>}/>
              <Route path='/about' element={<About/>}/>
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
