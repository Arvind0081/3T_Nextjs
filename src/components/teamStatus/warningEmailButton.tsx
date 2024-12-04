'use client'
import { sendWarningMail } from '@/utils/publicApi';
import { WarningEmailModel } from '@/utils/types';
import React,{useState} from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';

const WarningEmailButton=({data,setCheckedEmployes}:any)=>{

    const [canvas,setCanvas]=useState(false);
    const [description,setDescription]=useState('');

    const handleHideCanvas=()=>{
        setCanvas(false);
        setDescription('');
    };

    const handleDescription=(e:any)=>{
        setDescription(e.target.value);
    };

    const handleSendMail=async()=>{
        const payload:WarningEmailModel={
            employeeId: data,
            description: description
          }
        
 try {
    await sendWarningMail(payload);
    handleHideCanvas();
    setCheckedEmployes([])
 } catch (error) {}
    };

    return(
        <>
        <button type="button" className="btn btn-primary btn-wave" onClick={()=>setCanvas(true)}><i
                                        className="ri-send-plane-line me-2 align-middle"></i>Send Warning
                                    Mail</button>
                                    <Offcanvas show={canvas} onHide={() => handleHideCanvas()} placement='end'>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          {'Send Warning Mail'}
        </Offcanvas.Title>
        <button
          type='button'
          className='btn-close text-reset text-right'
          onClick={() => handleHideCanvas()}
        >
          <i className='fe fe-x fs-18'></i>
        </button>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <>
        <div className="offcanvas-body">
                                <div className="row">
                                    <div className="col-md-12 form-group">
                                        <label>Description</label>
                                        <textarea className="form-control" value={description} onChange={handleDescription}
                                            style={{height: '500px'}}></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="offcanvas-footer text-right">
                                <button type="submit" className="btn btn-danger" onClick={handleHideCanvas}>Cancel</button>
                                <button type="submit" className="btn btn-primary"onClick={handleSendMail}>Submit</button>
                            </div>
      </>
     
                     
                   
      </Offcanvas.Body>
    </Offcanvas>
                                    </>
    )
}

export default WarningEmailButton;