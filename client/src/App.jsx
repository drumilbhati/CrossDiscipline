import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Chat from './pages/Chat';
import './App.css';
import LoginPage from './pages/LoginPage';
import Signup from './pages/Signup';


export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
      </Routes>
    </>
  );
};  