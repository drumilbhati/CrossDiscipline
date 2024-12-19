import { Navigate, useNavigate } from 'react-router-dom';
import '../App.css';

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
        </div>
    );
};

export default Home;