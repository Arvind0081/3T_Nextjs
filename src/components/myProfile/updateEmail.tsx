'use client'

import { useState } from 'react';
import apiService from '@/services/apiService';
import { useRouter } from 'next/navigation';

const UpdateEmail = ({ profileDetails }: any) => {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [newEmail, setNewEmail] = useState(profileDetails?.model?.userProfile.email || '');
    const [originalEmail, setOriginalEmail] = useState(profileDetails?.model?.userProfile.email || ''); // Store original email

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewEmail(event.target.value);
    };

    const handleEmailUpdate = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await apiService.put('/UserProfile/UpdateUserEmail', { email: newEmail });
            setIsEditing(false); // Close the input field
            router.refresh(); // Refresh the data
        } catch (error) {
            console.error('Error updating email:', error);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setNewEmail(originalEmail); 
    };

    return (
        <>
            {isEditing ? (
                <form onSubmit={handleEmailUpdate} style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                        type='email'
                        value={newEmail}
                        onChange={handleEmailChange}
                        required
                        style={{
                            padding: '10px',
                            fontSize: '16px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            marginRight: '8px',
                            width: '250px', // Adjust width as needed
                        }}
                    />
                    <button type='submit' style={{ marginRight: '8px' }}>Update</button>
                    <button type='button' onClick={handleCancel}>Cancel</button> {/* Use the handleCancel function */}
                </form>
            ) : (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: '8px' }}>
                        {profileDetails?.model?.userProfile.email}
                    </span>
                    <i
                        className='bi bi-pencil-square'
                        onClick={() => {
                            setIsEditing(true);
                            setOriginalEmail(profileDetails?.model?.userProfile.email); // Store the original email when editing
                        }}
                        style={{ cursor: 'pointer', fontSize: '18px' }}
                    ></i>
                </div>
            )}
        </>
    );
};

export default UpdateEmail;
