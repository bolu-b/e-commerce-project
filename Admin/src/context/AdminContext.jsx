import { useState } from 'react';
import { AdminContext } from './AdminContextObject';

const AdminContextProvider = (props) => {
  const backendUrl = 'http://localhost:4000';
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');

  const value = { token, setToken, backendUrl };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;