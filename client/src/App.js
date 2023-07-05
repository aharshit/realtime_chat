
import './App.css';
import Layout from './Layout';
import Chat from './Chat';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return(
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Layout/>} />
        <Route path="chat" element={<Chat/>}/>
      </Routes>
      </BrowserRouter>
  )
}

export default App;
