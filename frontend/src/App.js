import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Users from './componants/Users';
import Home from './componants/Home';
import Registration from './componants/Registration';
// Import other components if needed

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/users" element={<Users />} />
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/register" element={<Registration/>}/>
                   
                </Routes>
            </div>
        </Router>
    );
}

export default App;
