import './App.css';
import NavbarDefault from './Navigation/Navbar';
import Login from './Login/LoginComponent';
import LoginPage from './Login/LoginPage';
import CompleteJournal from './Journal/CompleteJournal';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from './Layout';
import Main_App from './Backend_Integration/Main_App'

function App() {
  return (
    <Router>
    <Layout>
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/journal" element={<CompleteJournal />} />
            <Route path="/project_page" element={<Main_App />} />
        </Routes>
    </Layout>
</Router>
  );
}

export default App;
