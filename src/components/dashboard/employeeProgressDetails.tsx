'use client'
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';


type Props = {
  show: any;
  setShow: any;
 // empID: string;
  ProgressDetail: any;
  name:any;
};

const EmployeeProgressDetails = ({ show, setShow, ProgressDetail,name }: Props) => {
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

  const totalUpworkHours = (progress:any) => {
    return numberToTimeConversion(
      progress.moduleDetails.map((item:any) => item.upworkHours).reduce((a:number, b:number) => a + b, 0)
    );
  };

  const totalFixedHours=(progress:any)=>{
    return numberToTimeConversion(
        progress.moduleDetails.map((item:any)=>item.fixedHours).reduce((a: number, b: number) => a + b, 0)
      )
  };

  const totalBilledHours=(progress: any)=>{
    return numberToTimeConversion(
        progress.moduleDetails.map((item:any)=>item.upworkHours + item.fixedHours).reduce((a: number, b: number) => a + b, 0)
      )
  };

  const totalNonBilledHours=(progress:any)=>{
    
    return numberToTimeConversion(
      progress.moduleDetails.map((item:any)=>item.nonBillableHours).reduce((a: number, b: number) => a + b, 0)
    )
      
  };

  return (
    <>
      <Modal show={show} backdrop="static" onHide={handleClose} className="custom-modal-width">
        <Modal.Header>
          <Modal.Title>{name}`s Progress Report</Modal.Title>
          <Button variant="close" onClick={handleClose} aria-label="Close" className="ms-auto">
            <span aria-hidden="true">&times;</span>
          </Button>
        </Modal.Header>
        <Modal.Body>
       {ProgressDetail?.length > 0?(
        ProgressDetail.map((progress:any,index:number)=>(
         // progress.moduleDetails.map((item:any,index:any)=>(

            <table key={index} className="table text-nowrap table-hover border table-bordered">
<thead>
              <tr>
               <th>Project Name</th>
                <th>Module</th>
                <th>Upwork Hours</th>
                 <th>Fixed Billing Hours</th>
                 <th>Billing Hours</th>
                 {/* <th>Total Hours</th> */}
                <th>Non Billable Hours</th>
               </tr>
             </thead>
             <tbody>
             {progress.moduleDetails.map((item:any,index:any)=>(
             <tr key={index}>
                   <td>{progress.projectName}</td>
                   <td>{item.moduleName}</td>
                   <td>{numberToTimeConversion(item.upworkHours)}</td>
                   <td>{numberToTimeConversion(item.fixedHours)}</td>
                   <td className='text-success text-bold'>{numberToTimeConversion(item.billingHours)}</td>
                  {/* <td className='text-success text-bold'>{numberToTimeConversion(item.totalHours)}</td> */}
                  <td className='text-danger'>{numberToTimeConversion(item.nonBillableHours)}</td>
                 </tr>))}
             </tbody>
             <tfoot>
                         <tr>
                            <td className="text-bold">Total </td>
                            <td></td>
                            <td>{totalUpworkHours(progress)}</td>
                            <td>{totalFixedHours(progress)}</td>
                            <td className="text-success text-bold"><b>{totalBilledHours(progress)}</b></td>
                            <td className="text-danger">{totalNonBilledHours(progress)}</td>
                         </tr>
                     </tfoot>
            </table>
          
         // ))

          
        ))
       ):(<p>No record found.</p>)}
        </Modal.Body>
        <Modal.Footer>
         
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EmployeeProgressDetails;
