'use client'
import React from 'react';
const TableCheckBox=({id,checkedEmployes,handleCheckboxChange}:any)=>{
    
    return(
        <>
         <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        checked={checkedEmployes.includes(id)}
                                        onChange={() => handleCheckboxChange(id)}
                                      />
                                      <span className="custom-control-label"></span>
        </>
    )
}

export default TableCheckBox;