'use client';
import { useState } from 'react';
import { addUpworkPrf } from '@/utils/publicApi';
import { UpworkBodyParams } from '@/utils/types';
import { useRouter } from 'next/navigation';

const CreateProfile = ({ getDepartment,profileList }: any) => {
    const [profile, setProfileName] = useState('');
    const [dep, setDep] = useState('');
    const [profileUP, setProfileUP] = useState<any>();

    const [profileError, setProfileError] = useState('');
    const [depError, setDepError] = useState('');
    const [profileUPError, setProfileUPError] = useState('');

    const router= useRouter();
    const handleProfileName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProfileName(event.target.value);
        setProfileError(''); 
    };

    const handleDepChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setDep(event.target.value);
        setDepError(''); 
    };
    const handleProfileChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setProfileUP(event.target.value);
        setProfileUPError(''); 
    };
    const handleAddUpwork = async () => {
       
        if (validateForm()) {
            const data: UpworkBodyParams = {
                name: profile,            
                id: 0,
                description: null,
                departmentId: Number(dep),
                profileType: profileUP
            };
             await addUpworkPrf(data);
          
            setProfileName('');
            setDep('');
            router.refresh();
        }
    };
   const validateForm =()=>{
    let isValid = true;

        if (!profile.trim()) {
            setProfileError('Profile name is required.');
             isValid = false;
        }

        if (!dep) {
            setDepError('Please select a department.');
             isValid = false;
        }
        if (!profileUP) {
            setProfileUPError('Please select a Profile Type.');
             isValid = false;
        }
        return isValid;
   }
    return (
        <div className='card overflow-hidden form_card top_card'>
            <div className='card-body justify-content-between align-items-center d-flex'>
                <div className='filter-left d-flex gap-x-2'>
                    <div className='selectbox'>
                        <p className='fw-semibold mb-2'>Profile Name</p>
                        <input
                            type='text'
                            className='form-control'
                            value={profile}     
                            onChange={handleProfileName}
                        />
                        {profileError && <p className='text-danger'>{profileError}</p>}
                    </div>
                    <div className='selectbox'>
                        <p className='fw-semibold mb-2'>Select Department</p>
                        <select className='form-control' value={dep} onChange={handleDepChange}>
                            <option value=''>Select Department</option>
                            {getDepartment?.map((item: any) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                        {depError && <p className='text-danger'>{depError}</p>}
                    </div>
                    <div className='selectbox'>
                        <p className='fw-semibold mb-2'> Profile Type</p>
                        <select className='form-control' value={profileUP} onChange={handleProfileChange}>
                            <option value=''>Select Profile Type</option>
                            {profileList?.map((item: any) => (
                                <option key={item.id} value={item.value}>
                                    {item.text}
                                </option>
                            ))}
                        </select>
                        {profileUPError && <p className='text-danger'>{profileUPError}</p>}
                    </div>
                    <div className='selectbox align-self-end'>
                        <button
                            className='btn btn-bd-primaryadd'
                            style={{ backgroundColor: '#7952b3', color: 'white' }}
                            onClick={handleAddUpwork}
                        >
                            <i className='bi bi-person-add'></i>Create Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateProfile;