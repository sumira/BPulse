import logo from './logo.svg';
import Navbar from './Navbar';
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom'

import Home from './pages/home'
import HistoricalData from './pages/historical-data'
import Notifications from './pages/notifications';
import Settings from './pages/settings';
import TechnicalSupport from './pages/technical-support';

function App() {
  return (

    <Router>


      <Navbar> </Navbar>
      
    

    <Routes>

      <Route exact path = "/" Component= {Home} />
      <Route path="/historical-data" Component={HistoricalData} />
      <Route path="/notifications" Component={Notifications} />
      <Route path="Settings" Component={Settings} />
      <Route path="technical-support" Component={TechnicalSupport} />

    </Routes>



    </Router>
    
    
  );
}

export default App;
