import { useLoaderData, Link } from 'react-router-dom';

export default function ProductDetail() {
  const { product } = useLoaderData();
  
  return (
    <div className="product-detail">
      <Link to="/products" className="back-link">
        &larr; Back to Products
      </Link>
      
      <div className="product-container">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>
        
        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="product-price">${product.price.toFixed(2)}</p>
          <div className="product-description">
            <h2>Description</h2>
            <p>{product.description}</p>
          </div>
          <button className="add-to-cart-btn">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}