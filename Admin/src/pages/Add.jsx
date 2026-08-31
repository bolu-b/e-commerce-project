import { useState, useContext } from 'react';
import axios from 'axios';
import { AdminContext } from '../context/AdminContextObject';

const Add = () => {
  const { backendUrl, token } = useContext(AdminContext);

  const [image1, setImage1] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Men');
  const [subCategory, setSubCategory] = useState('Topwear');
  const [price, setPrice] = useState('');
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);

  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('bestseller', bestseller);
      formData.append('sizes', JSON.stringify(sizes));
      if (image1) formData.append('image1', image1);

      const response = await axios.post(backendUrl + '/api/product/add', formData, {
        headers: { token },
      });

      if (response.data.success) {
        alert('Product Added');
        setName('');
        setDescription('');
        setPrice('');
        setSizes([]);
        setImage1(null);
        setBestseller(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} style={{ padding: '32px', maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h2>Add Product</h2>

      <div>
        <p style={{ fontSize: '13px', marginBottom: '8px' }}>Upload Image</p>
        <input type="file" accept="image/*" onChange={(e) => setImage1(e.target.files[0])} />
      </div>

      <input className="input-field" type="text" placeholder="Product name" value={name} onChange={(e) => setName(e.target.value)} required />
      <textarea className="input-field" placeholder="Product description" value={description} onChange={(e) => setDescription(e.target.value)} required rows={4} />

      <div style={{ display: 'flex', gap: '12px' }}>
        <select className="input-field" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
        </select>
        <select className="input-field" value={subCategory} onChange={(e) => setSubCategory(e.target.value)}>
          <option value="Topwear">Topwear</option>
          <option value="Bottomwear">Bottomwear</option>
          <option value="Outerwear">Outerwear</option>
        </select>
        <input className="input-field" type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
      </div>

      <div>
        <p style={{ fontSize: '13px', marginBottom: '8px' }}>Sizes</p>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['S', 'M', 'L', 'XL'].map((size) => (
            <button
              type="button"
              key={size}
              onClick={() => toggleSize(size)}
              style={{
                padding: '8px 14px',
                border: sizes.includes(size) ? '1px solid var(--color-text)' : '1px solid var(--color-border)',
                background: sizes.includes(size) ? 'var(--color-text)' : '#fff',
                color: sizes.includes(size) ? '#fff' : 'var(--color-text)',
                cursor: 'pointer',
              }}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
        <input type="checkbox" checked={bestseller} onChange={() => setBestseller((prev) => !prev)} />
        Add to bestseller
      </label>

      <button type="submit" className="btn-primary" style={{ width: 'fit-content' }}>
        ADD PRODUCT
      </button>
    </form>
  );
};

export default Add;