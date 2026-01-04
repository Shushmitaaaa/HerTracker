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

function App() {
  return (
    <Router>
        
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/chat" element={<AIChat />} />
            {/* <Route path="/calendar" element={<Dashboard />} /> */}
            <Route path="/profile" element={<Profile />} />
          </Routes>
       
      
    </Router>
  );
}

export default App;