import React, { useEffect } from 'react';
import Footer from '../components/Footer/Footer';
import Signup from '../components/Signup/Signup';
import { userService } from '../services';
import { useRouter } from 'next/router';

export default function LoginForm() {
  const router = useRouter();
  useEffect(() => {
    document.body.classList.add('signUp--page');
    document.body.classList.remove('otp--page');
    if (userService.userValue) {
      router.push('/dashboard');
    }
  }, []);
  return (
    <>
      <Signup />
      <Footer />
    </>
  );
}
