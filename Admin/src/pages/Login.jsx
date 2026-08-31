import { useState, useContext } from 'react';
import axios from 'axios';
import { AdminContext } from '../context/AdminContextObject';

const Login = () => {
  const { backendUrl, setToken } = useContext(AdminContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(backendUrl + '/api/user/admin', { email, password });
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('adminToken', response.data.token);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form onSubmit={onSubmitHandler} style={{ width: '320px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2 style={{ marginBottom: '8px' }}>Admin Panel</h2>
        <input className="input-field" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="input-field" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;