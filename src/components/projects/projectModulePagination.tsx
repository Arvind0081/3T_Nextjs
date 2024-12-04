'use client'
import React from 'react';
// import {useRouter,usePathname} from 'next/navigation';
import {Pagination} from 'semantic-ui-react';

const Paginator=({totalRecords,count,pageSize,pageNumber,setPageNumber}:any)=>{

    // const router=useRouter();
    //   const url=usePathname();
  

  const state = {
      showEllipsis: true,
      showFirstAndLastNav: true,
      showPreviousAndNextNav: true,
  }

  const totalPages = () => {
 
    let totalPagesCount = totalRecords / pageSize;
    totalPagesCount = totalPagesCount % 1 === 0 ? totalPagesCount : Math.ceil(totalPagesCount);
 if(count>0){
    if(totalRecords === 0 ){

        setPageNumber(pageNumber>1?pageNumber-1:1);
    //     const moduleStatusString = Array.isArray(data.moduleStatus)
    //     ? data.moduleStatus.join('&ModuleStatus=')
    //     : data.moduleStatus;
     
    //     const paymentStatusString = Array.isArray(data.paymentStatus)
    //     ? data.paymentStatus.join('&PaymentStatus=')
    //     : data.paymentStatus;
     
    //     router.push(`${url}/?ProjectId=${data.id}&ModuleStatus=${moduleStatusString}&PaymentStatus=${paymentStatusString}&BillingStartDate=${data.billingStartDate}&BillingEndDate=${data.billingEndDate}&StatusStartDate=${data.statusStartDate}&StatusEndDate=${data.statusEndDate}&PageSize=${data.pageSize}&PageNumber=${data.pageNumber>1?data.pageNumber-1:1}&SearchValue=${data.searchValue}`);
    //  router.refresh();
 
    }
 }
   
    return totalPagesCount;
};

const handlePaginationChange = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,{ activePage }:any) =>{

    setPageNumber(activePage);
//     const moduleStatusString = Array.isArray(data.moduleStatus)
//     ? data.moduleStatus.join('&ModuleStatus=')
//     : data.moduleStatus;
 
//     const paymentStatusString = Array.isArray(data.paymentStatus)
//     ? data.paymentStatus.join('&PaymentStatus=')
//     : data.paymentStatus;
 
//     router.push(`${url}/?ProjectId=${data.id}&ModuleStatus=${moduleStatusString}&PaymentStatus=${paymentStatusString}&BillingStartDate=${data.billingStartDate}&BillingEndDate=${data.billingEndDate}&StatusStartDate=${data.statusStartDate}&StatusEndDate=${data.statusEndDate}&PageSize=${data.pageSize}&PageNumber=${activePage}&SearchValue=${data.searchValue}`);
//  router.refresh();

};  

    return(
<Pagination
            activePage={pageNumber}
            onPageChange={handlePaginationChange}
            size='mini'
            totalPages={totalPages()}
            // Heads up! All items are powered by shorthands, if you want to hide one of them, just pass `null` as value
            ellipsisItem={state.showEllipsis ? undefined : null}
            firstItem={state.showFirstAndLastNav ? undefined : null}
            lastItem={state.showFirstAndLastNav ? undefined : null}
            prevItem={state.showPreviousAndNextNav ? undefined : null}
            nextItem={state.showPreviousAndNextNav ? undefined : null}
          />
    )
}

export default Paginator;