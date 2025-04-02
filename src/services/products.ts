const PRODUCTS = [
   {
     id: '1',
     name: 'Product 1',
     price: 29.99,
     description: 'This is the description for Product 1.',
     image: 'https://via.placeholder.com/300x200'
   },
   {
     id: '2',
     name: 'Product 2',
     price: 39.99,
     description: 'This is the description for Product 2.',
     image: 'https://via.placeholder.com/300x200'
   },
   {
     id: '3',
     name: 'Product 3',
     price: 49.99,
     description: 'This is the description for Product 3.',
     image: 'https://via.placeholder.com/300x200'
   }
 ];
 
 // Simulate API delay
 const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
 
 export async function getProducts() {
   // Simulate API call
   await delay(500);
   return PRODUCTS;
 }
 
 export async function getProductById(id) {
   // Simulate API call
   await delay(500);
   const product = PRODUCTS.find(p => p.id === id);
   
   if (!product) {
     throw new Error('Product not found');
   }
   
   return product;
 }