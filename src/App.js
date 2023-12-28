
import { useEffect ,useState} from 'react';
import './App.css';
import Signup from './components/Signup';
import {Routes,Route, useNavigate} from "react-router-dom"
import Signin from './components/Signin';
import Profile from './components/Profile';
import Qrinfo from './components/Qrinfo';

function App() {
const navigate=useNavigate();
const [profile,setProfile]=useState();






  return (
    <div className="App">
        <Routes>
          <Route path='/' element={<Signup/>}/>
          <Route path='/signin' element={<Signin  setProfile={setProfile}/>}/>
          <Route path='/profile' element={<Profile profile={profile}/>}/>
           <Route path='/profile/:id' element={<Qrinfo />}/>
        </Routes>
     
    </div>
  );
}

export default App;
