import '../App.css';
const Home = () => {
    return (
        <div>
        <h1 className='title'>Home</h1>
        <button 
            onClick={() => window.location.href = '/chat'}>
                Chat
            </button>
        
        </div>
    );
};

export default Home;