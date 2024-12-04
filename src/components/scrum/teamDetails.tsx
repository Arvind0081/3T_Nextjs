'use client'
import { ScrumTeamPerFormanceResponseModel } from '@/utils/types';
import Link from 'next/link';
import Image from 'next/image';
import React,{useState,useEffect} from 'react';
import getUser from '@/utils/getUserClientSide';
import EmployeeProgressDetailsButton from '@/components/dashboard/employeeProgressDetailsButton';
import { Modal} from 'react-bootstrap';
import apiService from '@/services/apiService';
import { useRouter } from 'next/navigation';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
const ScrumTeamDetails=({teamPerformance,payLoad,employeeDetails,performanceBadgesList,teamProductivity}:any)=>{

    const user: any = getUser();
    const router = useRouter();

  
  const productiveHours = teamProductivity.filter((item:any)=>item.teamLeadId===payLoad.teamLeadId)[0].productivityHours;
  const expectedProductivity = teamProductivity.filter((item:any)=>item.teamLeadId===payLoad.teamLeadId)[0].expectedProductivityHours;
  const productivityPercentage = teamProductivity.filter((item:any)=>item.teamLeadId===payLoad.teamLeadId)[0].productivityPercentage.toFixed(2);

  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' |string}>({ key: '', direction: '' });

    const [searchValue,setSearchValue]=useState('');
    const[debounceSearchValue,setDebounceSearchValue]=useState('');
    const [teamDetails,setTeamDetails]=useState<any[]>([]);
    const [showAwards,setShowAwards]=useState(false);
    const [showWarnings,setShowWarnings]=useState(false);
    const [selectedEmployee,setSelectedEmployee]=useState<any>({});

    const [selectedAward,setSelectedAward]=useState<any>({});
    const [description,setDescription]=useState('');

    const awardsList=performanceBadgesList.filter((item:any)=>!item.badgeName.includes('Warning'));
    const warningList=performanceBadgesList.filter((item:any)=>item.badgeName.includes('Warning'));

    const numberToTimeConversion = (decimalTime: any) => {
        const hours = Math.floor(decimalTime);
        const fractionalHours = decimalTime - hours;
        const minutes = Math.round(fractionalHours * 60);
    
        // Format time string to HH:mm
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        return formattedTime;
      };

      useEffect(()=>{setTeamDetails(teamPerformance);}
      
      // eslint-disable-next-line react-hooks/exhaustive-deps
      ,[]);


      
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setDebounceSearchValue(searchValue);
        }, 1000);

        return () => clearTimeout(delayDebounceFn);
}, [searchValue]);

useEffect(() => {
    handleSearch();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [debounceSearchValue]);

      const handleSearch=()=>{
    
        if(debounceSearchValue){
            const data=teamPerformance.filter((item:ScrumTeamPerFormanceResponseModel)=> item.name.toLocaleLowerCase().includes(debounceSearchValue.toLocaleLowerCase()));
            setTeamDetails(data);
        }else{
            setTeamDetails(teamPerformance);
        }
      };

      const totalUpworkHours=()=>{
        return numberToTimeConversion(
            teamDetails?.map((item: ScrumTeamPerFormanceResponseModel) => item.upworkHours)
              .reduce((a: number, b: number) => a + b, 0)
          );
      };

      const totalFixedHours=()=>{
        return numberToTimeConversion(
            teamDetails?.map((item: ScrumTeamPerFormanceResponseModel) => item.fixedHours)
              .reduce((a: number, b: number) => a + b, 0)
          );
      };

      const totalBilledHours=()=>{
        return numberToTimeConversion(
            teamDetails?.map((item: ScrumTeamPerFormanceResponseModel) =>(item.upworkHours + item.fixedHours))
              .reduce((a: number, b: number) => a + b, 0)
          );
      };

      const totalNonBilledHours=()=>{
        return numberToTimeConversion(
            teamDetails?.map((item: ScrumTeamPerFormanceResponseModel) =>item.nonBillableHours)
              .reduce((a: number, b: number) => a + b, 0)
          );
      };

    
    const handleClose=()=>{
        setDescription('');
        setShowAwards(false);
        setShowWarnings(false);
        setSelectedAward({});
    }
    
    const handleSubmit=async()=>{
        if(selectedEmployee){
            try {
               const data= { id: 0,
                badgeId: selectedAward.id,
                userId: selectedEmployee.employeeId,
                badgeDescription:description,
            }
                  await apiService.post('/Employee/AssignAward', data);
                router.refresh();
          
                handleClose();
              } catch (error) {
                console.error('Error occurred during assigning award:', error);
              }
        }

    };

    const handleDescription =(e:any)=>{
          setDescription(e.target.value);
    } ;

     // Sorting logic
     const sortedTeamDetails = () => {

      if(teamDetails){

         
      // Directly copying the teamDetails array
      const sortedData = [...teamDetails];
    
      const { key, direction } = sortConfig;
    
      if (key) {
        sortedData.sort((a, b) => {
          const aValue = a[key];
          const bValue = b[key];
    
          // Handling cases where the key might not exist in an object
          if (aValue === undefined || bValue === undefined) return 0;
    
          // Sorting numeric values
          if (typeof aValue === 'number' && typeof bValue === 'number') {
            return direction === 'asc' ? aValue - bValue : bValue - aValue;
          }
    
          // Sorting string values
          if (typeof aValue === 'string' && typeof bValue === 'string') {
            return direction === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
          }
    
          // Optional: Handle mixed types or fallback (if necessary)
          return 0; // Default case if types don't match
        });
      }
    
      return sortedData;

      }
    
    };
    


 const requestSort = (key: string) => {
   let direction: 'asc' | 'desc' = 'asc';
   if (sortConfig.key === key && sortConfig.direction === 'asc') {
     direction = 'desc';
   }
   setSortConfig({ key, direction });
 };

    return(
        <>
        <div className="row">
<div className="col-xl-12">
    <div className="card custom-card team_card">
        <div className="card-header justify-content-between awards_card_header">
            <div className="card-title">{employeeDetails.firstName}{' '}{employeeDetails.lastName}`s Team ({productiveHours}/{expectedProductivity})<span
                                    className="badge badge-xs badge-primary">{productivityPercentage} %</span></div>
            <div className="filter-right">
                <div className="search_box">
                    <i className="ri-search-line"></i>
                    <input className="form-control form-control-sm" type="text"
                        placeholder="Search Here" value={searchValue} onChange={(e)=>setSearchValue(e.target.value)}/>
                </div>
            </div>
        </div>
        <div className="card-body">
            <div className="table-responsive theme_table ">
               
                <table
                    className="table text-nowrap table-hover border table-bordered">
                    <thead>
                        <tr>
                            <th  onClick={() => requestSort('name')}>Developer Name {sortConfig.key !== 'name'?<FaSort /> :(sortConfig.key === 'name' && sortConfig.direction === 'asc')?  <FaSortDown />  : <FaSortUp />  }</th>
                            <th scope="col" onClick={() => requestSort('upworkHours')}>Upwork Hours {sortConfig.key !== 'upworkHours'?<FaSort /> :(sortConfig.key === 'upworkHours' && sortConfig.direction === 'asc')?  <FaSortDown />  : <FaSortUp />  }</th>
                            <th scope="col" onClick={() => requestSort('fixedHours')}>Fixed Billing Hours {sortConfig.key !== 'fixedHours'?<FaSort /> :(sortConfig.key === 'fixedHours' && sortConfig.direction === 'asc')?  <FaSortDown />  : <FaSortUp />  }</th>
                            <th scope="col" onClick={() => requestSort('nonBillableHours')}>Non Billable Hours {sortConfig.key !== 'nonBillableHours'?<FaSort /> :(sortConfig.key === 'nonBillableHours' && sortConfig.direction === 'asc')?  <FaSortDown />  : <FaSortUp />  }</th>
                            <th scope="col" onClick={() => requestSort('totalBilling')}>Billing Hours {sortConfig.key !== 'totalBilling'?<FaSort /> :(sortConfig.key === 'totalBilling' && sortConfig.direction === 'asc')?  <FaSortDown />  : <FaSortUp />  }</th>
                            <th scope="col" onClick={() => requestSort('productivityPercentage')}>Productivity% {sortConfig.key !== 'productivityPercentage'?<FaSort /> :(sortConfig.key === 'productivityPercentage' && sortConfig.direction === 'asc')?  <FaSortDown />  : <FaSortUp />  }</th> 
                            <th scope="col" >Details</th>
                            <th scope="col">Assign Awards</th>
                        </tr>
                    </thead>
                    <tbody>
                       {sortedTeamDetails()?.map((item:ScrumTeamPerFormanceResponseModel)=>(
                        <tr key={item.employeeId}>
                        <td><Link href={user?.id===item.employeeId?'/profile':`/employees/${item.employeeId}`}>{item.name}</Link></td>
                        <td>{numberToTimeConversion(item.upworkHours)}</td>
                        <td>{numberToTimeConversion(item.fixedHours)}</td>
                        <td><span className="text-danger">{numberToTimeConversion(item.nonBillableHours)}</span></td>
                        <td className="text-success text-bold">
                            <b>{numberToTimeConversion(Number(item.totalBilling))}</b>
                        </td>
                        <td className="text-success text-bold">
                            <b>{item.productivityPercentage.toFixed(2)}%</b>
                        </td>
                        <td>
                            <EmployeeProgressDetailsButton id={item.employeeId} payLoad={payLoad} name={item.name}/>
                        </td>
                        <td>
                                             <div className="icon_btn_outer d-flex items-center gap-x-2">
                                                <button onClick={()=>{setShowAwards(true);setSelectedEmployee(item);}}
                                                   className="action_successLink icon_btn icon_PrimaryBtn"
                                                   data-bs-target="#RewardAwards" data-bs-toggle="modal"><svg
                                                      xmlns="http://www.w3.org/2000/svg" version="1.0"
                                                      width="20.000000pt" height="20.000000pt"
                                                      viewBox="0 0 512.000000 512.000000"
                                                      preserveAspectRatio="xMidYMid meet">

                                                      <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                                         fill="CurrentColor" stroke="none">
                                                         <path
                                                            d="M2405 5114 c-16 -2 -66 -9 -110 -15 -560 -73 -1072 -411 -1377 -909 -260 -426 -340 -959 -217 -1455 167 -672 713 -1220 1389 -1390 302 -76 664 -74 955 5 336 91 619 254 865 500 367 365 561 832 562 1350 1 515 -199 996 -563 1358 -288 286 -647 470 -1049 537 -91 15 -393 28 -455 19z m194 -644 c19 -5 45 -19 57 -31 13 -12 102 -148 199 -303 l176 -282 317 -78 c174 -44 329 -85 343 -92 66 -33 101 -112 80 -177 -7 -19 -107 -148 -229 -294 l-218 -259 24 -330 c12 -181 20 -344 17 -362 -13 -71 -104 -133 -171 -116 -14 4 -164 62 -332 129 l-305 122 -306 -124 c-336 -138 -368 -145 -433 -105 -20 12 -44 39 -54 60 -17 36 -17 49 5 379 13 195 19 347 15 355 -5 8 -99 122 -209 252 -110 131 -208 252 -217 269 -39 69 -8 163 65 197 23 11 179 54 347 96 168 41 310 81 317 87 7 7 87 131 178 277 91 146 177 277 191 292 22 24 64 44 99 47 6 1 25 -3 44 -9z" />
                                                         <path
                                                            d="M2430 3838 c-68 -110 -138 -212 -156 -227 -26 -23 -71 -38 -265 -86 -129 -32 -237 -60 -241 -62 -4 -2 64 -89 152 -194 111 -132 162 -200 169 -227 6 -25 4 -112 -7 -274 -13 -175 -14 -238 -6 -238 6 0 105 38 220 85 115 47 227 88 249 91 34 4 76 -9 273 -89 232 -93 232 -93 232 -68 0 14 -7 128 -16 252 -15 209 -15 229 0 260 9 19 84 114 166 212 83 98 150 182 150 185 0 4 -105 33 -233 65 -128 32 -246 67 -262 77 -19 12 -76 92 -159 225 -71 113 -132 207 -135 209 -4 3 -62 -86 -131 -196z" />
                                                         <path
                                                            d="M566 1321 c-236 -473 -249 -500 -243 -541 6 -47 28 -82 71 -114 26 -20 42 -21 417 -24 l389 -3 225 -299 c124 -165 236 -307 249 -315 59 -39 146 -27 192 27 24 29 474 917 474 936 0 5 -44 14 -97 21 -492 64 -1009 342 -1337 720 -44 50 -83 91 -86 91 -3 0 -117 -224 -254 -499z" />
                                                         <path
                                                            d="M4166 1684 c-146 -153 -231 -225 -386 -329 -255 -171 -548 -286 -859 -339 -52 -9 -105 -16 -118 -16 -13 0 -23 -5 -23 -10 0 -6 103 -216 229 -469 168 -334 238 -465 261 -484 52 -45 124 -47 179 -7 14 10 125 151 246 314 l220 295 375 1 c342 0 379 2 415 19 22 10 47 27 56 37 25 28 41 88 33 120 -6 26 -491 1005 -497 1004 -1 -1 -60 -62 -131 -136z" />
                                                      </g>
                                                   </svg>
                                                </button>
                                                <button onClick={()=>{setShowWarnings(true);setSelectedEmployee(item);}}
                                                   className="action_deleteLink icon_btn icon_DeleteBtn"
                                                   data-bs-target="#WarningAwards" data-bs-toggle="modal"><svg
                                                      xmlns="http://www.w3.org/2000/svg" version="1.0"
                                                      width="20.000000pt" height="20.000000pt"
                                                      viewBox="0 0 512.000000 512.000000"
                                                      preserveAspectRatio="xMidYMid meet">

                                                      <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                                         fill="CurrentColor" stroke="none">
                                                         <path
                                                            d="M2404 4956 c-79 -18 -169 -55 -241 -97 -68 -41 -175 -145 -224 -220 -52 -77 -1858 -3402 -1887 -3472 -88 -217 -57 -487 79 -687 110 -160 257 -263 444 -310 79 -19 112 -20 1985 -20 1873 0 1906 1 1985 20 157 40 296 126 398 248 56 67 130 212 152 297 37 146 27 318 -27 452 -44 107 -1860 3435 -1916 3511 -91 122 -222 213 -377 262 -90 28 -281 36 -371 16z m282 -1240 c61 -28 115 -82 146 -145 l23 -46 0 -825 c0 -818 0 -825 -21 -871 -30 -63 -79 -116 -138 -147 -44 -23 -63 -27 -136 -27 -73 0 -92 4 -136 27 -59 31 -108 84 -138 147 -21 46 -21 53 -21 871 l0 825 23 46 c75 153 245 214 398 145z m0 -2400 c61 -28 115 -82 146 -145 31 -62 32 -176 2 -242 -29 -63 -79 -116 -138 -147 -44 -23 -63 -27 -136 -27 -73 0 -92 4 -136 27 -59 31 -109 84 -138 147 -30 66 -29 180 2 242 75 153 245 214 398 145z" />
                                                      </g>
                                                   </svg>
                                                </button>
                                             </div>
                                          </td>
                    </tr>
                       ))}
                       
                    </tbody>
                    <tfoot>
                        <tr>
                           <td className="text-bold">Total </td>
                           <td>{totalUpworkHours()}</td>
                           <td>{totalFixedHours()}</td>
                           <td className="text-danger">{totalNonBilledHours()}</td>
                           <td className="text-success text-bold"><b>{totalBilledHours()}</b></td>
                         
                           <td></td>
                        </tr>
                     </tfoot>
                </table>
            </div>
        </div>
    </div>
</div>
</div>
        <Modal show={showAwards} backdrop='static' onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedEmployee?.name}`s Rewards</Modal.Title>
          <button aria-label="Close" className="btn-close position-absolute"
                                 data-bs-dismiss="modal"><span aria-hidden="true">&times;</span></button>
        </Modal.Header>
        <Modal.Body>
        <div className="modal-body text-center p-4 pb-5">
                              <ul className="awards_description">
                                 {awardsList.map((item:any)=>(<li key={item.id}>
                                    <div className="awards_list">
                                       <div className="input_box">
                                          <label className="custom-control custom-radio">
                                             <input type="radio" className="custom-control-input" name="example-radios" onChange={()=>setSelectedAward(item)}
                                                value="option1" checked={selectedAward.id===item.id}/>
                                             <span className="custom-control-label"></span>
                                          </label>
                                       </div>
                                       <div className="awards_img"> <Image src={`data:image/png;base64,${item.badgeImage}`} alt=''  width={50} height={50} />
                                       </div>
                                       <div className="awards_description">
                                          <h6>{item.badgeName}</h6>
                                          {/* <p>Lorem Ipsum is simply dummy text of the printing and typesetting
                                             industry. Lorem Ipsum has been the industry`s standard dummy
                                             text ever since the 1500s, when an unknown printer took a galley
                                             of type and scrambled it to make a type specimen book. It has
                                             survived not only five centuries.
                                          </p> */}
                                       </div>
                                    </div>
                                 </li>))}
                               
                              </ul>
                              <div className="user_Awardsdesc">
                                 <div className="user_name"><label className="mb-1">To:</label>
                                    <span>{selectedEmployee.email}</span></div>
                                 <div className="user_name"><label className="mb-1">CC:</label>
                                    <span>hr@cssoftsolutions.com</span></div>
                                 <div className="AddDescription_box">
                                    <label className="mb-1">Description</label>
                                    <textarea className="form-control h80" onChange={handleDescription}></textarea>
                                 </div>
                              </div>
                           </div>
                           <div className="modal-footer pt-2 pb-2">
                              <div className="text-right">
                                 <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                                 <button type="button" className="btn btn-danger" onClick={handleClose} >Cancel</button>
                              </div>
                           </div>

        </Modal.Body>
       
      </Modal>

      <Modal show={showWarnings} backdrop='static' onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedEmployee?.name}`s Rewards</Modal.Title>
          <button aria-label="Close" className="btn-close position-absolute"
                                 data-bs-dismiss="modal"><span aria-hidden="true">&times;</span></button>
        </Modal.Header>
        <Modal.Body>
        <div className="modal-body text-center p-4 pb-5">
                              <ul className="awards_description">
                                 {warningList.map((item:any)=>(
                                    <li key={item.id}>
                                    <div className="awards_list">
                                       <div className="input_box">
                                          <label className="custom-control custom-radio">
                                             <input type="radio" className="custom-control-input" name="example-radios" onChange={()=>setSelectedAward(item)}
                                                value="option1" checked={selectedAward.id===item.id}/>
                                             <span className="custom-control-label"></span>
                                          </label>
                                       </div>
                                       <div className="awards_img">  <Image src={`data:image/png;base64,${item.badgeImage}`} alt=''  width={50} height={50} />
                                       </div>
                                       <div className="awards_description">
                                          <h6>{item.badgeName}</h6>
                                          {/* <p>Lorem Ipsum is simply dummy text of the printing and typesetting
                                             industry. Lorem Ipsum has been the industry`s standard dummy
                                             text ever since the 1500s, when an unknown printer took a galley
                                             of type and scrambled it to make a type specimen book. It has
                                             survived not only five centuries.
                                          </p> */}
                                       </div>
                                    </div>
                                 </li>

                                 ))}
                                
                              </ul>
                              <div className="user_Awardsdesc">
                                 <div className="user_name"><label className="mb-1">To:</label>
                                    <span>{selectedEmployee.email}</span></div>
                                 <div className="user_name"><label className="mb-1">CC:</label>
                                    <span>hr@cssoftsolutions.com</span></div>
                                 <div className="AddDescription_box">
                                    <label className="mb-1">Description</label>
                                    <textarea className="form-control h80" onChange={handleDescription}></textarea>
                                 </div>
                              </div>
                           </div>
                           <div className="modal-footer pt-2 pb-2">
                              <div className="text-right">
                                 <button type="button" className="btn btn-primary" onClick={handleSubmit} >Submit</button>
                                 <button type="button" className="btn btn-danger" onClick={handleClose}>Cancel</button>
                              </div>
                           </div>

        </Modal.Body>
       
      </Modal>
        </>

    )
}

export default ScrumTeamDetails;















