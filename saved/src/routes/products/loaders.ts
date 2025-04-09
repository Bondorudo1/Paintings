// src/routes/products/loaders.js
import { getProducts, getProductById } from '../../services/products';

export async function productsLoader() {
  const products = await getProducts();
  return { products };
}

export async function productDetailLoader({ params }) {
  try {
    const product = await getProductById(params.productId);
    return { product };
  } catch (error) {
    throw new Response('Product not found', { status: 404 });
  }
}