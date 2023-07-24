import Appbar from "./appbar.jsx";
import Signin from "./signin.jsx";
import Signup from "./signup.jsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div style={{
      height: '100vh',
      width: "100vw",
      backgroundColor: "#eeeeee"
    }}>
      <Appbar></Appbar>
      <Router>
          <Routes>
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
              
             
          </Routes>
      </Router>
      </div>
  );
}

export default App
