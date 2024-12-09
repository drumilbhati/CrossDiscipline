import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './utils/AuthContext.jsx';
import App from './App.jsx';
import { BrowserRouter} from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
	<React.StrictMode>
    <BrowserRouter>
	    <App/>
    </BrowserRouter>
	</React.StrictMode>
  </AuthProvider>,
);
