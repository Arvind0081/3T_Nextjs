'use client';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
import apiService from '@/services/apiService';
import { empDeleteUrl } from '../constant';
import { useRouter } from 'next/navigation';

type Props = {
    show: any;
    setShow: any;
    id: string;
};

const DeleteModal = ({ show, setShow, id }: Props) => {
    const router = useRouter();

    const handleClose = () => {
        setShow(false);
    };

    const handleDelete = async (id: string) => {
        if (id) {
            try {
                await apiService.delete(`${empDeleteUrl}=${id}`);

                router.refresh();
            } catch (error: any) {}

            setShow(false);
        }
    };

    return (
        <>
            <Modal
                show={show}
                backdrop='static'
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to delete?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Do you really want to delete this record?
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant='secondary'
                        onClick={handleClose}
                    >
                        Close
                    </Button>
                    <Button
                        variant='danger'
                        onClick={() => handleDelete(id)}
                    >
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DeleteModal;
