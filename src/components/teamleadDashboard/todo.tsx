'use client'
import { addToDoList } from '@/utils/publicApi';
import { AddToDoPayloadModel } from '@/utils/types';
import React,{useState} from 'react';
import getUser from '@/utils/getUserClientSide';

const Todo=({assignedTask}:any)=>{
    const user:any=  getUser();
    const [toDo,setToDo]=useState(assignedTask);

    const handleToDoList=async(e: React.ChangeEvent<HTMLTextAreaElement>,id:string)=>{
        setToDo(e.target.value);
        const payload:AddToDoPayloadModel={
            toDo: e.target.value,
            assignedToId: id
        }
      
    await addToDoList(payload);
    
    };
    return (
        <div className='card custom-card team_card'>
        <div className='card-header justify-content-between'>
          <div className='card-title'>To do`s </div>
        </div>
        <div className='card-body'>
        <textarea onBlur={(e)=>handleToDoList(e,user.id)} placeholder="To-Do's" className="form-control h100 resize-none">{toDo}</textarea>
        </div>
      </div>
    )
}

export default Todo;