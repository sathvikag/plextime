import logo from './logo.svg';
import './App.css';
import Class from './components/Class';
import SearchPage from './components/SearchPage';
import Comments from './components/Comments';

function App() {
  return (
    <div className="App">

        <Comments class={{
                _id: "3ibvb349nveen34nv93vbd",
                name: "EECS 16B",
                breadth_category: ['Physical Sciences', 'English'],
                average_grade: 3.3,
                pain_level: 4,
                professors: ['Stojanovic', 'Murat']
            }}/>
    </div>
  );
}

export default App;
