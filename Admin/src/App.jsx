import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AdminContext } from './context/AdminContextObject';
import Login from './pages/login';
import Sidebar from './components/Sidebar';
import Add from './pages/Add';
import List from './pages/List';
import Orders from './pages/Orders';

function App() {
  const { token } = useContext(AdminContext);

  if (token === '') {
    return <Login />;
  }

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/add" element={<Add />} />
          <Route path="/list" element={<List />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;