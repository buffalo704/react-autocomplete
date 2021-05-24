import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Autocomplete from "./components/Autocomplete";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Autocomplete />
      </header>
    </div>
  );
}

export default App;
