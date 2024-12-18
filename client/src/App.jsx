import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Chat from './pages/Chat';
import AddProjectModal from './components/AddProjectModal/AddProjectModal';
import './App.css';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/add-project" element={<AddProjectModal />} />
      </Routes>
    </>
  );
};