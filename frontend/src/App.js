// // import Dashboard from './pages/Dashboard';

// // function App() {
// //   return (
// //     <div className="App">
// //       <Dashboard></Dashboard>
// //     </div>
// //   );
// // }

// // export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Dashboard from './pages/Dashboard'; // Make sure the path is correct
// import AIChat from './pages/AIChat';       // The new chat page we'll create


// function App() {
//   return (
    
//     <Router>
   
//       <Routes>
//         <Route path="/" element={<Dashboard />} />
//         <Route path="/chat" element={<AIChat />} />
//       </Routes>
      
    
//     </Router>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AIChat from './pages/AIChat'; 
import Profile from './pages/Profile';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
        
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
              } />
            <Route path="/chat" element={
              <ProtectedRoute>
              <AIChat />
              </ProtectedRoute>
              } />
            {/* <Route path="/calendar" element={<Dashboard />} /> */}
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
              } />
          </Routes>
       
      
    </Router>
  );
}

export default App;