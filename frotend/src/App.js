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
import CourseStartPage from './Screens/Students/CourseStartPage';
import Course from './Screens/Students/Course'
import CertificatePDF from './Actions/CertificatePDF';
import Dashboard from './Screens/Admin/Dashboard';
import ManageInstructors from './Screens/Admin/ManageInstructors';
import ManageStudents from './Screens/Admin/ManageStudents';
import AdminManageCourse from './Screens/Admin/ManageCourse';
import SalesReport from './Screens/Admin/SalesReport';
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

          <Route path='/course-details/:slug' element={<CourseView />} />
          <Route path='/add-to-cart' element={<AddtoCart />} />
          <Route path='/my-courses' element={<MyCourses />} />
          <Route path='/start-course/:slug' element={<CourseStartPage />} />
          <Route path='/course/:slug' element={<Course />} />
          <Route path='/course-certificate/:slug' element={<CertificatePDF />} />

          <Route path='/admin' element={<Dashboard />} />
          <Route path='/admin/manage-courses' element={<AdminManageCourse />} />
          <Route path='/admin/manage-students' element={<ManageStudents />} />
          <Route path='/admin/manage-instructors' element={<ManageInstructors />} />
          <Route path='/admin/sales-report' element={<SalesReport />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;