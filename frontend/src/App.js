import logo from './logo.svg';
import './App.css';
import SearchPage from './components/SearchPage';
import Comments from './components/Comments';

import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';  

const App = () => {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<SearchPage />} />
            <Route exact path="/comments" element={<Comments class={{
            _id: "3ibvb349nveen34nv93vbd",
            name: "EECS 16B",
            breadth_category: ['Physical Sciences', 'English'],
            average_grade: 3.3,
            pain_level: 4,
            professors: ['Stojanovic', 'Murat']
        }}/>} />
            <Route path="*" element={<Navigate to="/"/>} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
