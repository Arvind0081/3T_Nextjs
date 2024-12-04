'use client';
import React, { useState } from 'react';
import apiService from '@/services/apiService';
import { useRouter } from 'next/navigation';
const AssignProjectMember = ({ projectDetails, teamLeadAndBDMList }: any) => {
  const router = useRouter();

  const [selectedProjects, setSelectedProjects] = useState<number[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [projectSearch, setProjectSearch] = useState('');
  const [teamLeadSearch, setTeamLeadSearch] = useState('');
  const [bdmSearch, setBdmSearch] = useState('');
  

  const handleProjectCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = Number(e.target.value);
    setSelectedProjects((prevSelectedProjects) =>
      prevSelectedProjects.includes(value)
        ? prevSelectedProjects.filter((id) => id !== value)
        : [...prevSelectedProjects, value]
    );
  };

  const handleEmployeeCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setSelectedEmployees((prevSelectedEmployees) =>
      prevSelectedEmployees.includes(value)
        ? prevSelectedEmployees.filter((id) => id !== value)
        : [...prevSelectedEmployees, value]
    );
  };

  const handleAddProjectMembers = async () => {
   
    const data = {
      projectId: selectedProjects,
      employeeId: selectedEmployees,
    };
    // if (selectedEmployees[0] == undefined) {
    //   toastr.error('The Employees field is empty', '', { timeOut: 1000 });
    //   return;
    // }

    try {
      await apiService.post('/Setting/AddTeamMembersInProject', data);
      setSelectedProjects([]);
      setSelectedEmployees([]);

      router.refresh();
    } catch (error) {
      console.error('Error occurred during assign project:', error);
    }

  };

  const filteredProjects = projectDetails?.filter((project: any) =>
    project.name.toLowerCase().includes(projectSearch.toLowerCase())
  );

  const filteredTeamLeads = teamLeadAndBDMList.teamLead.filter((teamLead: any) =>
    teamLead.name.toLowerCase().includes(teamLeadSearch.toLowerCase())
  );

  const filteredBDMs = teamLeadAndBDMList.bdm.filter((bdm: any) =>
    bdm.name.toLowerCase().includes(bdmSearch.toLowerCase())
  );

  return (
    <div className="side-app">
      <div className="main-container container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card custom-card">
              <div className="card-header justify-content-between">
                <div className="card-title">Assign Project</div>
              </div>
              <div className="card-body">
                <div className="teams_content">
                  <div className="d-flex justify-content-between w-100 align-items-center">
                    <h6 className="text-semi-bold text-underline">
                      Project Name
                    </h6>
                    <div className="search_box mb-4">
                      <i className="ri-search-line"></i>
                      <input
                        className="form-control form-control-sm"
                        type="text"
                        placeholder="Search Project"
                        value={projectSearch}
                        onChange={(e) => setProjectSearch(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="settings_layout d-flex items-center">
                    {filteredProjects?.map((project: any) => (
                      <div key={project.id} className="settings_checkBox">
                        <label className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            name={`project-checkbox-${project.id}`}
                            value={project.id}
                            checked={selectedProjects.includes(project.id)}
                            onChange={handleProjectCheckboxChange}
                          />
                          <span className="custom-control-label">{project.name}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <hr className="dashed"/>
                &nbsp;
                <div className="teams_content">
                  <div className="d-flex justify-content-between w-100 align-items-center">
                    <h6 className="text-semi-bold text-underline">
                      Assign Team Lead
                    </h6>
                    <div className="search_box mb-4">
                      <i className="ri-search-line"></i>
                      <input
                        className="form-control form-control-sm"
                        type="text"
                        placeholder="Search Team Lead"
                        value={teamLeadSearch}
                        onChange={(e) => setTeamLeadSearch(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="settings_layout d-flex items-center">
                    {filteredTeamLeads.map((teamLead: any) => (
                      <div key={teamLead.id} className="settings_checkBox">
                        <label className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            name={`employee-checkbox-${teamLead.id}`}
                            value={teamLead.id}
                            checked={selectedEmployees.includes(teamLead.id)}
                            onChange={handleEmployeeCheckboxChange}
                          />
                          <span className="custom-control-label">
                            {teamLead.name}
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <hr className="dashed"/>
                &nbsp;
                <div className="teams_content">
                  <div className="d-flex justify-content-between w-100 align-items-center">
                    <h6 className="text-semi-bold text-underline">
                      Assign BA/BD
                    </h6>
                    <div className="search_box mb-4">
                      <i className="ri-search-line"></i>
                      <input
                        className="form-control form-control-sm"
                        type="text"
                        placeholder="Search BA/BD"
                        value={bdmSearch}
                        onChange={(e) => setBdmSearch(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="settings_layout d-flex items-center">
                    {filteredBDMs.map((bdm: any) => (
                      <div key={bdm.id} className="settings_checkBox">
                        <label className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            name={`employee-checkbox-${bdm.id}`}
                            value={bdm.id}
                            checked={selectedEmployees.includes(bdm.id)}
                            onChange={handleEmployeeCheckboxChange}
                          />
                          <span className="custom-control-label">
                            {bdm.name}
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="card-footer">
                  <div className="text-right">
                    <button
                      type="button"
                      className="btn btn-primary btn-wave"
                      onClick={handleAddProjectMembers}
                    >
                      <i className="ri-add-circle-fill me-2 align-middle"></i>
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignProjectMember;
