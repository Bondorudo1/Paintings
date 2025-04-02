// src/routes/products/index.jsx
import { useLoaderData, Link } from 'react-router-dom';

export default function ProductsPage() {
  const { products } = useLoaderData();
  
  return (
    <div className="products-page">
      <h1>Our Products</h1>
      
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>${product.price.toFixed(2)}</p>
            <Link to={`/products/${product.id}`} className="btn">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}