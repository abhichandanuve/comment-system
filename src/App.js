import logo from './logo.svg';
import './App.css';
import CommentSystem from './app/CommentSection';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header />
     <CommentSystem />
    </div>
  );
}

export default App;
