import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './Components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/UserSlice';
import summaryApi from './common';

function App() {
  const dispatch = useDispatch();

  const [cartProductCount, setCartProductCount] = useState(0);


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



  const fetchUserAddToCart=async()=>{
    try {
      const dataResponse = await fetch(summaryApi.CartItemCount.url, {
        method: summaryApi.CartItemCount.method,
        credentials: 'include',
      });

      const dataApi = await dataResponse.json();
      setCartProductCount(dataApi?.data?.count);
      

  }
  catch (error) {
    console.log(error)
  }
  }


  useEffect(() => {
    fetchUserDetails();
    fetchUserAddToCart()
  }, []);
  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails,
       cartProductCount,
       fetchUserAddToCart
        }}
      >
        <ToastContainer position="top-center" />
        <Header />
        <main className="min-h-[calc(100vh-120px)] pt-16">
          <Outlet />
        </main>
      </Context.Provider>
    </>
  );
}

export default App;