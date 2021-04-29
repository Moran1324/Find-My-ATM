import './App.css';
import Homepage from './Pages/Homepage';

const apiUrl = 'https://data.gov.il/api/3/action/datastore_search?resource_id=b9d690de-0a9c-45ef-9ced-3e5957776b26';

function App() {
  return (
    <Homepage />
  );
}

export default App;
