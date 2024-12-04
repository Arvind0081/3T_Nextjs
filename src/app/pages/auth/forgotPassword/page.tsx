'use client';
import React, { FC} from 'react';
import Image from 'next/image';

import CsSoft from '/public/assets/images/media/backgrounds/cssoft.jpg';
import Logo from '/public/assets/images/brand/3t_logo.png';
import { useForm } from 'react-hook-form';
import { LoginFormValues,ForgotPasswordPayloadModel} from '@/utils/types';
import { forgotPassword } from '@/utils/publicApi';
import { useRouter } from 'next/navigation';


const ForgotPassword: FC = () => {
  
    const { register, handleSubmit, formState: { errors }, reset} = useForm<LoginFormValues>();

   const router=useRouter();
  
    const handleForgetPassword=async(data:any)=>{
        const payLoad:ForgotPasswordPayloadModel={
            email: data.email,
          domainName: window.location.origin
        }
      
       try {
        await forgotPassword(payLoad);
        reset();
        router.push('/');
       } catch (error) {
        
       }
        
    }

    return (
        <>
            <div className='login_wrapper'>
                <div className='login_content'>
                    <div className='login_left'>
                        <div className='login_img'>
                            
                            
                            <Image
                                src={CsSoft}
                                alt='3tlogo'
                            />
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
                            <form className='form-row' onSubmit={handleSubmit(handleForgetPassword)}>
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
                                                    message:
                                                        'Entered value does not match email format',
                                                },
                                            })}
                                           
                                        />
                                        {errors.email && (
                                            <div className='validation_error'>
                                                <span role='alert'>
                                                    {errors.email.message}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                
                            <div className='form-row mb-2'>
                            <input type='submit' value='Reset'  className='login100-form-btn btn-primary'/>
                            </div>
                               
                            </form>
                           
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;