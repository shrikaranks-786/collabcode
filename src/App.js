import './App.css';
import { BrowserRouter , Routes , Route} from 'react-router-dom';
import Homapage from './pages/Homapage';
import Editorpage from './pages/Editorpage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homapage/>}/>
          <Route path='/editor/:roomId' element={<Editorpage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
