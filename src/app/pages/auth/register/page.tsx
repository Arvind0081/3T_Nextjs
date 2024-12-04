import React from 'react';
import Image from 'next/image';
import CsSoft from '/public/assets/images/media/backgrounds/cssoft.jpg';
import Logo from '/public/assets/images/brand/3t_logo.png';
import { departments } from '@/utils/publicApi';
import RegisterForm from '@/components/register/registerForm';
import Link from 'next/link';
import { DepartmentModel } from '@/utils/types';

const Register = async () => {
    let departmentData: DepartmentModel[] = [];
   
    
    try {
        departmentData = await departments();
    } catch (error :any) {
        // console.error('Error fetching data:', error);
        // Handle the error accordingly, maybe log it or notify it to the user
    }

    
    return (
        <div className='login_wrapper'>
            <div className='login_content'>
                <div className='login_left'>
                    <div className='login_img'>
                        <Image src={CsSoft} alt='' />
                    </div>
                </div>
                <div className='login_right'>
                    <div className='login_flex_box'>
                        <div className='logo'>
                            <Image
                                src={Logo}
                                className='header-brand-img desktop-logo'
                                alt='logo'
                            />
                        </div>
                        <RegisterForm
                            departmentData={departmentData}
                           
                        />
                        <div className='form-row'>
                            <p className='mb-0'>
                                Already have an account?{'  '}
                                <Link href='/'>Sign In</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
