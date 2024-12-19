import '../../App.css';

import { useNavigate } from 'react-router-dom';
const Home = () => {
    const navigate=useNavigate();
    const handleClick=()=>{
        
        navigate("/login");
        console.log("hi");
    }
    return (
       
        <div>
        <h1 className='title'>Home</h1>
        <button className="login" onClick={handleClick}>Login</button>
        <button className='chat' style={{margin:10}} onClick={navigate('/chat')}>Chat</button>
        </div>
    );
};

export default Home;