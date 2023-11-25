import './App.css';
import SignUp from './components/SignUp/SignUp';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
