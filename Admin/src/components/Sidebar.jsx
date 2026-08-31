import { NavLink } from 'react-router-dom';

const linkStyle = ({ isActive }) => ({
  display: 'block',
  padding: '12px 20px',
  textDecoration: 'none',
  color: isActive ? 'var(--color-text)' : 'var(--color-text-muted)',
  fontWeight: isActive ? 600 : 400,
  fontSize: '14px',
  borderLeft: isActive ? '2px solid var(--color-accent)' : '2px solid transparent',
});

const Sidebar = () => {
  return (
    <div style={{ width: '220px', borderRight: '1px solid var(--color-border)', paddingTop: '24px', minHeight: '100vh' }}>
      <NavLink to="/add" style={linkStyle}>Add Product</NavLink>
      <NavLink to="/list" style={linkStyle}>List Products</NavLink>
      <NavLink to="/orders" style={linkStyle}>Orders</NavLink>
    </div>
  );
};

export default Sidebar;