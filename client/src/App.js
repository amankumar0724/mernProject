import logo from './logo.svg';
import './App.css';
import DataProvider from './contextAPI/DataProvider';
import {BrowserRouter,Routes,Route} from 'react-router-dom'

// components
import Login from './components/account/Login.jsx';
import Home from './components/home/Home.jsx';

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <div style={{marginTop: 64}}> 
          <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/' element={<Home/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
