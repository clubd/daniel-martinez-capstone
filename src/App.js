import "./App.css";
import LoginPage from "./pages/LoginPage/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import HomePage from "./pages/HomePage/HomePage";
import NewTaskPage from "./pages/NewTaskPage/NewTaskPage";
import TaskPage from "./pages/TaskPage/TaskPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/login" element={<LoginPage />} />
        <Route path="/users/:userId" element={<HomePage/>} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/new-task" element={<NewTaskPage />} />
        <Route path="/tasks" element={<TaskPage />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
