import { Route, Routes } from 'react-router-dom';
import './index.css';
import Main from "./pages/Main";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      {/* <Route path='/products/list' element={} /> */}
      {/* <Route path='/bookmark' element={} /> */}
    </Routes>
  );
}

export default App;
