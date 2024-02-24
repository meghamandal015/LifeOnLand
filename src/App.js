import "./App.css";
import Pages from "./Components/Pages/Pages";
import { BrowserRouter } from "react-router-dom";
import AppContext from "./Components/AppContext/AppContext";

function App() {
  return (
    <BrowserRouter>
      <AppContext>
        <Pages></Pages>
      </AppContext>
    </BrowserRouter>
  );
}

export default App;
