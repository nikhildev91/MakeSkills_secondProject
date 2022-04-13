import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from "./Components/NavBar";
import Login from './Screens/Login';
import Register from './Screens/Register';
import CreateCourse from './Screens/CreateCourse';
function App() {
  return (
    <Router>
      <NavBar />
      <main>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/instructor/create-course' element={<CreateCourse />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;