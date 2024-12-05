import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChatProvider from './context/ChatProvider';
import HomePage from './pages/Homepage';
import ChatPage from './pages/ChatPage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className='App'>
    <Router>
      <ChatProvider >
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/chats" element={<ChatPage />} />
        <Route path="*" element={<NotFound />} /> //Wildcard route for 404 pages
      </Routes>
      </ChatProvider>
    </Router>
    </div>
  );
}

export default App;
