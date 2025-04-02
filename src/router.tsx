// src/router.jsx
import { createBrowserRouter } from 'react-router-dom';


// Import route components
import Root from './routes/root';
import HomePage from './routes/home';
import AboutPage from './routes/about';
import ContactPage from './routes/contact';
import ProductsPage from './routes/products';
import ProductDetail from './routes/products/detail';
import ErrorPage from './components/common/ErrorPage';


// Import loaders
import { productsLoader, productDetailLoader } from './routes/products/loaders';
import NotFoundPage from './components/common/NotFoundPage';
import EditorPage from './routes/editor';

// Create and export the router
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
      {
        path: 'editor',
        element: <EditorPage />,
      },
      {
        path: 'products',
        element: <ProductsPage />,
        loader: productsLoader,
      },
      {
        path: 'products/:productId',
        element: <ProductDetail />,
        loader: productDetailLoader,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;