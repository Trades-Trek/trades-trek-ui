import { React, useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SignupSlider from '../SignupSlider/SignupSlider';
import { useForm } from 'react-hook-form';
import { userService } from '../../services';
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../actions/users';
import { Loader } from '@mantine/core';

export default function Login() {
  const [btnStatus, setBtnStatus] = useState(false);
  const router = useRouter();
  const [validate,setValidate]=useState(false)
  const [showPassword,setShowPassword]=useState(false)
  const [isLoading,setIsLoading]=useState(false)
  const [error,setError]=useState();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)){
      setIsLoading(true)
      userService
      .login(data)
      .then((res) => {
        if (res?.success === true) {
          setValidate(false)

          setError(res.message)
          dispatch(setUser(res.user));
          setIsLoading(false)
          
          router.push('/dashboard');
        }else if(res?.success === false &&!res.user){
          setValidate(true)
          setError(res.message)
        setIsLoading(false)
        } else if (res?.success === false && res?.profileStatus === 0) {
          setValidate(true)
          
          setError(res.message)
          setBtnStatus(false);
          setIsLoading(false)

          localStorage.setItem('email', res.email);
          router.push('/otp');
        } else if (res?.success === false) {
            setValidate(true)
            setError(res.message)
          setIsLoading(false)

        } else {
          setValidate(true)
          setError('Something went wrong')
          setIsLoading(false)

        }
      })
      .catch((error) => {
        setValidate(true)
        setError(error.message)
        
      });
    // }else{
    //   setValidate(true)
    //   setError('Please Fill Valid Email')
    // }
  };

  return (
    <>
      
      <div className="site--form--container">
        <div className="form--grid--wrapper">
          <div className="left--form--layout">
            <div className="form--site--logo">
              <Image
                src="/images/site--logo.svg"
                alt=""
                layout="responsive"
                width={146}
                height={41}
              />
            </div>
            <div className="form--title">
              <h1>Hi, Welcome Back!</h1>
            </div>
            <div className="form--content">
              <p>
                Lorem Ipsum è un testo segnaposto utilizzato nel settore della
                tipografia e della stampa.
              </p>
            </div>
            {validate &&  <div className="" style={{border:'1px solid red',margin:'20px'}}>
              <p style={{textAlign:'center',padding:'10px',color:'red'}}>{error}</p>
          </div>}
            <form className="site--form" onSubmit={handleSubmit(onSubmit)}>
              <div className="form--item">
                <input
                  className={`form--control ${
                    errors.email ? 'is-invalid' : ''
                  }`}
                  type="text"
                  id="email"
                  placeholder="Email/Username"
                  {...register('email', { required: true })}
                />
                <label className="form--label" htmlFor="email">
                  Email/Username
                </label>
                <div className="invalid-feedback">
                  {errors.email?.type === 'required' && 'Email/Username is required'}
                </div>
              </div>
              <div className="form--item" >
                <div style={{display:'flex'}}>
                <input style={{width: "100%"}}
                  className={`form--control ${
                    errors.password ? 'is-invalid' : ''
                  }`}
                  type={showPassword?'text':"password"}
                  id="pwd"
                  placeholder="Password"
                  {...register('password', { required: true, maxLength: 20 })}
                />
                {showPassword?<img src='/images/view.png' className='passwordView' onClick={()=>setShowPassword(!showPassword)}/>:<img onClick={()=>setShowPassword(!showPassword)} src='/images/invisible.png' className='passwordView'/>}
                 
                </div>
                <label className="form--label" htmlFor="pwd">
                  Password
                </label>
                <div className="invalid-feedback">
                  {errors.password?.type === 'required' &&
                    'Password is required'}
                </div>
              </div>
              <div className="forgot--pwd">
                <Link href="/forgot-password">
                  <a>Forgot Password?</a>
                </Link>
              </div>
              <div className="form--actions">
                <button
                  type="submit"
                  className="btn btnBgBlue"
                  disabled={isLoading}
                >
                 {isLoading?<Loader color="#8000ff" />: "Login"}
                </button>
              </div>
              <div className="form--bottom--content">
                <p>
                  Don’t have an account?{' '}
                  <Link href="/sign-up">
                    <a>Sign Up</a>
                  </Link>
                </p>
              </div>
            </form>
          </div>
          <div className="right--form--layout">
            <div className="right--layout--content text--center">
              <SignupSlider />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
