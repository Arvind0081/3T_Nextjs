'use client';
import Image from 'next/image';
import apiService from '@/services/apiService';
import { useRouter } from 'next/navigation';

const UpdateProfileImage = ({ profileDetails }: any) => {
  const router = useRouter();
  const profileImageSrc=(
    profileDetails?.model?.userProfile.profileImage
      ? `https://3t-api.csdevhub.com/images/${profileDetails?.model?.userProfile.profileImage}`
      : null
  );

  const initials =
    profileDetails?.model?.userProfile.firstName &&
    profileDetails?.model?.userProfile.lastName
      ? `${profileDetails?.model?.userProfile.firstName.substring(0, 1).toUpperCase()}${profileDetails?.model?.userProfile.lastName.substring(0, 1).toUpperCase()}`
      : '';

      const handleImageUpload = async (event: any) => {
      
        const file = event.target.files[0];
        if (!file) return;
    
        const formData = new FormData();
        formData.append('id', profileDetails.model.userProfile.id);
        formData.append('profileImage', file);
    
        try {
          await apiService.put('/UserProfile/UpdateProfileImage', formData);
          router.refresh();
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      };

  return (
    <div className='profile-image-container'>
      <span className='avatar avatar-xxl avatar-rounded online me-3'>
        {profileImageSrc ? (
          <Image
            src={profileImageSrc}
            width={120}
            height={120}
            alt='profile image'
          />
        ) : (
          <div
            style={{
              width: 80,
              height: 80,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              backgroundColor: '#6f42c1',
              borderRadius: '50%',
            }}
          >
            {initials}
          </div>
        )}
      </span>
      <label
        htmlFor='profileImageUpload'
        style={{ cursor: 'pointer' }}
        className='camera-icon'
      >
        <i className='bi bi-camera'></i>
      </label>
      <input
        type='file'
        id='profileImageUpload'
        style={{ display: 'none' }}
        onChange={handleImageUpload}
      />
      <style jsx>{`
        .profile-image-container {
          position: relative;
          display: inline-block;
        }
        .camera-icon {
          position: absolute;
          bottom: -40px;
          left: 55px;
          font-size: 1.5rem;
          color: #6f42c1;
        }
      `}</style>
    </div>
  );
};

export default UpdateProfileImage;