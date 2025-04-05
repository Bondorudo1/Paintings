import { Outlet, useNavigation, ScrollRestoration } from 'react-router-dom';

import LoadingIndicator from '../components/common/LoadingIndicator';
// import Footer from '../components/layouts/Footer';
import Header from '../components/layouts/Header';


export default function Root() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <div className="app-container">
      <Header />
      
      <main className="content">
        {isLoading ? <LoadingIndicator /> : <Outlet />}
      </main>
      
      {/* <Footer /> */}
      <ScrollRestoration />
    </div>
  );
}