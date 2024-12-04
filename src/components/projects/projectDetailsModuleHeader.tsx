'use client'
import { ModuleStatusModel } from '@/utils/types';
import React,{useState,useEffect} from 'react';
 import Offcanvas from 'react-bootstrap/Offcanvas';
// import {useRouter,usePathname} from 'next/navigation';
import {AccordionTitle,AccordionContent,Accordion,Icon,AccordionTitleProps,} from 'semantic-ui-react';

import AddEditProjectModule from './addEditProjectModuleForm';
const ModuleHeader=({projectId,moduleFilter,setModuleFilter,paymentFilter,setPaymentFilter,setDebounceSearchValue,projectModuleStatus,projectPaymentsStatus,setPageNumber}:any)=>{

   // const router=useRouter();
   // const url=usePathname();

    const [filterOpen,setFilterOpen]=useState(false);
  
   // let paramsModuleData:string[]=[];
   // let paramsPaymentData:string[]=[];

   // if(Array.isArray(payload.moduleStatus)){
   //    paramsModuleData=[...payload.moduleStatus]
   // }
   // else{
   //    if(payload.moduleStatus!==''){ paramsModuleData=[payload.moduleStatus]}
   // }

   // if(Array.isArray(payload.paymentStatus)){
   //    paramsPaymentData=[...payload.paymentStatus]
   // }
   // else{
   //    if(payload.paymentStatus!==''){ paramsPaymentData=[payload.paymentStatus]} 
   // }
const [activeIndex,setActiveIndex]=useState<string | number | undefined>(0);
 const [findModuleFilter,setFindModuleFilter]=useState<string[]>(['Open']);
 const [findPaymentFilter,setFindPaymentFilter]=useState<string[]>(['Pending']);
const [addModule,setAddModule]=useState(false);
 const [searchInput,setSearchInput]=useState('');




const handleClick = (e: React.MouseEvent<HTMLDivElement>, titleProps: AccordionTitleProps) => {
   const { index } = titleProps
   const newIndex = activeIndex === index ? -1 : index

   setActiveIndex( newIndex);
 }

 const handleModuleFilter=(e: React.ChangeEvent<HTMLInputElement>)=>{

   if(findModuleFilter.includes(e.target.value)){
     let filter=  findModuleFilter.filter((item:any)=>item !==e.target.value);
      setFindModuleFilter(filter);
   }else{
      setFindModuleFilter([...findModuleFilter,e.target.value]);
   }
  
 }
 const handlePaymentFilter=(e: React.ChangeEvent<HTMLInputElement>)=>{

   if(findPaymentFilter.includes(e.target.value)){
      let filter=  findPaymentFilter.filter((item:any)=>item !==e.target.value);
      setFindPaymentFilter(filter);
    }else{
      setFindPaymentFilter([...findPaymentFilter,e.target.value]);
    }
   
 }

//  useEffect(()=>{
//    handleUpdatedPage(moduleFilter,paymentFilter);
//  // eslint-disable-next-line react-hooks/exhaustive-deps
//  },[]);

//  const handleUpdatedPage=(moduleFilter: any[],paymentFilter: any[])=>{
  
//    const moduleStatusString = moduleFilter.length>0
//    ? moduleFilter.join('&ModuleStatus=')
//    : '';

//    const paymentStatusString = paymentFilter.length>0
//    ? paymentFilter.join('&PaymentStatus=')
//    : '';

//    router.push(`${url}/?ProjectId=${payload.id}&ModuleStatus=${moduleStatusString}&PaymentStatus=${paymentStatusString}&BillingStartDate=${payload.billingStartDate}&BillingEndDate=${payload.billingEndDate}&StatusStartDate=${payload.statusStartDate}&StatusEndDate=${payload.statusEndDate}&PageSize=${payload.pageSize}&PageNumber=${payload.pageNumber}&SearchValue=${debounceSearchValue}`);
// router.refresh();
//  };

const handleFind=()=>{
 
   setFilterOpen(false);
   setModuleFilter(findModuleFilter);
   setPaymentFilter(findPaymentFilter);
}

const handleCancel=()=>{
   setPaymentFilter([]);
   setModuleFilter([]);
   setFilterOpen(false);
}

const handleResetFilter=()=>{
   setPaymentFilter([]);
   setModuleFilter([]);
}

const handleClearModuleFilter=(value:string)=>{
   if(moduleFilter.includes(value)){
      let filter=  moduleFilter.filter((item:any)=>item !==value);
     // handleUpdatedPage(filter,paymentFilter);
       setModuleFilter(filter);
    }
}

const handleClearPaymentFilter=(value:string)=>{
   if(paymentFilter.includes(value)){
      let filter=  paymentFilter.filter((item:any)=>item !==value);
     // handleUpdatedPage(moduleFilter,filter);
      setPaymentFilter(filter);
    }
}

const handleSearch=(e:any)=>{
   setSearchInput(e.target.value);
}

useEffect(()=>{
   const delayDebounceFn = setTimeout(() => {
      setDebounceSearchValue(searchInput);
      setPageNumber(1);
  }, 1000);

  return () => clearTimeout(delayDebounceFn);

// eslint-disable-next-line react-hooks/exhaustive-deps
},[searchInput]);


    return(
        <>
        <div className="card-header justify-content-between items-center">
        <div className="module-filter filter-left align-items-end d-flex gap-x-4">
          { moduleFilter.length>0 && <div className="filter-outer d-flex gap-x-2">
              <p className="fw-semibold mb-2 nowrap">Module Status</p>
              <div className="filter-content align-items-end d-flex gap-x-2">
                {moduleFilter?.map((item:any,index:number)=><span key={index} className="filter-option mb-2">{item}<i onClick={()=>handleClearModuleFilter(item)} className="bi bi-x"></i></span>)}
               
             </div>
           </div>}
           { paymentFilter.length>0 && <div className="filter-outer d-flex gap-x-2">
              <p className="fw-semibold mb-2 nowrap">Payment Status</p>
              <div className="filter-content align-items-end d-flex gap-x-2">
              {paymentFilter?.map((item:any,index:number)=><span key={index} className="filter-option mb-2">{item}<i onClick={()=>handleClearPaymentFilter(item)} className="bi bi-x"></i></span>)}
               
               
             </div>
           </div>}
        </div>
        <div className="filter-right d-flex gap-x-2">
        <div className="search_box mb-2">
                                    <i className="ri-search-line"></i>
                                    <input className="form-control form-control-sm" type="text" onChange={handleSearch} value={searchInput} placeholder="Search Module"/>
                                 </div>
           <div className="btn-list mt-md-0 mt-2">
              <button type="button" className="btn btn-primary btn-wave" data-bs-toggle="offcanvas" onClick={()=>setAddModule(true)}
                 data-bs-target="#AddModuleModal" aria-controls="AddModuleModal"><i className="bi bi-plus-circle"></i>Add Module</button>                                        
           </div>
           <span className="fs-20" onClick={()=>setFilterOpen(true)}><i className="bi bi-funnel me-2 align-middle"></i></span>
        </div>
     </div>
     <Offcanvas show={filterOpen} onHide={handleCancel} placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{'Filter'}</Offcanvas.Title>
          <button
                                            type='button'
                                            className='btn-close text-reset text-right'
                                            onClick={handleResetFilter}
                                        >
                                            Reset
                                        </button>
          <button
                                            type='button'
                                            className='btn-close text-reset text-right'
                                            onClick={handleCancel}
                                        >
                                            <i className='fe fe-x fs-18'></i>
                                        </button>
        </Offcanvas.Header>
        <Offcanvas.Body>
       
        <div className="offcanvas-body">
                                    <div className="sidebar_filter">
                                       <div className="accordion" id="accordionExample">
                                          <Accordion fluid styled>
        <AccordionTitle
          active={activeIndex === 0}
          index={0}
          onClick={handleClick}
        >
          <h2 className="accordion-header" id="headingOne">
                                                <button className="accordion-button" type="button">
                                                       <span className="d-flex align-items-center gap-x-2">Module Status   <Icon name='dropdown' /></span>
                                                      </button>
                                             </h2>
        </AccordionTitle>
        <AccordionContent active={activeIndex === 0}>
   
                                                      <ul className="">
                                                        {projectModuleStatus.map((item:ModuleStatusModel,index:number)=>
                                                      <li key={index}>
                                                      <span className=""><input value={item.value} checked={findModuleFilter.includes(item.value)} onChange={(e)=>handleModuleFilter(e)} type="checkbox"/> {item.text}</span>
                                                   </li>)} 
                                                      </ul>                    
        </AccordionContent>

        <AccordionTitle
          active={activeIndex === 1}
          index={1}
          onClick={handleClick}
        >
          <h2 className="accordion-header" id="headingOne">
                                                <button className="accordion-button" type="button">
                                                       <span className="d-flex align-items-center gap-x-2">Payment Status   <Icon name='dropdown' /></span>
                                                      </button>
                                             </h2>
        </AccordionTitle>
        <AccordionContent active={activeIndex === 1}>
        <ul className="">
                                                        {projectPaymentsStatus.map((item:ModuleStatusModel,index:number)=>
                                                      <li key={index}>
                                                      <span className=""><input checked={findPaymentFilter.includes(item.value)} onChange={(e)=>handlePaymentFilter(e)} value={item.value} type="checkbox"/> {item.text}</span>
                                                   </li>)} 
                                                      </ul>
        </AccordionContent>
      </Accordion>
                                      </div>
                                    </div>
                              </div>
                              <div className="offcanvas-footer text-right">
                                 <button type="submit" className="btn btn-primary" onClick={handleFind}>Find</button>
                                <button type="submit" className="btn btn-danger" onClick={handleCancel}>Cancel</button>
                              </div>                       
        </Offcanvas.Body>
      </Offcanvas>
<AddEditProjectModule  projectId={projectId} addModule={addModule} setAddModule={setAddModule}  projectModuleStatus={projectModuleStatus} projectPaymentsStatus={projectPaymentsStatus}/>
     
     </>
    )
}
export default ModuleHeader;