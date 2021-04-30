import './App.css';
import Homepage from './Pages/Homepage';
import AtmApiProvider from './Hooks/AtmApiContext';

function App() {
  return (
    <AtmApiProvider>
      <Homepage />
    </AtmApiProvider>
  );
}

export default App;
