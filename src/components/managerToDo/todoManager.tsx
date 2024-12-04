'use client';
 
import React, { useState, useEffect, useCallback } from 'react';
import { AddToDoPayloadModel, TeamToDoModel, todoParam } from '@/utils/types';
import { addToDoList, teamsToDo } from '@/utils/publicApi';
import getUser from '@/utils/getUserClientSide';
import { useSearchParams } from 'next/navigation';
 
const ToDoManager = () => {
  const [teamToDoList, setTeamToDoList] = useState<TeamToDoModel[]>([]);
  const [localToDos, setLocalToDos] = useState<{ [key: string]: string }>({});
  const [teamLeadToDos, setTeamLeadToDos] = useState<{ [key: string]: string }>(
    {}
  );
  const [teamLeadNames, setTeamLeadNames] = useState<{ [key: string]: string }>(
    {}
  );
  const [teamLeadIds, setTeamLeadIds] = useState<Set<string>>(new Set());
 
  const token: any = getUser();
  const searchParams = useSearchParams();
  const teamAdminId: string = searchParams.get('teamAdminId') || '';
 
  // Fetch team To-Do list
  const getTeamToDo = useCallback(async () => {
    const data: todoParam = {
      departmentId: token.departmentId,
      teamAdminId: teamAdminId,
    };
 
    try {
      const response = await teamsToDo(data);
      setTeamToDoList(response);
 
      const teamLeadIdSet = new Set<string>(
        response
          .filter((member) => member.teamLeadId)
          .map((member) => member.teamLeadId as string)
      );
      setTeamLeadIds(teamLeadIdSet);
 
      const initialToDos = response.reduce(
        (acc, member) => {
          acc[member.employeeId] = member?.toDoList?.name || '';
          return acc;
        },
        {} as { [key: string]: string }
      );
 
      const initialTeamLeadToDos = response.reduce(
        (acc, member) => {
          if (member.teamLeadId === null) {
            acc[member.employeeId] = member?.toDoList?.name || '';
          }
          return acc;
        },
        {} as { [key: string]: string }
      );
 
      const initialTeamLeadNames = response.reduce(
        (acc: any, member: any) => {
          if (member.teamLeadId && member.teamLeadName) {
            acc[member.teamLeadId] = member.teamLeadName;
          }
          return acc;
        },
        {} as { [key: string]: string }
      );
 
      setLocalToDos(initialToDos);
      setTeamLeadToDos(initialTeamLeadToDos);
      setTeamLeadNames(initialTeamLeadNames);
    } catch (error) {
      console.error('Error fetching team ToDo list:', error);
    }
  }, [token.departmentId, teamAdminId]);
 
  useEffect(() => {
    getTeamToDo();
  }, [getTeamToDo]);
 
  // Handle To-Do list saving
  // const handleToDoList = async (id: string, isTeamLead: boolean = false) => {
  //   const newValue = isTeamLead ? teamLeadToDos[id] : localToDos[id];
 
  // const existingValue = teamToDoList.find((item) => item.employeeId === id)?.toDoList?.name;
 
  // if (!newValue.trim() && !existingValue) {
  //   console.warn(`Skipping save for ID: ${id} as value is empty and does not exist in DB`);
  //   return;
  // }
 
  //   const payload: AddToDoPayloadModel = {
  //     toDo: newValue,
  //     assignedToId: id,
  //   };
  //   console.log('Saving ToDo for:', id, 'Payload:', payload);
  //   try {
  //     await addToDoList(payload);
  //   } catch (error) {
  //     console.error('Error saving ToDo:', error);
  //   }
  // };
 
  const handleToDoList = async (id: string, isTeamLead: boolean = false) => {
    const newValue = (isTeamLead ? teamLeadToDos[id] : localToDos[id]).trim();
 
    const existingValue = teamToDoList.find((item) => item.employeeId === id)
      ?.toDoList?.name;
 
    if (!newValue.trim() && !existingValue) {
      console.warn(
        `Skipping save for ID: ${id} as value is empty and does not exist in DB`
      );
      return;
    }
 
    const payload: AddToDoPayloadModel = {
      toDo: newValue,
      assignedToId: id,
    };
 
    try {
      await addToDoList(payload);
      getTeamToDo();
    } catch (error) {
      console.error('Error saving ToDo:', error);
    }
  };
 
  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    id: string,
    isTeamLead: boolean = false
  ) => {
    if (isTeamLead) {
      setTeamLeadToDos((prev) => ({
        ...prev,
        [id]: e.target.value,
      }));
    } else {
      setLocalToDos((prev) => ({
        ...prev,
        [id]: e.target.value,
      }));
    }
  };
 
  const handleBlur = (id: string, isTeamLead: boolean = false) => {
    const value = (isTeamLead ? teamLeadToDos[id] : localToDos[id]).trim(); // Trim spaces
 
    const existingValue = teamToDoList.find((item) => item.employeeId === id)
      ?.toDoList?.name;
 
    if (!value && !existingValue) {
      // Reset to empty string to show placeholder
      if (isTeamLead) {
        setTeamLeadToDos((prev) => ({
          ...prev,
          [id]: '',
        }));
      } else {
        setLocalToDos((prev) => ({
          ...prev,
          [id]: '',
        }));
      }
    }
     else {
      if (isTeamLead) {
        setTeamLeadToDos((prev) => ({
          ...prev,
          [id]: value, // Save trimmed value
        }));
      } else {
        setLocalToDos((prev) => ({
          ...prev,
          [id]: value, // Save trimmed value
        }));
      }
 
      // Save To-Do even if the value is empty but exists in the database
      if (!value || value !== existingValue) {
        handleToDoList(id, isTeamLead);
      }
    }
  };
 
  const handleRefresh = () => {
    getTeamToDo();
  };
 
  // Group data by team lead
  // Group data by team lead
  // Group data by team lead
  const groupedData =
    teamToDoList?.reduce(
      (acc, item) => {
        const teamLeadId = item.teamLeadId || 'Unassigned';
        if (!acc[teamLeadId]) {
          acc[teamLeadId] = [];
        }
        acc[teamLeadId].push(item);
        return acc;
      },
      {} as { [key: string]: TeamToDoModel[] }
    ) || {}; // Default to an empty object if teamToDoList is undefined
 
  // Extract unassigned employees
  const unassignedEmployees = groupedData['Unassigned']
    ? groupedData['Unassigned'].filter(
        (member) => !teamLeadIds?.has(member?.employeeId)
      )
    : [];
 
  // Optional: Delete 'Unassigned' from groupedData if you no longer need it
  if (groupedData['Unassigned']) {
    delete groupedData['Unassigned'];
  }
 
  return (
    <div className="main-container container-fluid">
      <div className="row">
        <div className="col-xl-12">
          <div className="card custom-card team_card">
            <div className="card-header justify-content-between">
              <div className="card-title">{'To do`s'}</div>
              <div className="mb-2">
                <i
                  onClick={handleRefresh}
                  className="bi bi-arrow-clockwise fs-18"
                ></i>
              </div>
            </div>
            <div className="card-body">
              <div className="todo_layout">
                {Object.keys(groupedData).map(
                  (teamLeadId) =>
                    teamLeadId !== 'Unassigned' && (
                      <div key={teamLeadId} className="todo_content">
                        <div className="card-header justify-content-between">
                          <div className="card-title">{`${teamLeadNames[teamLeadId] || teamLeadId}'s Team`}</div>
                        </div>
                        <div className="card-body">
                          <div className="form-group">
                            <label className="f14 fw-semibold mb-1">
                              {teamLeadNames[teamLeadId] || teamLeadId}
                            </label>
                            <textarea
                              onBlur={() => handleBlur(teamLeadId, true)} // Modified to use handleBlur
                              onChange={(e) =>
                                handleChange(e, teamLeadId, true)
                              }
                              placeholder="Team Lead To-Do's"
                              value={teamLeadToDos[teamLeadId] || ''}
                              className="form-control h100 resize-none"
                            />
                          </div>
                          {groupedData[teamLeadId].map((member) => (
                            <div key={member.employeeId} className="form-group">
                              <label className="f14 fw-semibold mb-1">
                                {member.employeeName}
                              </label>
                              <textarea
                                onBlur={() => handleBlur(member.employeeId)} // Modified to use handleBlur
                                onChange={(e) =>
                                  handleChange(e, member.employeeId)
                                }
                                placeholder="To-Do's"
                                value={localToDos[member.employeeId] || ''}
                                className="form-control h100 resize-none"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                )}
                {unassignedEmployees.length > 0 && (
  <div className="todo_content">
    <div className="card-header justify-content-between">
      <div className="card-title">Unassigned</div>
    </div>
    <div className="card-body">
      {/* <div className="form-group">
        <label className="f14 fw-semibold mb-1">Unassigned Team</label>
        <textarea
          onBlur={() => handleBlur('Unassigned', true)} // Save on blur, isTeamLead true for consistency
          onChange={(e) => handleChange(e, 'Unassigned', true)} // Handle change
          placeholder="Team To-Do's"
          value={teamLeadToDos['Unassigned'] || ''} // Use `teamLeadToDos` for Unassigned group
          className="form-control h100 resize-none"
        />
      </div> */}
      {unassignedEmployees.map((member) => (
        <div key={member.employeeId} className="form-group">
          <label className="f14 fw-semibold mb-1">{member.employeeName}</label>
          <textarea
            onBlur={() => handleBlur(member.employeeId)} // Save on blur
            onChange={(e) => handleChange(e, member.employeeId)} // Handle change
            placeholder="To-Do's"
            value={localToDos[member.employeeId] || ''} // Use `localToDos` for individual employees
            className="form-control h100 resize-none"
          />
        </div>
      ))}
    </div>
  </div>
)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default ToDoManager;