import './App.css';
import RouteComponent from './components/routes/RoutesComponent';
import NavBar from './components/navbar/NavBar';
import {useState } from 'react';
import AuthContext from './context/authContext';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <div className="App">
      <AuthContext.Provider value={{currentUser, setCurrentUser}}>
        <NavBar />
        <RouteComponent />
      </AuthContext.Provider>
    </div>
  );
}

export default App;
