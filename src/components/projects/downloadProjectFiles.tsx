'use client';

import { displayProjectDocument } from '@/utils/publicApi';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
import { useState } from 'react';

const DownloadFiles = ({ id }: any) => {
    const [showModal, setShowModal] = useState(false);
    const [availableFiles, setAvailableFiles] = useState([]);

    const handleClose = () => {
        setShowModal(false);
    };
    const handleShowModal = async () => {
        const data = await displayProjectDocument(id);
        if (data) {
            setAvailableFiles(data);
            setShowModal(true);
        }
    };

    const handleDownload = (fileName: any) => {
        const downloadUrl = `https://3t-api.csdevhub.com/images/Documents/${fileName}`;
        fetch(downloadUrl)
          .then(response => {
            if (response.ok) {
              return response.blob();
            }
            throw new Error('Network response was not ok.');
          })
          .then(blob => {
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();
          })
          .catch(error => console.error('There was a problem with the fetch operation:', error));
      };

    return (
        <>
            <a
                aria-label='anchor'
                className='btn-sm-badge btn btn-icon btn-wave waves-effect waves-light btn-sm btn-light'
            >
                <i
                    className='bi bi-eye'
                    onClick={handleShowModal}
                ></i>
            </a>
            <Modal
                show={showModal}
                backdrop='static'
                onHide={() => handleClose()}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Available files</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className='table table-hover border table-bordered'>
                        <thead>
                            <tr>
                                <th scope='col'>S.No.</th>
                                <th scope='col'>File Name</th>
                                <th scope='col'>Download</th>
                            </tr>
                        </thead>
                        <tbody>
                            {availableFiles?.map((file: any, index: number) => (
                                <tr key={file.fileName}>
                                    <td>{index + 1}</td>
                                    <td> {file.fileName}</td>
                                    <td>
                                        <button
                                            className=' btn btn-link text-primary'
                                            onClick={() =>
                                                handleDownload(file.fileName)
                                            }
                                        >
                                            {' '}
                                            <i className='bi bi-download'></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {availableFiles.length === 0 && (
                                <tr>No document found.</tr>
                            )}
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant='secondary'
                        onClick={() => handleClose()}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DownloadFiles;
