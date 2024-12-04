'use client';

import { uploadProjectDocument } from '@/utils/publicApi';

const UploadFiles = ({ id }: any) => {
    const handleUploadFile = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (event.target.files) {
            const file = event.target.files[0];
            if (file) {
                const formData = new FormData();
                formData.append('ProjectId', id);
                formData.append('File', file);
                await uploadProjectDocument(formData);
            }
        }
    };

    return (
        <>
            <div className='upload'>
                <label className='upload-area'>
                    <input
                        type='file'
                        onChange={handleUploadFile}
                    />
                    <span className='upload-button'>
                        <i className='bi bi-upload'></i>
                    </span>
                </label>
            </div>
        </>
    );
};

export default UploadFiles;
