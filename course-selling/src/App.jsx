import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Appbar from "./appbar.jsx";
import Signin from "./signin.jsx";
import Addcourse from "./addcourse.jsx";
import Signup from "./signup.jsx";

function App() {

    return (
        <div style={{width: "100vw",
            height: "100vh",
            backgroundColor: "#eeeeee"}}
        >
            <Router>
                <Appbar />
                <Routes>
                <Route path="/admin/courses" element={<Addcourse />} />
              <Route path="/admin/signin" element={<Signin />} />
              <Route path="/admin/signup" element={<Signup />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
