'use client';
import React, { FC, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import apiService from '@/services/apiService';
import CsSoft from '/public/assets/images/media/backgrounds/cssoft.jpg';
import Logo from '/public/assets/images/brand/3t_logo.png';
import { useForm } from 'react-hook-form';
import {
  ResetPasswordFormValues,
  ResetPasswordPayloadModel,
  ValidatePasswordPayloadModel,
} from '@/utils/types';
import { useSearchParams } from 'next/navigation';

const ResetPassword: FC = () => {
  const searchParams = useSearchParams();
  const verifyToken = searchParams.get('request');

  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<ResetPasswordFormValues>();

  const password = watch('password');
  const validateToken = async () => {
    if (verifyToken) {
      try {
        const payLoad: ValidatePasswordPayloadModel = {
          token: verifyToken,
        };
        await apiService.post('/Account/ValidateToken', payLoad);
        return true;
      } catch (error) {
        return false;
      }
    }
  };

  const handleReset = async (data: any) => {
    if (verifyToken) {
      const tokenStatus = await validateToken();
      if (tokenStatus) {
        const payLoad: ResetPasswordPayloadModel = {
          token: verifyToken,
          password: data.password,
        };
        try {
          await apiService.post('/Account/ResetPassword', payLoad);
          router.push('/');
          reset();
        } catch (error) {}
      }
    }
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
              <form className='form-row' onSubmit={handleSubmit(handleReset)}>
                <div className='form-row'>
                  <div className='form-group'>
                    <div className='d-flex justify-content-between'>
                      <label htmlFor='password'>
                        New Password <span className='astrisk'>*</span>
                      </label>
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

                <div className='form-row'>
                  <div className='form-group'>
                    <div className='d-flex justify-content-between'>
                      <label htmlFor='confirmPassword'>
                        Confirm Password
                        <span className='astrisk'>*</span>
                      </label>
                    </div>
                    <input
                      id='confirmPassword'
                      type={showConfirmPassword ? 'text' : 'password'}
                      className='form-control'
                      {...register('confirmPassword', {
                        required: 'Confirm Password is required',
                        validate: (value) =>
                          value == password || 'Passwords do not match',
                      })}
                    />
                    <i
                      className={
                        showConfirmPassword ? 'bi bi-eye-slash' : 'bi bi-eye'
                      }
                      aria-hidden='true'
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    ></i>
                    {errors.confirmPassword && (
                      <div className='validation_error'>
                        <span role='alert'>
                          {errors.confirmPassword.message}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className='form-row mb-2'>
                  <input
                    type='submit'
                    value='Submit'
                    className='login100-form-btn btn-primary'
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
