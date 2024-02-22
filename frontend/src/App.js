import './App.css';
import RouteComponent from './components/routes/RoutesComponent';
import NavBar from './components/navbar/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar />
      <RouteComponent />
    </div>
  );
}

export default App;
