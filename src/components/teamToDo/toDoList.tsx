'use client'
import { addToDoList, teamsToDo } from '@/utils/publicApi';
import { AddToDoPayloadModel, TeamToDoModel, todoParam } from '@/utils/types';
import React, { useState } from 'react';
import getUser from '@/utils/getUserClientSide';

const ToDoList = () => {
  const [teamToDoList, setTeamToDoList] = useState<TeamToDoModel[]>([]);
  const [localToDos, setLocalToDos] = useState<{ [key: string]: string }>({});
  let token:any;
  token = getUser();

  let data: todoParam = {
  departmentId: token.departmentId,
  teamAdminId: '',
  };
  const getTeamToDo = async () => {
  
    const response = await teamsToDo(data);
    setTeamToDoList(response);
    const initialToDos = response.reduce((acc, member) => {
      acc[member.employeeId] = member?.toDoList?.name || '';
      return acc;
    }, {} as { [key: string]: string });
    setLocalToDos(initialToDos);
  };

  // useEffect(() => {
  //   getTeamToDo();
  // }, []);

  const handleToDoList = async (e: React.ChangeEvent<HTMLTextAreaElement>, id: string) => {
    const newValue = e.target.value;
    const payload: AddToDoPayloadModel = {
      toDo: newValue,
      assignedToId: id
    };
    await addToDoList(payload);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>, id: string) => {
    setLocalToDos({
      ...localToDos,
      [id]: e.target.value
    });
  };

  const handleRefresh = () => {
    getTeamToDo();
  };

  return (
    <div className="main-container container-fluid">
      <div className="row">
        <div className="col-xl-12">
          <div className="card custom-card team_card">
            <div className="card-header justify-content-between">
              <div className="card-title">{'To do\'s'}</div>
              <div className="mb-2">
                <i onClick={handleRefresh} className="bi bi-arrow-clockwise fs-18"></i>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                {teamToDoList.map((member: TeamToDoModel) => (
                  <div key={member.employeeId} className="col-xs-12 col-sm-6 col-lg-4 col-xl-3">
                    <div className="form-group">
                      <label className="f14 fw-semibold mb-1">{member.employeeName}</label>
                      <textarea
                        onBlur={(e) => handleToDoList(e, member.employeeId)}
                        onChange={(e) => handleChange(e, member.employeeId)}
                        placeholder="To-Do's"
                        value={localToDos[member.employeeId]}
                        className="form-control h100 resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToDoList;
