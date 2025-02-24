import { useState } from 'react';
import DataProvider from './contextAPI/DataProvider';
import {BrowserRouter,Routes,Route, Navigate, Outlet} from 'react-router-dom'

// components
import Login from './components/account/Login.jsx';
import Home from './components/home/Home.jsx';
import Header from './components/header/Header.jsx';
import About from './components/about/About.jsx';
import Contact from './components/contacts/Contact.jsx'
import CreatePost from './components/create blog/CreatePost.jsx';
import UpdatePost from './components/create blog/UpdatePost.jsx';
import ShowBlog from './components/show blog/ShowBlog.jsx';
import Profile from './components/profile/Profile.jsx';



// const PrivateRoute = ({isUserAthenticated, ...props}) => {
//   return isUserAthenticated ?
//     <>
//       <Header/>
//       <Outlet/>
//     </>
//     : <Navigate replace to='/login'/>
// }
const PrivateRoute = ({ isUserAthenticated, setIsUserAuthenticated }) => {
  return isUserAthenticated ? (
    <>
      <Header setIsUserAuthenticated={setIsUserAuthenticated} />
      <Outlet />  
    </>
  ) : (
    <Navigate replace to='/login' />
  );
};

function App() {
  const [isUserAthenticated, setIsUserAuthenticated] = useState(false);

  return (
    <DataProvider>
      <BrowserRouter>
        <div style={{ marginTop: 64 }}>
          <Routes>
            <Route path='/login' element={<Login setIsUserAuthenticated={setIsUserAuthenticated} />} />

            <Route path='/' element={<PrivateRoute isUserAthenticated={isUserAthenticated} setIsUserAuthenticated={setIsUserAuthenticated} />}>
              <Route path='/' element={<Home />} />
            </Route>

            <Route path='/about' element={<PrivateRoute isUserAthenticated={isUserAthenticated} setIsUserAuthenticated={setIsUserAuthenticated} />}>
              <Route path='/about' element={<About />} />
            </Route>

            <Route path='/create-post' element={<PrivateRoute isUserAthenticated={isUserAthenticated} setIsUserAuthenticated={setIsUserAuthenticated} />}>
              <Route path='/create-post' element={<CreatePost />} />
            </Route>

            <Route path='/show-blog/:id' element={<PrivateRoute isUserAthenticated={isUserAthenticated} setIsUserAuthenticated={setIsUserAuthenticated} />}>
              <Route path='/show-blog/:id' element={<ShowBlog />} />
            </Route>

            <Route path='/update-post/:id' element={<PrivateRoute isUserAthenticated={isUserAthenticated} setIsUserAuthenticated={setIsUserAuthenticated} />}>
              <Route path='/update-post/:id' element={<UpdatePost />} />
            </Route>

            <Route path='/contact' element={<PrivateRoute isUserAthenticated={isUserAthenticated} setIsUserAuthenticated={setIsUserAuthenticated} />}>
              <Route path='/contact' element={<Contact />} />
            </Route>

            <Route path='/profile' element={<PrivateRoute isUserAthenticated={isUserAthenticated} setIsUserAuthenticated={setIsUserAuthenticated} />}>
              <Route path='/profile' element={<Profile />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
