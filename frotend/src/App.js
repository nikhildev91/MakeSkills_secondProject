import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from "./Components/NavBar";
import Login from './Screens/Login';
import Register from './Screens/Register';
import CreateCourse from './Screens/CreateCourse';
import HomeScreen from './Screens/HomeScreen';
import InstructorCourseView from './Screens/InstructorCourseView';
import ManageCourses from './Screens/ManageCourses';
import InstructorDashboard from './Screens/InstructorDashboard';
import PublishedCourses from './Screens/PublishedCourses';
import EditCourse from './Screens/EditCourse';
import CourseView from './Screens/Students/CourseView';
import AddtoCart from './Screens/Students/AddtoCart'
import MyCourses from './Screens/Students/MyCourses';
function App() {
  return (
    <Router>
      <NavBar />
      <main>
        <Routes>
          <Route path='/' element={<HomeScreen />} />

          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          <Route path='/instructor' element={<InstructorDashboard />} />
          <Route path='/instructor/create-course' element={<CreateCourse />} />
          <Route path='/instructor/manage-courses' element={<ManageCourses />} />
          <Route path='/instructor/published-courses' element={<PublishedCourses />} />
          <Route path='/instructor/course-view/:slug' element={ <InstructorCourseView /> } />
          <Route path='/instructor/edit-course/:slug' element={ <EditCourse /> } />

          <Route path='/:slug' element={<CourseView />} />
          <Route path='/add-to-cart' element={<AddtoCart />} />
          <Route path='/my-courses' element={<MyCourses />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;