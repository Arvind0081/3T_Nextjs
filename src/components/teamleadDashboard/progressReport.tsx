'use client';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';

type Props = {
  show: any;
  setShow: any;
  empID: string;
  ProgressDetail: any;
};

const ProgressReport = ({ show, setShow, ProgressDetail }: Props) => {
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
          <Modal.Title>Developer`s Progress Report</Modal.Title>
          <Button variant="close" onClick={handleClose} aria-label="Close" className="ms-auto">
            <span aria-hidden="true">&times;</span>
          </Button>
        </Modal.Header>
        <Modal.Body>
          {ProgressDetail?.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Module</th>
                  <th>Upwork Hours</th>
                  <th>Fixed Billing Hours</th>
                  <th>Billing Hours</th>
                  <th>Total Hours</th>
                  <th>Non Billable Hours</th>
                </tr>
              </thead>
              <tbody>
                {ProgressDetail?.map((project: any, projectIndex: number) => (
                  project.moduleDetails?.map((module: any, moduleIndex: number) => (
                    <tr key={`${projectIndex}-${moduleIndex}`}>
                      <td>{moduleIndex === 0 ? project.projectName : ''}</td>
                      <td>{module.moduleName}</td>
                      <td>{numberToTimeConversion(module.upworkHours) }</td>
                      <td >{numberToTimeConversion(module.fixedHours) }</td>
                      <td className='text-success'>{numberToTimeConversion(module.billingHours) }</td>
                      <td className='text-success'>{ numberToTimeConversion(module.totalHours)}</td>
                      <td className='text-danger'>{ numberToTimeConversion(module.nonBillableHours)}</td>
                    </tr>
                  ))
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

export default ProgressReport;
