'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import ChangePassword from '@/components/changePassword/changePassword';
import getUser from '@/utils/getUserClientSide';

const ProfileSection = ({ profileDetails }: any) => {
    const router = useRouter();
    const [profileModal, setProfileModal] = useState(false);
    const [showModal, setShowModal] = useState(false); 
    const [user, setUser] = useState<any>();

    useEffect(() => {
        const user: any = getUser() ;

        setUser(user);
    }, []);

    const handleChangePassword = (
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
        e.preventDefault();
        setShowModal(true);
    };

    const handleProfileModal = () => {
        setProfileModal(!profileModal);
    };

    const handleSignOut = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        deleteCookie('user');
        deleteCookie('manager');
        deleteCookie('departmentId');
        router.push('/');
    };

    if (!profileDetails || !user) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div
                className="dropdown d-flex profile-1"
                onClick={handleProfileModal}
            >
                <Link href="#" className="nav-link leading-none d-flex gap-x-2">
                    {profileDetails?.model?.userProfile.profileImage ? (
                        <Image
                            src={`https://3t-api.csdevhub.com/images/${profileDetails.model.userProfile.profileImage}`}
                            width={20}
                            height={20}
                            alt="profile-user"
                            className="avatar profile-user brround cover-image"
                        />
                    ) : (
                        <span className="avatar avatar-sm me-2 avatar-rounded">
                            <span
                                style={{
                                    fontSize: '20px',
                                    color: '#00000059',
                                    textTransform: 'uppercase',
                                    padding: '19%',
                                }}
                            >
                                {profileDetails?.model?.userProfile.firstName?.substring(
                                    0,
                                    1
                                )}
                            </span>
                        </span>
                    )}
                    <div className="text-left">
                        {user?.unique_name && (
                            <h5 className="text-dark mb-0 fs-14 fw-semibold">
                                {user.unique_name}
                            </h5>
                        )}
                        {user?.designation && (
                            <small className="text-muted">
                                {user.designation}
                            </small>
                        )}
                    </div>
                </Link>
                <div
                    className={`dropdown-menu dropdown-menu-end dropdown-menu-arrow profile-dropdown ${profileModal ? 'show' : ''}`}
                >
                    <Link className="dropdown-item" href="/profile">
                        <i className="dropdown-icon fe fe-user"></i> Profile
                    </Link>
                    <Link
                        className="dropdown-item"
                        href="#"
                        onClick={handleChangePassword}
                    >
                        <i className="dropdown-icon fe fe-lock"></i> Change
                        Password
                    </Link>
                    <div className="dropdown-divider m-0"></div>
                    <div className="dropdown-item" onClick={handleSignOut}>
                        <i className="dropdown-icon fe fe-alert-circle"></i>{' '}
                        Sign Out
                    </div>
                </div>
                <ChangePassword
                    show={showModal}
                    setShow={setShowModal}
                    id="example-id"
                />
            </div>
        </>
    );
};

export default ProfileSection;
