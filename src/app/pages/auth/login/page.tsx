'use client';
import React, { FC, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import apiService from '@/services/apiService';
import CsSoft from '/public/assets/images/media/backgrounds/cssoft.jpg';
import Logo from '/public/assets/images/brand/3t_logo.png';
import { useForm } from 'react-hook-form';
import { LoginFormValues } from '@/utils/types';
import { setCookie } from 'cookies-next';
import getUser from '@/utils/getUserClientSide';

const Login: FC = () => {
  const user: any = getUser();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  //const [acceptTerms,setAcceptTerms]=useState<boolean>(false);
  //const [acceptTermsError,setAcceptTermsError]=useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormValues>();

  useEffect(() => {
    if (user && user?.exp && user?.exp > Date.now() / 1000) {
      switch (user?.role) {
        case 'Team Lead':
          router.push('/teamLeadDashBoard');
          break;
        case 'Employee':
          router.push('/employeeDashBoard');
          break;
        case 'HR':
          router.push('/hrDashBoard');
          break;
        case 'BDM':
          router.push('/employeeDashBoard');
          break;
        case 'Project Manager':
          router.push('/dashBoard');
          break;

        case 'HOD':
          router.push('/dashBoard');
          break;
        case 'Admin':
          router.push('/adminDepartment');
          break;
        default:
          break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleLogin = async (data: LoginFormValues) => {
    //if(acceptTerms){
    const response = await apiService.post('/Account/Login', data);
    if (response.model) {
      setCookie('user', response?.model);
      const user: any = getUser();
      reset();
      // setAcceptTerms(false);
      switch (user?.role) {
        case 'Team Lead':
          router.push('/teamLeadDashBoard');
          break;
        case 'Employee':
          router.push('/employeeDashBoard');
          break;
        case 'HR':
          router.push('/hrDashBoard');
          break;
        case 'BDM':
          router.push('/employeeDashBoard');
          break;
        case 'Project Manager':
          router.push('/dashBoard');
          break;
        case 'HOD':
          router.push('/dashBoard');
          break;
        default:
          break;
      }
    }
    // }else{
    //     setAcceptTermsError(true);
    // }
  };

  return (
    <>
      <div className='login_wrapper'>
        <div className='login_content'>
          <div className='login_left'>
            <div className='login_img'>
              <Image src={CsSoft} alt='3tlogo' />
            </div>
          </div>
          <div className='login_right'>
            <div className='login_flex_box'>
              <div className='logo'>
                <Image
                  src={Logo}
                  className='header-brand-img desktop-logo'
                  alt='cslogo'
                />
              </div>
              <form className='form-row' onSubmit={handleSubmit(handleLogin)}>
                <div className='form-row'>
                  <div className='form-group relative'>
                    <label htmlFor='email'>
                      Email
                      <span className='astrisk'>*</span>
                    </label>
                    <input
                      id='email'
                      type='email'
                      className='form-control'
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: 'Entered value does not match email format',
                        },
                      })}
                    />
                    {errors.email && (
                      <div className='validation_error'>
                        <span role='alert'>{errors.email.message}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className='form-row'>
                  <div className='form-group'>
                    <div className='d-flex justify-content-between'>
                      <label htmlFor='password'>
                        Password <span className='astrisk'>*</span>
                      </label>
                      <Link
                        href='/forgotPassword'
                        className='forgot_password_section'
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <input
                      id='password'
                      type={showPassword ? 'text' : 'password'}
                      className='form-control'
                      {...register('password', {
                        required: 'Password is required',
                      })}
                    />
                    <i
                      className={showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'}
                      aria-hidden='true'
                      onClick={() => setShowPassword(!showPassword)}
                    ></i>
                    {errors.password && (
                      <div className='validation_error'>
                        <span role='alert'>{errors.password.message}</span>
                      </div>
                    )}
                  </div>
                </div>
                {/* <div className='form-row'>
                                <div className='form-group custm_checkbox'>
                                    <label className='custom-control custom-checkbox mb-0'>
                                        <input
                                            type='checkbox'
                                            className='custom-control-input'
                                            name='example-checkbox1'
                                            checked={acceptTerms}
                                            onClick={()=>{setAcceptTerms(!acceptTerms);setAcceptTermsError(false);}}
                                        />
                                        <span className='custom-control-label'>
                                            I accept all the terms & Conditions
                                        </span>
                                    </label>
                                    {acceptTermsError && <div className='validation_error'>
                                            <span role='alert'>
                                                    {'Accept terms & Conditions'}
                                                </span>
                                        </div>}
                                </div>
                               
                            </div> */}

                <div className='form-row mb-2'>
                  <input
                    type='submit'
                    value='Login'
                    className='login100-form-btn btn-primary'
                  />
                </div>
              </form>
              <div className='form-row'>
                <div className='form-group'>
                  <p className='mb-0'>
                    {' '}
                    Don`t have an account?{' '}
                    <Link href='/register'>Create Account</Link>
                  </p>
                </div>
              </div>
              <div className='custm-or'>
                <hr className='flex-grow-1' />
                <span className='mx-2 text-2 text-muted'>OR</span>
                <hr className='flex-grow-1' />
              </div>
              <div className='d-flex justify-content-center'>
                <Link href='#'>
                  <div className='social-login me-4 text-center google-login'>
                    <i className='bi bi-google'></i>
                  </div>
                </Link>
                <Link href='#'>
                  <div className='social-login me-4 text-center facebook-login'>
                    <i className='bi bi-facebook'></i>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
