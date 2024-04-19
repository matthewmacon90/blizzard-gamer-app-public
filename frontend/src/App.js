import './App.css';
import RouteComponent from './components/routes/RoutesComponent';
import {useState, useEffect } from 'react';
import AuthContext from './context/authContext';
import HeaderComponent from './components/header/HeaderComponent';
import Api from './api';
import Footer from './components/footer/Footer';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function checkToken() {
      try{
        const token = sessionStorage.getItem('token');
        if(!token) return;
        const result = await Api.verifyToken(token);
        if(result.message === 'Token verified') return setCurrentUser(token);
      } catch (err) {
      }
    }
    checkToken();
  },[]);

  return (
    <div className="App">
      <AuthContext.Provider value={{currentUser, setCurrentUser}}>
        <HeaderComponent />
        <RouteComponent />
      </AuthContext.Provider>
      <Footer />
    </div>
  );
}

export default App;
