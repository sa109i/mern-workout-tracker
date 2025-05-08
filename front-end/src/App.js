// import './App.css';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import "./index.css"
import Home from "./pages/Home"
import Navbar from "./components/Navbar";
import Signup from './pages/Signup';
import Login from './pages/Login';
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const {user} = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route 
              path="/"
              element={user ? <Home /> : <Navigate to='/login' />}
            />
            <Route 
              path='/signup'
              element={!user ? <Signup /> : <Navigate to='/' />}
            />
            <Route 
              path='/login'
              element={!user ? <Login /> : <Navigate to='/' />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
