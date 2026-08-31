import { useState, useContext } from 'react';
import axios from 'axios';
import { ShopContext } from '../context/ShopContextObject';

const Login = () => {
  const { backendUrl, setToken } = useContext(ShopContext);

  const [currentState, setCurrentState] = useState('Login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const endpoint = currentState === 'Sign Up' ? '/api/user/register' : '/api/user/login';
      const payload = currentState === 'Sign Up' ? { name, email, password } : { email, password };
      const response = await axios.post(backendUrl + endpoint, payload);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="page" style={{ display: 'flex', justifyContent: 'center', paddingTop: '80px', paddingBottom: '80px' }}>
      <form onSubmit={onSubmitHandler} style={{ width: '320px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2 style={{ fontSize: '26px', marginBottom: '8px' }}>{currentState}</h2>

        {currentState === 'Sign Up' && (
          <input className="input-field" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        )}
        <input className="input-field" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="input-field" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <button type="submit" className="btn-primary" style={{ marginTop: '8px' }}>
          {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
        </button>

        <p
          style={{ cursor: 'pointer', fontSize: '13px', color: 'var(--color-text-muted)' }}
          onClick={() => setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login')}
        >
          {currentState === 'Login' ? 'Create an account' : 'Already have an account? Login'}
        </p>
      </form>
    </div>
  );
};

export default Login;