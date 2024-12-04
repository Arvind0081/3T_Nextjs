'use client';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';

// Shape of the props
type Props = {
    show: any;
    setShow: any;
    projectReport: any;
};

const ReportDetails = ({ projectReport, show, setShow }: Props) => {
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
            <Modal
                show={show}
                backdrop="static"
                onHide={handleClose}
                className="custom-modal-width"
            >
                <Modal.Header>
                    <Modal.Title>Progress Report</Modal.Title>
                    <Button
                        variant="close"
                        onClick={handleClose}
                        aria-label="Close"
                        className="ms-auto"
                    >
                        <span aria-hidden="true">&times;</span>
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    {projectReport?.length > 0 ? (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Project Name</th>
                                    <th>Module</th>
                                    <th>Upwork Hours </th>
                                    <th> Fixed Billing Hours</th>
                                    <th>Billing Hours</th>
                                    <th>Non Billable Hours</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projectReport?.map(
                                    (project: any, projectIndex: number) =>
                                        project.moduleList.map(
                                            (
                                                module: any,
                                                moduleIndex: number
                                            ) => (
                                                <tr
                                                    key={`${projectIndex}-${moduleIndex}`}
                                                >
                                                    <td>
                                                        {project.projectName}
                                                    </td>
                                                    <td>{module.moduleName}</td>
                                                    <td>
                                                        {numberToTimeConversion(module.upworkHours) }
                                                    </td>
                                                    <td>{numberToTimeConversion(module.fixedHours)}</td>
                                                    <td className="text-success text-bold">
                                                        {numberToTimeConversion(module.billingHours)}
                                                    </td>
                                                    <td className="text-danger text-bold">
                                                        {numberToTimeConversion(module.offlineHours)}
                                                    </td>
                                                </tr>
                                            )
                                        )
                                )}
                            </tbody>
                        </table>
                    ) : (
                        <p>No record found</p>
                    )}
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
            </Modal>
        </>
    );
};

export default ReportDetails;
