
import './App.css';



import AuthDetails from './pages/AuthDetails';
import Authentication from './pages/auth/signin';
import { Route, Routes } from 'react-router-dom';

function App() {
  return <>

  <Routes>
    <Route path='/' element={<Authentication/>} />
    <Route path='/welcome'  element={<AuthDetails/> }/>
   
  </Routes>
    
     
      {/* */}
  </>
}

export default App;
