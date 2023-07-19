import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { userService } from '../services';
import { Provider } from 'react-redux';
import store from '../store';
import "react-multi-carousel/lib/styles.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // run auth check on initial load
    authCheck(router.asPath);
  }, []);

  function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in
    const publicPaths = ['/home/', '/home', '/login', '/', '/sign-up/', '/otp/','/subscription/','/premimum-subscription/',"/thankyou/", '/privacy-policy/', '/terms/'];
    const path = url.split('?')[0];
    if (!userService.userValue && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push('/');
    } else {
      setAuthorized(true);
      // if (router.pathname == '/login' || router.pathname == '/') {
      //   router.push("/dashboard");
      // }
    }
  }

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
