import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Chat from './components/Chat';
import './App.css';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </>
  );
};