'use client';

import React, { useState } from 'react';
import apiService from '@/services/apiService';
import { UserProjectsById } from '@/components/common/constant';
import { ProjectModel, Technology } from '@/utils/types';
import AddEditProjectForm from './addEditProjectForm';

type Props = {
    id: string;
    projectDetails: ProjectModel[];
    technologies: Technology[];
};

const EditProjectButton = ({
    id,
    projectDetails,
    technologies,
}: Props) => {
    const [show, setShow] = useState(false);
    const [projectData, setProjectData] = useState(null);

    const EditUserProject = async () => {
        try {
            const data = await apiService.get(`${UserProjectsById}=${id}`);
            setProjectData(data.model);
            setShow(true);
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };

    return (
        <>
            {show && (
                <AddEditProjectForm
                    name="Edit project"
                    show={show}
                    setShow={setShow}
                    userprojectData={projectData}
                    id={id}
                    projectDetails={projectDetails}
                    technologies={technologies}
                />
            )}
            <button onClick={EditUserProject}>
                <i className="bi bi-pencil-square"></i>
            </button>
        </>
    );
};

export default EditProjectButton;
