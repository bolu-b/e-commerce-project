import { Link } from 'react-router-dom';

const ProductItem = ({ id, name, price, image }) => {
  return (
    <Link to={`/product/${id}`} className="product-card">
      <img className="product-card-image" src={image && image[0]} alt={name} />
      <p className="product-card-name">{name}</p>
      <p className="product-card-price">${price}</p>
    </Link>
  );
};

export default ProductItem;