'use client';
import React, { useState, useEffect, useCallback } from 'react';
import apiService from '@/services/apiService';
import { useRouter } from 'next/navigation';

const AssignTeamMember = ({ employees }: any) => {
  const router = useRouter();
  const [selectedTeamLead, setSelectedTeamLead] = useState('');
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [teamMemberSearch, setTeamMemberSearch] = useState<string>('');
  const [assignedEmployee, setAssignedEmployee] = useState<any>({});
  const [error, setError] = useState<string>('');

  const handleAssignedList = useCallback(async () => {
    if (selectedTeamLead) {
      const assignedEmp = await apiService.get(`/Setting/GetAssignedUsersByEmployeeId?employeeId=${selectedTeamLead}`);
      if (assignedEmp.model == null) {
        setSelectedEmployees([]);
      }
      setAssignedEmployee(assignedEmp);
    } 
  }, [selectedTeamLead]);

  useEffect(() => {
    if (selectedTeamLead) {
      handleAssignedList();
    }
  }, [selectedTeamLead, handleAssignedList]);

  useEffect(() => {
    if (assignedEmployee?.model) {
      const assignedIds = assignedEmployee?.model.map((emp: any) => emp.id);
      setSelectedEmployees(assignedIds);
    }
  }, [assignedEmployee]);

  const handleTeamLeadChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTeamLead(e.target.value);
    if (e.target.value) {
      setError('');
    }
  };

  const handleEmployeeCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedEmployees((prevSelectedEmployees) =>
      prevSelectedEmployees.includes(value)
        ? prevSelectedEmployees.filter((id) => id !== value)
        : [...prevSelectedEmployees, value]
    );
  };

  const handleAddTeamMembers = async () => {
    if (!selectedTeamLead) {
      setError('The TeamLeaderId field is required');
      return;
    }
    const data = {
      teamLeaderId: selectedTeamLead,
      employeeId: selectedEmployees,
    };

    try {
      await apiService.post('/Setting/AddTeamMemberToTeam', data);
      setError('');
      router.refresh();
    } catch (error) {
      console.error('Error occurred during assign team member:', error);
    }
  };

  const filteredTeammember = employees?.filter((employee: any) =>
    employee.id !== selectedTeamLead &&
    employee.name.toLowerCase().includes(teamMemberSearch.toLowerCase())
  );

  return (
    <div className='row'>
      <div className='col-xl-12'>
        <div className='card custom-card'>
          <div className='card-header justify-content-between'>
            <div className='card-title'>Assign Team</div>
            <div className='filter-right d-flex gap-x-2'>
              <div className='selectbox select_designation'>
                <select
                  className='form-control'
                  value={selectedTeamLead}
                  onChange={handleTeamLeadChange}
                >
                  <option value='' disabled>
                    Choose Team Lead
                  </option>
                  {employees?.map((employee: any) => (
                    <option key={employee.id} value={employee.id}>
                      {employee.name}
                    </option>
                  ))}
                </select>
                {error && <div className='text-danger'>{error}</div>}
              </div>
              <div className='search_box'>
                <i className="ri-search-line"></i>
                <input
                  className="form-control form-control-sm"
                  type="text"
                  placeholder="Search Employee"
                  value={teamMemberSearch}
                  onChange={(e) => setTeamMemberSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className='card-body'>
            <div className='settings_layout d-flex items-center'>
              {filteredTeammember?.map((employee: any) => (
                <div key={employee.id} className='settings_checkBox'>
                  <label className='custom-control custom-checkbox'>
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      name={`employee-checkbox-${employee.id}`}
                      value={employee.id}
                      checked={selectedEmployees.includes(employee.id)}
                      onChange={handleEmployeeCheckboxChange}
                    />
                    <span className='custom-control-label'>
                      {employee.name}
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className='card-footer'>
            <div className='text-right'>
              <button
                type='button'
                className='btn btn-primary btn-wave'
                onClick={handleAddTeamMembers}
              >
                <i className='ri-add-circle-fill me-2 align-middle'></i>
                Add Team Members
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignTeamMember;
