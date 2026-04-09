import { BrowserRouter } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
import MainRoute from './routes/MainRoute.jsx';

function App() {
  return (
    <BrowserRouter>
        <MainRoute />
    </BrowserRouter>
  );
}

export default App;
