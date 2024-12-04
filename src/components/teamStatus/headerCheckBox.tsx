'use client'
import React from 'react';

const HeaderCheckBox=({allCheckedEmployes,handleAllCheckedEmployes}:any)=>{
 
    const handleAllChecked=()=>{
 
        handleAllCheckedEmployes(!allCheckedEmployes);
    }
    return(
        <>
          <input
                                      type="checkbox"
                                      className="custom-control-input"
                                      checked={allCheckedEmployes}
                                      onChange={() =>handleAllChecked() }
                                    />
                                    <span className="custom-control-label"></span>
        </>
    )
}

export default HeaderCheckBox;