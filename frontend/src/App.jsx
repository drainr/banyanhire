import { AuthProvider } from "./context/AuthContext";
import MainRoute from './routes/MainRoute.jsx';

function App() {
  return (
    <AuthProvider>
      <MainRoute />
    </AuthProvider>
  );
}

export default App;
