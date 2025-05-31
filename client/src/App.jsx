import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import LoginPage from './pages/Login/LoginPage.jsx';
import Chat from './pages/Chat/Chat.jsx';
import AddProjectModal from './components/AddProjectModal/AddProjectModal.jsx';
import { AuthProvider } from './auth/AuthContext.jsx';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/add-project" element={<AddProjectModal />}/>
        <Route path="/login" element={<LoginPage/>}></Route>
      </Routes>
    </>
  );
};  