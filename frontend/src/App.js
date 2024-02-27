import './App.css';
import RouteComponent from './components/routes/RoutesComponent';
import {useState } from 'react';
import AuthContext from './context/authContext';
import HeaderComponent from './components/header/HeaderComponent';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <div className="App">
      <AuthContext.Provider value={{currentUser, setCurrentUser}}>
        <HeaderComponent />
        <RouteComponent />
      </AuthContext.Provider>
    </div>
  );
}

export default App;
