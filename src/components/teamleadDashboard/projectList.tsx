'use client'
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';


type Props = {
  show: any;
  setShow: any;
  empID: string;
  projectList: any;
};

const ProjectList = ({ show, setShow, projectList }: Props) => {
  const handleClose = () => {
    setShow(false);
  };

  const numberToTimeConversion = (decimalTime: any) => {
    const hours = Math.floor(decimalTime);
    const fractionalHours = decimalTime - hours;
    const minutes = Math.round(fractionalHours * 60);

    // Format time string to HH:mm
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    return formattedTime;
  };


  return (
    <>
      <Modal show={show} backdrop="static" onHide={handleClose} className="custom-modal-width">
        <Modal.Header>
          <Modal.Title>Module Detail</Modal.Title>
          <Button variant="close" onClick={handleClose} aria-label="Close" className="ms-auto">
            <span aria-hidden="true">&times;</span>
          </Button>
        </Modal.Header>
        <Modal.Body>
        {projectList?.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Module</th>
                <th>Upwork Hours</th>
                <th>Fixed Billing Hours</th>
                <th>Billing Hours</th>
                <th>Total Hours</th>
                <th>Non Billable Hours</th>
              </tr>
            </thead>
            <tbody>
              {projectList?.map((item: any, index: any) => (
                <tr key={index}>
                  <td>{item.moduleName}</td>
                  <td>{numberToTimeConversion(item.upworkHours)}</td>
                  <td>{numberToTimeConversion(item.fixedHours)}</td>
                  <td className='text-success'>{numberToTimeConversion(item.billingHours)}</td>
                  <td className='text-success'>{numberToTimeConversion(item.totalHours)}</td>                
                  <td className='text-danger'>{numberToTimeConversion(item.nonBillableHours)}</td>
                </tr>
              ))}
            </tbody>
          </table>
           ) : (
            <p>No record found</p>
          )}
        </Modal.Body>
        <Modal.Footer>
         
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProjectList;
