
import './App.css';
import Home from './pages/Home';
import { BrowserRouter ,Route,Routes} from "react-router-dom";
import ContactUs from './component/ContactUs'

function App() {
  return (
   <>
   <BrowserRouter>
   <Routes>
   <Route path='/' element={<Home/>}/>
   <Route path='/contact' element={<ContactUs/>}/>

   </Routes>
   </BrowserRouter>

   </>
  );
}

export default App;
