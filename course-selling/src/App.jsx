import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Appbar from "./appbar.jsx";
import Signin from "./signin.jsx";
import Addcourse from "./addcourse.jsx";
import Signup from "./signup.jsx";
import Courses from './course.jsx';
import CourseId from './CourseId.jsx';


function App() {

    return (
        <div style={{width: "100vw",
            height: "100vh",
            backgroundColor: "#eeeeee"}}
        >
            <Router>
                <Appbar />
                <Routes>
                <Route path="/admin/signup" element={<Signup />} />
                <Route path="/" element={<Signup />} />
                <Route path="/admin/signin" element={<Signin />} />
                <Route path="/admin/addcourse" element={<Addcourse />} />
                <Route path="/admin/course" element={<Courses />} />
                <Route path="/admin/course/:courseId" element={<CourseId />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
