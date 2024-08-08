import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/UserSlice';

function App() {
  const dispatch = useDispatch();

  const fetchUserDetails = async () => {
    try {
      const dataResponse = await fetch(SummaryApi.userDetails.url, {
        method: SummaryApi.userDetails.method,
        credentials: 'include',
      });

      const dataApi = await dataResponse.json();

      if (dataApi.user) {
        dispatch(setUserDetails(dataApi.user));
      } else {
        console.error('Failed to fetch user details:', dataApi.message);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails,
        }}
      >
        <ToastContainer position="top-center" />
        <Header />
        <main className="min-h-[calc(100vh-120px)]">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;