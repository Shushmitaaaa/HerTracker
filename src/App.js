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

function App() {
  return (
    <Router>
        
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/chat" element={<AIChat />} />
            {/* <Route path="/calendar" element={<Dashboard />} /> */}
            <Route path="/profile" element={<Dashboard />} />
          </Routes>
       
      
    </Router>
  );
}

export default App;