import Button from 'react-bootstrap/Button';
import  {Modal}  from 'react-bootstrap';

const   DeleteModal = ({showModal,handleClose,handleDeleteRecord}:any) => {

  return (
    <>
      <Modal show={showModal}  backdrop='static' onHide={()=>handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to delete?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, Do you Really want to delete this record?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary"  onClick={()=>handleClose()}>
            Close
          </Button>
          <Button  variant="danger" onClick={()=>handleDeleteRecord()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteModal;