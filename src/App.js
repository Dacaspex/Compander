import './App.css';
import Board from './Components/Board/Board';
import CreateButton from './Components/CreateButton';
import Navbar from './Components/Navbar';
import PlayerSelector from './Components/PlayerSelector';

const App = () => {
  return (
    <div className="app">
      <Navbar/>
      <PlayerSelector/>
      <Board/>

      <CreateButton/>
    </div>
  );
}

export default App;
